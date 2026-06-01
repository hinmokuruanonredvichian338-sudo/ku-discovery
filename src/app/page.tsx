import Link from 'next/link'
import { ndcCategories } from '@/lib/ndc'
import SearchBox from './SearchBox'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">📚 KU発見</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kindle Unlimitedの本・マンガをジャンルから探そう
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <a
          href="https://www.amazon.co.jp/?tag=kudiscovery-22"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full mb-8 px-5 py-4 rounded-xl bg-amber-400 hover:bg-amber-500 transition-colors"
        >
          <div>
            <p className="font-bold text-gray-900 text-base">Amazonで買い物する →</p>
            <p className="text-xs text-gray-700 mt-0.5">このリンク経由で購入するとサイトの運営支援になります</p>
          </div>
          <span className="text-2xl">🛒</span>
        </a>

        <div className="mb-8">
          <SearchBox />
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          またはジャンルから探す
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {ndcCategories.map((cat) => (
            <Link
              key={cat.code}
              href={`/genre/${cat.code}`}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors cursor-pointer ${cat.bg} ${cat.border}`}
            >
              <span className="text-3xl mb-2">{cat.emoji}</span>
              <span className="text-sm font-semibold text-gray-800 text-center leading-tight">
                {cat.name}
              </span>
              <span className="text-xs text-gray-500 text-center mt-1 leading-tight hidden sm:block">
                {cat.description}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          本の情報は国立国会図書館サーチより取得しています。
          Kindle Unlimitedの対象かどうかはAmazonでご確認ください。
        </p>
      </main>
    </div>
  )
}
