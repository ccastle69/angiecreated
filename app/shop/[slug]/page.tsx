'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, getProductBySlug } from '@/data/products'
import { Badge } from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

// For static generation
export function generateStaticParams() {
  return products
    .filter((p) => p.slug !== 'workshops')
    .map((p) => ({ slug: p.slug }))
}

const placeholderGradients: Record<string, string> = {
  tote: 'from-sand via-terracotta/20 to-sand',
  custom: 'from-sage/20 via-sage/10 to-cream',
  digital: 'from-terracotta/10 via-sand to-cream',
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  if (product.slug === 'workshops') {
    // Redirect handled in the card — just in case
    return null
  }

  const gradient = placeholderGradients[product.category] || placeholderGradients.tote

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="font-body text-sm text-bark/50" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-bark">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className={`aspect-square rounded-2xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center border border-sand/60`}>
            {/* TODO: Replace with <Image src={product.images[0]} ... /> once photos are added */}
            <div className="text-center p-8 opacity-40">
              <div className="text-8xl mb-4">
                {product.category === 'tote' ? '🧺' : '💡'}
              </div>
              <p className="font-body text-sm text-bark/60">[Product photo goes here]</p>
              <p className="font-body text-xs text-bark/40 mt-1">Add to /public/images/products/</p>
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <Badge variant="terracotta" className="mb-4">{product.badge}</Badge>
            )}
            <h1 className="font-display text-4xl md:text-5xl text-bark mb-3">{product.name}</h1>
            <p className="font-display text-3xl text-terracotta mb-6">{product.displayPrice}</p>
            <p className="font-body text-bark/70 leading-relaxed mb-6">{product.longDescription}</p>
            {product.notes && (
              <div className="bg-sand/50 rounded-xl px-5 py-4 mb-6 font-body text-sm text-bark/70 border border-sand">
                📋 {product.notes}
              </div>
            )}

            {product.customForm ? (
              <CustomProjectForm />
            ) : (
              <ToteBagForm product={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Tote Bag Order Form ──────────────────────────────────────────────────────
function ToteBagForm({ product }: { product: ReturnType<typeof getProductBySlug> }) {
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
    if (!product?.stripePriceId) {
      // No Stripe price set yet — send to contact instead
      const params = new URLSearchParams({ project: 'custom-tote-bag', ...form as unknown as Record<string, string> })
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
          value={form.quantity} onChange={handleChange}
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
        {product?.stripePriceId ? `Order Now — ${product?.displayPrice} each` : 'Send My Order Request →'}
      </Button>
      <p className="font-body text-xs text-bark/50 text-center">
        {product?.stripePriceId
          ? "You'll be taken to secure checkout. No surprises."
          : "No payment yet — Angie will be in touch within 1–2 days to confirm details."}
      </p>
    </form>
  )
}

// ── Custom Project Inquiry Form ──────────────────────────────────────────────
function CustomProjectForm() {
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
        <p className="font-body text-bark/70">I&apos;ll be in touch within 1–2 days. Can&apos;t wait to hear more!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="name">Your name *</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors" />
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
        <p className="font-body text-sm text-terracotta text-center">Something went wrong — try emailing angie@angiecreated.com directly!</p>
      )}
    </form>
  )
}
