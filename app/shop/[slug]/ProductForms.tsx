'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import Button from '@/components/ui/Button'

// ── Tote Bag Order Form ──────────────────────────────────────────────────────
export function ToteBagForm({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    text: '',
    color: '',
    quantity: 4,
    occasion: '',
    requests: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product.stripePriceId) {
      const params = new URLSearchParams({
        project: 'custom-tote-bag',
        text: form.text,
        color: form.color,
        occasion: form.occasion,
        requests: form.requests,
      })
      window.location.href = `/contact?${params.toString()}`
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: product.stripePriceId,
          productName: product.name,
          quantity: form.quantity,
          metadata: {
            text: form.text,
            color: form.color,
            occasion: form.occasion,
            requests: form.requests,
          },
          slug: product.slug,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="text">
          Text / name for the bags *
        </label>
        <input
          id="text" name="text" type="text" required
          value={form.text} onChange={handleChange}
          placeholder="e.g. Bride, Team Bride, or everyone's nicknames"
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="color">
          Color preference *
        </label>
        <input
          id="color" name="color" type="text" required
          value={form.color} onChange={handleChange}
          placeholder="e.g. cream with sage text, or I'll trust you!"
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="quantity">
          Quantity (minimum 4) *
        </label>
        <input
          id="quantity" name="quantity" type="number" required min={4}
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 4 })}
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="occasion">
          Occasion
        </label>
        <input
          id="occasion" name="occasion" type="text"
          value={form.occasion} onChange={handleChange}
          placeholder="e.g. Bachelorette trip, birthday, just because"
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
        />
      </div>
      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="requests">
          Special requests
        </label>
        <textarea
          id="requests" name="requests" rows={3}
          value={form.requests} onChange={handleChange}
          placeholder="Anything else you'd love?"
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full" loading={loading}>
        {product.stripePriceId
          ? `Order Now — ${product.displayPrice} each`
          : 'Send My Order Request →'}
      </Button>
      <p className="font-body text-xs text-bark/50 text-center">
        {product.stripePriceId
          ? "You'll be taken to secure checkout. No surprises."
          : 'No payment yet — Angie will be in touch within 1–2 days to confirm details.'}
      </p>
    </form>
  )
}

// ── Custom Project Inquiry Form ──────────────────────────────────────────────
export function CustomProjectForm() {
  const [form, setForm] = useState({ name: '', email: '', project: '', heard: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'custom-project' }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sage/10 rounded-2xl p-8 text-center border border-sage/20">
        <div className="text-5xl mb-3">🌿</div>
        <h3 className="font-display text-2xl text-bark mb-2">Got it!</h3>
        <p className="font-body text-bark/70">
          I&apos;ll be in touch within 1–2 days. Can&apos;t wait to hear more!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="name">
            Your name *
          </label>
          <input
            id="name" name="name" type="text" required
            value={form.name} onChange={handleChange}
            className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="email">
            Email *
          </label>
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="project">
          What are you dreaming up? *
        </label>
        <textarea
          id="project" name="project" rows={5} required
          value={form.project} onChange={handleChange}
          placeholder="Tell me everything — what you want to make, what it's for, any ideas you already have. The more detail, the better!"
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full" loading={status === 'loading'}>
        Send It Over →
      </Button>
      {status === 'error' && (
        <p className="font-body text-sm text-terracotta text-center">
          Something went wrong — try emailing{' '}
          <a href="mailto:angie@angiecreated.com" className="underline">
            angie@angiecreated.com
          </a>{' '}
          directly!
        </p>
      )}
    </form>
  )
}
