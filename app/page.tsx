import Link from 'next/link'
import { products } from '@/data/products'
import { workshops } from '@/data/workshops'
import ProductCard from '@/components/ProductCard'
import { SectionHeader } from '@/components/ui/Badge'

export default function HomePage() {
  const featuredProducts = products.slice(0, 2)
  const nextWorkshop = workshops[0]

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden py-16 md:py-24">
        {/* Decorative background circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-terracotta/8 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sage/10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="animate-fade-up font-body text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
                Handmade with love ✨
              </p>
              <h1 className="animate-fade-up-delay-1 font-display text-5xl md:text-6xl lg:text-7xl text-bark leading-tight mb-6">
                Making everyday things{' '}
                <em className="text-terracotta not-italic">into something beautiful.</em>
              </h1>
              <p className="animate-fade-up-delay-2 font-body text-lg text-bark/70 mb-8 max-w-lg leading-relaxed">
                DIYs · Recipes · Gardening · Handmade with love
              </p>
              <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="bg-terracotta text-white font-body font-semibold px-8 py-4 rounded-full hover:bg-terracotta-dark transition-colors text-sm"
                >
                  Shop Handmade
                </Link>
                <Link
                  href="/workshops"
                  className="border-2 border-sage text-sage font-body font-semibold px-8 py-4 rounded-full hover:bg-sage hover:text-white transition-colors text-sm"
                >
                  Join a Workshop
                </Link>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="animate-fade-up-delay-4 flex justify-center lg:justify-end">
              {/* TODO: Replace with <Image> of Angie or her best project */}
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-sand via-terracotta/20 to-sage/20 flex items-center justify-center border-4 border-white shadow-2xl">
                <div className="text-center p-8 opacity-50">
                  <div className="text-6xl mb-3">🌿</div>
                  <p className="font-body text-xs text-bark/60">[Angie&apos;s photo goes here]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT I MAKE ──────────────────────────────── */}
      <section className="bg-sand/40 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What I Make"
            subtitle="From handmade totes to live workshops to totally custom projects — there's something here for you."
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🧺', title: 'Custom Tote Bags', desc: 'Personalized bags for your crew — bachelorette trips, friend groups, and special occasions.', href: '/shop/custom-tote-bag', cta: 'Order yours →' },
              { emoji: '🛠️', title: 'Live Workshops', desc: 'Craft along with me on Zoom. Beginners welcome, wine encouraged.', href: '/workshops', cta: 'See upcoming →' },
              { emoji: '💡', title: 'Custom Projects', desc: "Have a wild idea and no idea how to make it happen? Let's figure it out together.", href: '/contact?project=custom-project', cta: 'Tell me →' },
            ].map(({ emoji, title, desc, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="group bg-warm-white rounded-2xl p-8 border border-sand/60 hover-lift text-center block"
              >
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="font-display text-xl text-bark mb-3 group-hover:text-terracotta transition-colors">
                  {title}
                </h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed mb-4">{desc}</p>
                <span className="font-body text-sm font-semibold text-terracotta">{cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader title="Shop Handmade" subtitle="Every piece is made with care, not mass-produced." />
            <Link
              href="/shop"
              className="font-body text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors hidden md:block"
            >
              See everything →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="font-body text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors">
              See everything →
            </Link>
          </div>
        </div>
      </section>

      {/* ── UPCOMING WORKSHOP ────────────────────────── */}
      {nextWorkshop && (
        <section className="bg-sage/10 py-16 border-y border-sage/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage-dark mb-3">
                  Upcoming Workshop
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-bark mb-4">
                  {nextWorkshop.title}
                </h2>
                <p className="font-body text-bark/70 leading-relaxed mb-6">
                  {nextWorkshop.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {nextWorkshop.topics.slice(0, 3).map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 font-body text-sm text-bark/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" aria-hidden="true" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/workshops"
                    className="bg-sage text-white font-body font-semibold px-8 py-3 rounded-full hover:bg-sage-dark transition-colors text-sm"
                  >
                    Reserve My Spot — {nextWorkshop.displayPrice}
                  </Link>
                  <span className="font-body text-sm text-sage-dark font-semibold">
                    {nextWorkshop.spotsRemaining} spots left
                  </span>
                </div>
              </div>
              <div className="bg-warm-white rounded-2xl p-8 border border-sage/20">
                <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-bark/50 mb-4">
                  What to bring
                </h4>
                <ul className="space-y-3">
                  {nextWorkshop.whatToBring.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm text-bark/80">
                      <span className="text-sage mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PORTFOLIO TEASER ─────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader title="From My Workshop" subtitle="A peek at what I've been making lately." />
            <Link href="/portfolio" className="font-body text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors hidden md:block">
              See more →
            </Link>
          </div>
          {/* TODO: Replace placeholder grid with real portfolio photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Wine bottle upcycle', gradient: 'from-terracotta/20 to-sand', emoji: '🍷' },
              { label: 'Bachelorette totes', gradient: 'from-sage/20 to-cream', emoji: '🧺' },
              { label: 'Garden raised bed', gradient: 'from-sage/30 to-sage/10', emoji: '🌱' },
              { label: 'Roast chicken recipe', gradient: 'from-sand to-terracotta/10', emoji: '🍋' },
              { label: 'Macramé hanging', gradient: 'from-cream to-sand', emoji: '🪢' },
              { label: 'Tin planters', gradient: 'from-terracotta/10 to-sage/20', emoji: '🪴' },
            ].map(({ label, gradient, emoji }, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center opacity-60`}
              >
                <span className="text-3xl mb-1" aria-hidden="true">{emoji}</span>
                <p className="font-body text-xs text-bark/50 text-center px-2">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-body text-sm text-bark/60">
            Follow along on Instagram{' '}
            <a
              href="https://instagram.com/angiecreated"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta font-semibold hover:text-terracotta-dark transition-colors"
            >
              @angiecreated
            </a>
          </p>
        </div>
      </section>

      {/* ── CUSTOM PROJECT CTA ───────────────────────── */}
      <section className="bg-terracotta py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Have something in mind?
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            I love new projects. Tell me what you&apos;re dreaming up and we&apos;ll figure it out together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-terracotta font-body font-semibold px-8 py-4 rounded-full hover:bg-cream transition-colors text-sm"
          >
            Tell Me About It →
          </Link>
        </div>
      </section>
    </>
  )
}
