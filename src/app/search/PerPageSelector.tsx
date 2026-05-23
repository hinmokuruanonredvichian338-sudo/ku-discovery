'use client'
import { useRouter } from 'next/navigation'

interface Props {
  currentPerPage: number
  searchBase: string
}

const OPTIONS = [20, 50, 100]

export default function PerPageSelector({ currentPerPage, searchBase }: Props) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">表示件数</span>
      {OPTIONS.map((n) => (
        <button
          key={n}
          onClick={() => router.push(`${searchBase}&perPage=${n}&page=1`)}
          className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
            currentPerPage === n
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {n}冊
        </button>
      ))}
    </div>
  )
}
