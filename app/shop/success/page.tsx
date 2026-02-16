import Link from 'next/link'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  const isWorkshop = searchParams.type === 'workshop'

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-20">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="font-display text-4xl text-bark mb-4">You&apos;re all set!</h1>
        {isWorkshop ? (
          <p className="font-body text-bark/70 text-lg leading-relaxed mb-8">
            Your spot is reserved! Check your email for the Zoom link and the materials list — I
            can&apos;t wait to make something with you.
          </p>
        ) : (
          <p className="font-body text-bark/70 text-lg leading-relaxed mb-8">
            Your order is in! I&apos;ll be in touch within 24 hours to confirm your details and get
            started on your bags. 🧺
          </p>
        )}
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
            Keep Browsing
          </Link>
        </div>
      </div>
    </div>
  )
}
