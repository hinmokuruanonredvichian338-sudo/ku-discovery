import Link from 'next/link'
import { findCategoryByCode, findParentCategory, findSubCategoryByCode } from '@/lib/ndc'
import { searchBooksByNdc, searchBooksByKeyword, buildAmazonKUUrl, buildAmazonKindleUrl } from '@/lib/ndl'
import PerPageSelector from './PerPageSelector'
import PageJump from './PageJump'

const VALID_PER_PAGE = [20, 50, 100]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ ndc?: string; q?: string; page?: string; perPage?: string }>
}) {
  const { ndc, q, page: pageStr = '1', perPage: perPageStr = '20' } = await searchParams
  const page = Math.max(1, parseInt(pageStr, 10) || 1)
  const perPage = VALID_PER_PAGE.includes(parseInt(perPageStr, 10))
    ? parseInt(perPageStr, 10)
    : 20

  const isKeywordSearch = !!q

  let result
  let pageTitle: string
  let backHref: string
  let backLabel: string

  if (isKeywordSearch) {
    result = await searchBooksByKeyword(q!, page, perPage)
    pageTitle = `「${q}」の検索結果`
    backHref = '/'
    backLabel = '← トップに戻る'
  } else {
    const ndcCode = ndc ?? '9'
    const parent = findParentCategory(ndcCode)
    const sub = parent ? findSubCategoryByCode(parent, ndcCode) : null
    const category = sub ? parent! : findCategoryByCode(ndcCode)

    if (!category) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">ジャンルが見つかりませんでした。</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
              トップに戻る
            </Link>
          </div>
        </div>
      )
    }

    const searchCodes = sub ? sub.searchCodes : category.searchCodes
    result = await searchBooksByNdc(searchCodes, page, perPage)
    pageTitle = sub ? sub.name : `${category.emoji} ${category.name}`
    backHref = sub ? `/genre/${category.code}` : '/'
    backLabel = sub ? `← ${category.emoji} ${category.name}` : '← ジャンル一覧'
  }

  const { books, total } = result
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  // ページネーションとperPage切り替えのベースURL
  const searchBase = isKeywordSearch
    ? `/search?q=${encodeURIComponent(q!)}`
    : `/search?ndc=${ndc ?? '9'}`
  const paginationBase = `${searchBase}&perPage=${perPage}`
  const nextPageHref = `${paginationBase}&page=${page + 1}`
  const prevPageHref = `${paginationBase}&page=${page - 1}`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href={backHref}
            className="text-gray-400 hover:text-gray-700 transition-colors text-sm"
          >
            {backLabel}
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-lg font-bold text-gray-900">
            {pageTitle}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-sm text-gray-500">
            約 {total.toLocaleString()} 件の本が見つかりました
          </p>
          <PerPageSelector currentPerPage={perPage} searchBase={searchBase} />
        </div>

        {books.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            {page > 1 ? (
              <>
                <p>このページにはアクセスできませんでした。</p>
                <p className="text-sm mt-1">（NDLのAPIが対応していないページ番号の可能性があります）</p>
                <Link
                  href={`${paginationBase}&page=1`}
                  className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                >
                  1ページ目に戻る
                </Link>
              </>
            ) : (
              <p>このジャンルの本が見つかりませんでした。</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {books.map((book, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {book.author}
                    {book.publisher ? `　${book.publisher}` : ''}
                    {book.date ? `　${book.date}` : ''}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {book.ndlUrl && (
                    <a
                      href={book.ndlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      NDL詳細
                    </a>
                  )}
                  <a
                    href={buildAmazonKUUrl(book.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold transition-colors whitespace-nowrap"
                  >
                    KUで探す
                  </a>
                  <a
                    href={buildAmazonKindleUrl(book.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors whitespace-nowrap"
                  >
                    Kindleで探す
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-3">
            {page > 1 && (
              <Link
                href={prevPageHref}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ← 前のページ
              </Link>
            )}
            <PageJump page={page} totalPages={totalPages} paginationBase={paginationBase} />
            {page < totalPages && (
              <Link
                href={nextPageHref}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                次のページ →
              </Link>
            )}
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400 text-center">
          本の情報は国立国会図書館サーチより取得。「KUで探す」はKindle Unlimited対象のみ、「Kindleで探す」は有料Kindle本も含めて検索します。
        </p>
      </main>
    </div>
  )
}
