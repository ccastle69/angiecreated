export default function Loading() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-8">
          {/* Header skeleton */}
          <div className="space-y-3">
            <div className="h-8 bg-sand rounded-lg w-48" />
            <div className="h-4 bg-sand/60 rounded w-96" />
            <div className="h-px bg-sand w-16 mt-2" />
          </div>
          {/* Card grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-warm-white rounded-2xl overflow-hidden border border-sand/60">
                <div className="aspect-[4/3] bg-sand/40" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-sand rounded w-3/4" />
                  <div className="h-3 bg-sand/60 rounded w-full" />
                  <div className="h-3 bg-sand/60 rounded w-5/6" />
                  <div className="flex justify-between pt-2">
                    <div className="h-5 bg-sand rounded w-16" />
                    <div className="h-5 bg-sand rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
