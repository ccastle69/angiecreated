import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-20">
        <div className="text-7xl mb-6" aria-hidden="true">🌿</div>
        <h1 className="font-display text-4xl text-bark mb-4">
          Hmm, I can&apos;t find that one.
        </h1>
        <p className="font-body text-bark/70 text-lg mb-8 leading-relaxed">
          That page might have moved, or maybe it never existed. Let&apos;s get you back somewhere good.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-terracotta text-white font-body font-semibold px-8 py-3 rounded-full hover:bg-terracotta-dark transition-colors text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="border-2 border-sand text-bark font-body font-semibold px-8 py-3 rounded-full hover:border-terracotta hover:text-terracotta transition-colors text-sm"
          >
            Visit the Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
