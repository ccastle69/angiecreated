'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-warm-white shadow-sm border-b border-sand' : 'bg-warm-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-xl text-bark hover:text-terracotta transition-colors"
            >
              Angie Created
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-body text-sm tracking-wide transition-colors relative group ${
                    pathname.startsWith(href)
                      ? 'text-terracotta'
                      : 'text-bark hover:text-terracotta'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-terracotta transition-all duration-200 ${
                      pathname.startsWith(href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/shop"
                className="bg-terracotta text-white text-sm font-body font-semibold px-5 py-2 rounded-full hover:bg-terracotta-dark transition-colors"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-bark hover:text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-bark/40" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-warm-white flex flex-col pt-20 px-8 transition-transform duration-300 shadow-2xl ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-display text-2xl transition-colors ${
                  pathname.startsWith(href) ? 'text-terracotta' : 'text-bark hover:text-terracotta'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <Link
              href="/shop"
              className="block text-center bg-terracotta text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-terracotta-dark transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <p className="mt-auto mb-8 text-bark/50 font-body text-sm">@angiecreated</p>
        </div>
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}
