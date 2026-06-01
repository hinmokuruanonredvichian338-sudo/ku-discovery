import { XMLParser } from 'fast-xml-parser'

export interface Book {
  title: string
  author: string
  publisher: string
  date: string
  ndlUrl: string
  isbn?: string
}

export interface SearchResult {
  books: Book[]
  total: number
  page: number
  perPage: number
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  isArray: (name) =>
    ['item', 'dc:creator', 'dc:publisher', 'dc:identifier', 'dc:subject'].includes(name),
})

function toStr(val: unknown): string {
  if (val == null) return ''
  if (typeof val === 'string') return val.trim()
  if (typeof val === 'number') return String(val)
  if (typeof val === 'object' && '#text' in (val as object)) {
    return String((val as Record<string, unknown>)['#text']).trim()
  }
  return ''
}

function extractAuthor(item: Record<string, unknown>): string {
  const creators = item['dc:creator']
  if (!Array.isArray(creators)) return '著者不明'
  return (
    creators
      .map(toStr)
      .map((s) => s.replace(/,\s*\d{4}-?(\d{4})?$/, '').replace(/,\s*$/, '').trim())
      .filter(Boolean)
      .slice(0, 2)
      .join('、') || '著者不明'
  )
}

function extractPublisher(item: Record<string, unknown>): string {
  const pubs = item['dc:publisher']
  if (Array.isArray(pubs)) {
    const main = pubs.find((p) => {
      const s = toStr(p)
      return s && !s.includes('発売')
    })
    return toStr(main ?? pubs[0])
  }
  return toStr(pubs)
}

function extractIsbn(item: Record<string, unknown>): string | undefined {
  const ids = item['dc:identifier']
  if (!Array.isArray(ids)) return undefined
  for (const id of ids) {
    if (typeof id === 'object' && id !== null) {
      const rec = id as Record<string, unknown>
      const type = rec['@_xsi:type']
      if (typeof type === 'string' && type.includes('ISBN')) {
        return toStr(rec['#text'])
      }
    }
  }
  return undefined
}

function isBook(item: Record<string, unknown>): boolean {
  const cats = item['category']
  const list = Array.isArray(cats) ? cats : cats ? [cats] : []
  return list.map(toStr).some((c) => c === '図書')
}

function itemToBook(item: Record<string, unknown>): Book {
  return {
    title: toStr(item['dc:title'] || item.title),
    author: extractAuthor(item),
    publisher: extractPublisher(item),
    date: toStr(item['dc:date'] ?? item['dcterms:issued']),
    ndlUrl: toStr(item.link || item.guid),
    isbn: extractIsbn(item),
  }
}

export async function searchBooksByKeyword(
  keyword: string,
  page = 1,
  perPage = 20
): Promise<SearchResult> {
  const start = (page - 1) * perPage + 1
  const fetchCount = Math.min(perPage * 3, 200)

  const params = new URLSearchParams({
    title: keyword,
    cnt: String(fetchCount),
    idx: String(start),
  })

  const res = await fetch(`https://ndlsearch.ndl.go.jp/api/opensearch?${params}`, {
    next: { revalidate: 600 },
  })

  if (!res.ok) return { books: [], total: 0, page, perPage }

  const xml = await res.text()
  const parsed = parser.parse(xml)
  const channel = parsed?.rss?.channel
  if (!channel) return { books: [], total: 0, page, perPage }

  const total = parseInt(toStr(channel['openSearch:totalResults']), 10) || 0
  const rawItems = channel.item ?? []
  const items: Record<string, unknown>[] = Array.isArray(rawItems) ? rawItems : [rawItems]

  const books = items.filter(isBook).slice(0, perPage).map(itemToBook)

  return { books, total, page, perPage }
}

export async function searchBooksByNdc(
  ndcCodes: string[],
  page = 1,
  perPage = 20
): Promise<SearchResult> {
  const primaryCode = ndcCodes[0]
  const start = (page - 1) * perPage + 1

  const params = new URLSearchParams({
    ndc: primaryCode,
    cnt: String(perPage),
    idx: String(start),
  })

  const res = await fetch(`https://ndlsearch.ndl.go.jp/api/opensearch?${params}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return { books: [], total: 0, page, perPage }
  }

  const xml = await res.text()
  const parsed = parser.parse(xml)
  const channel = parsed?.rss?.channel

  if (!channel) return { books: [], total: 0, page, perPage }

  const total = parseInt(toStr(channel['openSearch:totalResults']), 10) || 0
  const rawItems = channel.item ?? []
  const items: Record<string, unknown>[] = Array.isArray(rawItems) ? rawItems : [rawItems]

  const books: Book[] = items.map(itemToBook)

  return { books, total, page, perPage }
}

function shortenTitle(title: string): string {
  return title
    .replace(/[（(][^）)]*[）)]/g, '') // （）内のみ除去（巻数・シリーズ名など）
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildAmazonKUUrl(title: string): string {
  const params = new URLSearchParams({ k: `${shortenTitle(title)} kindle unlimited`, i: 'digital-text', tag: 'kudiscovery-22' })
  return `https://www.amazon.co.jp/s?${params}`
}

export function buildAmazonKindleUrl(title: string): string {
  const params = new URLSearchParams({ k: shortenTitle(title), i: 'digital-text', tag: 'kudiscovery-22' })
  return `https://www.amazon.co.jp/s?${params}`
}
