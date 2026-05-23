'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  page: number
  totalPages: number
  paginationBase: string
}

export default function PageJump({ page, totalPages, paginationBase }: Props) {
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const target = parseInt(input, 10)
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      router.push(`${paginationBase}&page=${target}`)
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => setTimeout(() => setEditing(false), 150)}
          onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
          className="w-14 text-center text-sm border border-blue-400 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
          autoFocus
        />
        <span className="text-sm text-gray-500">/ {totalPages}</span>
      </form>
    )
  }

  return (
    <button
      onClick={() => { setEditing(true); setInput(String(page)) }}
      className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer transition-colors"
      title="クリックしてページ番号を入力"
    >
      {page} / {totalPages}
    </button>
  )
}
