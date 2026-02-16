'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Button from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/Badge'

type ProjectType = 'tote' | 'custom-project' | 'workshop' | 'brand' | 'other' | ''

const projectTypeLabels: Record<string, string> = {
  'custom-tote-bag': 'tote',
  'custom-project': 'custom-project',
  'workshop': 'workshop',
  'workshop-request': 'workshop',
  'brand': 'brand',
}

function ContactForm() {
  const searchParams = useSearchParams()
  const projectParam = searchParams.get('project') || ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    type: (projectTypeLabels[projectParam] || '') as ProjectType,
    message: '',
    heard: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const mapped = projectTypeLabels[projectParam] as ProjectType | undefined
    if (mapped) setForm((f) => ({ ...f, type: mapped }))
  }, [projectParam])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Tell me about your project!'
    return e
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sage/10 rounded-2xl p-10 text-center border border-sage/20">
        <div className="text-6xl mb-4" aria-hidden="true">🌿</div>
        <h3 className="font-display text-3xl text-bark mb-3">Got it!</h3>
        <p className="font-body text-bark/70 text-lg">
          I&apos;ll be in touch within 1–2 days. Can&apos;t wait to hear more!
        </p>
      </div>
    )
  }

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none transition-colors ${
      errors[field] ? 'border-terracotta bg-terracotta/5' : 'border-sand focus:border-terracotta'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="name">Your name *</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass('name')} />
          {errors.name && <p className="mt-1 font-body text-xs text-terracotta">{errors.name}</p>}
        </div>
        <div>
          <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass('email')} />
          {errors.email && <p className="mt-1 font-body text-xs text-terracotta">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="type">
          What are you looking for?
        </label>
        <select
          id="type" name="type" value={form.type} onChange={handleChange}
          className="w-full border border-sand rounded-xl px-4 py-3 font-body text-sm bg-warm-white focus:outline-none focus:border-terracotta transition-colors"
        >
          <option value="">Select an option...</option>
          <option value="tote">Custom tote bags for a group</option>
          <option value="custom-project">A custom project — I have an idea</option>
          <option value="workshop">A question about workshops</option>
          <option value="brand">Brand partnership inquiry</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="message">
          Tell me about your project *
        </label>
        <textarea
          id="message" name="message" rows={6}
          value={form.message} onChange={handleChange}
          placeholder="What are you dreaming up? The more detail, the better — occasion, quantities, vibes, anything!"
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="mt-1 font-body text-xs text-terracotta">{errors.message}</p>}
      </div>

      <div>
        <label className="block font-body text-sm font-semibold text-bark mb-1.5" htmlFor="heard">
          How did you hear about me? <span className="text-bark/40 font-normal">(optional)</span>
        </label>
        <input
          id="heard" name="heard" type="text" value={form.heard} onChange={handleChange}
          placeholder="Instagram, a friend, Google..."
          className={inputClass('heard')}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" loading={status === 'loading'}>
        Send It Over →
      </Button>

      {status === 'error' && (
        <p className="font-body text-sm text-terracotta text-center">
          Something went wrong — try emailing{' '}
          <a href="mailto:angie@angiecreated.com" className="underline">angie@angiecreated.com</a> directly!
        </p>
      )}
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-sand/40 border-b border-sand py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Let's Make Something"
            subtitle="Have a project idea? Want a custom tote? Just want to say hi? I'd love to hear from you."
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="animate-pulse h-96 bg-sand/40 rounded-2xl" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Angie card */}
            <div className="bg-warm-white rounded-2xl border border-sand p-6 text-center">
              {/* TODO: Replace with <Image> of Angie */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terracotta/20 to-sage/20 flex items-center justify-center mx-auto mb-4 border-4 border-cream shadow-md">
                <span className="text-3xl" aria-hidden="true">🌿</span>
              </div>
              <h3 className="font-display text-xl text-bark mb-2">Angie Gibson</h3>
              <p className="font-body text-sm text-bark/70 italic leading-relaxed">
                &ldquo;I genuinely love hearing about new project ideas. Don&apos;t be shy — the weirder the better.&rdquo;
              </p>
            </div>

            {/* Contact info */}
            <div className="bg-warm-white rounded-2xl border border-sand p-6 space-y-4">
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-bark/50">Get in touch</h4>
              <div className="space-y-3">
                <a href="mailto:angie@angiecreated.com" className="flex items-center gap-3 font-body text-sm text-bark/70 hover:text-terracotta transition-colors">
                  <span className="text-lg" aria-hidden="true">✉️</span>
                  angie@angiecreated.com
                </a>
                <a href="https://instagram.com/angiecreated" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-sm text-bark/70 hover:text-terracotta transition-colors">
                  <span className="text-lg" aria-hidden="true">📷</span>
                  @angiecreated
                </a>
                <div className="flex items-center gap-3 font-body text-sm text-bark/70">
                  <span className="text-lg" aria-hidden="true">⏱️</span>
                  Usually responds within 1–2 days
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
