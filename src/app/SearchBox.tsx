'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBox() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="本のタイトルで検索..."
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm transition-colors whitespace-nowrap"
      >
        検索
      </button>
    </form>
  )
}
