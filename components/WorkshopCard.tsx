'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Workshop } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'

interface WorkshopCardProps {
  workshop: Workshop
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const [showWhatToBring, setShowWhatToBring] = useState(false)
  const [loading, setLoading] = useState(false)

  const spotsLeft = workshop.spotsRemaining
  const isSoldOut = !workshop.available || spotsLeft === 0
  const isLowSpots = spotsLeft > 0 && spotsLeft <= 4

  const formatDate = (dateStr: string) => {
    if (dateStr === 'recurring') return 'Monthly — check back for next date'
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    } catch {
      return dateStr
    }
  }

  const handleBooking = async () => {
    if (isSoldOut || !workshop.stripePriceId) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: workshop.stripePriceId,
          productName: workshop.title,
          quantity: 1,
          metadata: { workshopSlug: workshop.slug },
          slug: workshop.slug,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article
      className={`bg-warm-white rounded-2xl overflow-hidden border transition-all duration-200 ${
        isSoldOut ? 'opacity-60 border-sand' : 'border-sage/30 hover-lift hover:border-sage'
      }`}
    >
      {/* Header band */}
      <div className="bg-gradient-to-r from-sage/20 to-sage/5 px-6 py-4 border-b border-sage/20 flex items-start justify-between gap-4">
        <div>
          {workshop.badge && (
            <Badge variant="sage" className="mb-2">{workshop.badge}</Badge>
          )}
          <h3 className="font-display text-xl text-bark">{workshop.title}</h3>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-2xl text-sage-dark">{workshop.displayPrice}</div>
          <div className="font-body text-xs text-bark/60">per person</div>
        </div>
      </div>

      <div className="p-6">
        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-4 font-body text-sm text-bark/70">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(workshop.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {workshop.duration}
          </span>
          <span
            className={`flex items-center gap-1.5 font-semibold ${
              isSoldOut ? 'text-bark/40' : isLowSpots ? 'text-terracotta' : 'text-sage-dark'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {isSoldOut ? 'Sold out' : isLowSpots ? `Only ${spotsLeft} spots left!` : `${spotsLeft} spots remaining`}
          </span>
        </div>

        <p className="font-body text-sm text-bark/70 leading-relaxed mb-5">{workshop.description}</p>

        {/* Topics */}
        <div className="mb-4">
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-bark/50 mb-3">
            What we&apos;ll cover
          </h4>
          <ul className="space-y-2">
            {workshop.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-bark/80">
                <svg className="w-4 h-4 text-sage mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* What to Bring — collapsible */}
        <div className="border-t border-sand pt-4 mb-5">
          <button
            onClick={() => setShowWhatToBring(!showWhatToBring)}
            className="flex items-center justify-between w-full font-body text-sm font-semibold text-bark/70 hover:text-bark transition-colors"
            aria-expanded={showWhatToBring}
          >
            <span>What to bring</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showWhatToBring ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showWhatToBring && (
            <ul className="mt-3 space-y-1.5">
              {workshop.whatToBring.map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-bark/70">
                  <span className="text-terracotta mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        {isSoldOut ? (
          <Link
            href="/contact?project=workshop-waitlist"
            className="block text-center bg-sand text-bark/60 font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-sand/80 transition-colors"
          >
            Join Waitlist
          </Link>
        ) : !workshop.stripePriceId ? (
          <Link
            href="/contact?project=workshop"
            className="block text-center bg-sage text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-sage-dark transition-colors"
          >
            Reserve My Spot — {workshop.displayPrice}
          </Link>
        ) : (
          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full flex items-center justify-center bg-sage text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-sage-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Booking...
              </>
            ) : (
              `Reserve My Spot — ${workshop.displayPrice}`
            )}
          </button>
        )}
      </div>
    </article>
  )
}
