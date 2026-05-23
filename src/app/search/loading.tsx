export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
