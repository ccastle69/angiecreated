'use client'

import Link from 'next/link'
import { useState } from 'react'

const footerLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to email service (Resend, Mailchimp, etc.)
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="bg-bark text-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            <h3 className="font-display text-2xl text-warm-white mb-3">Angie Created</h3>
            <p className="font-body text-warm-white/70 text-sm leading-relaxed mb-6">
              Making DIY fun, meals beautiful & gardens grow 🌱
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com/angiecreated"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-warm-white/70 hover:text-terracotta transition-colors flex items-center gap-2"
                aria-label="Follow @angiecreated on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @angiecreated
              </a>
              <a
                href="mailto:angie@angiecreated.com"
                className="font-body text-sm text-warm-white/70 hover:text-terracotta transition-colors"
              >
                angie@angiecreated.com
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-body font-semibold text-warm-white/50 text-xs uppercase tracking-widest mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-warm-white/70 hover:text-terracotta transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-body font-semibold text-warm-white/50 text-xs uppercase tracking-widest mb-4">
              Stay in the loop
            </h4>
            <p className="font-body text-sm text-warm-white/70 mb-4">
              New projects, workshop dates, and seasonal recipes — straight to your inbox.
            </p>
            {joined ? (
              <p className="font-body text-sm text-sage font-semibold">
                You&apos;re in! 🌿 Talk soon.
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address for newsletter"
                  className="flex-1 bg-bark border border-warm-white/20 text-warm-white placeholder-warm-white/40 font-body text-sm px-4 py-2 rounded-full focus:outline-none focus:border-terracotta transition-colors"
                />
                <button
                  type="submit"
                  className="bg-terracotta text-white font-body text-sm font-semibold px-4 py-2 rounded-full hover:bg-terracotta-dark transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-warm-white/40">
            © {new Date().getFullYear()} Angie Created. Handmade with love.
          </p>
          <p className="font-body text-xs text-warm-white/40">
            Made by{' '}
            <a href="mailto:angie@angiecreated.com" className="hover:text-warm-white/70 transition-colors">
              someone who cares
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
