import Link from 'next/link'
import { findCategoryByCode } from '@/lib/ndc'

export default async function GenrePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const category = findCategoryByCode(code)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-700 transition-colors text-sm">
            ← ジャンル一覧
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-lg font-bold text-gray-900">
            {category.emoji} {category.name}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          どのジャンルを探しますか？
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {category.subCategories.map((sub) => (
            <Link
              key={sub.code}
              href={`/search?ndc=${sub.code}`}
              className={`flex flex-col p-5 rounded-xl border-2 transition-colors ${category.bg} ${category.border}`}
            >
              <span className="font-semibold text-gray-800 text-base">
                {sub.name}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {sub.description}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
