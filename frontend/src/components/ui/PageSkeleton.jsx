/**
 * Full-page loading skeleton shown while lazy-loaded route chunks download.
 */
export default function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-white" aria-busy="true" aria-label="Loading page">
      {/* Header bar */}
      <div className="h-16 bg-gray-200" />
      {/* Nav bar */}
      <div className="h-12 bg-gray-100" />

      {/* Hero block */}
      <div className="bg-cora-sky px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="h-10 w-3/4 rounded bg-gray-300" />
          <div className="h-6 w-1/2 rounded bg-gray-200" />
          <div className="flex gap-3 pt-4">
            <div className="h-10 w-36 rounded-full bg-gray-300" />
            <div className="h-10 w-36 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content blocks */}
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="space-y-3 rounded-lg bg-gray-100 p-6">
                <div className="h-6 w-2/3 rounded bg-gray-300" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
