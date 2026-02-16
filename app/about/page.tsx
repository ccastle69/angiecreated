import Link from 'next/link'
import { SectionHeader } from '@/components/ui/Badge'

export const metadata = {
  title: 'About Angie | Angie Created',
  description: 'Meet Angie Gibson — DIY creator, gardener, recipe maker, and the person behind every handmade piece.',
}

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-sand/30 border-b border-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
                Hi there 👋
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-bark mb-6">
                I&apos;m Angie.
              </h1>
              {/* TODO: Add your personal intro here */}
              <p className="font-body text-lg text-bark/70 leading-relaxed mb-4">
                [Add your personal intro here — who you are, where you&apos;re based, what lights you up about making things. This is where people decide if they trust you, so be warm and real!]
              </p>
              <p className="font-body text-lg text-bark/70 leading-relaxed">
                [A second paragraph about your creative philosophy — the budget-friendly, nothing-goes-to-waste angle that makes your content special.]
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              {/* TODO: Replace with <Image src="/images/about/angie-hero.jpg" ... /> */}
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%] bg-gradient-to-br from-terracotta/20 via-sand to-sage/20 flex flex-col items-center justify-center border-4 border-white shadow-2xl">
                <span className="text-6xl" aria-hidden="true">🌿</span>
                <p className="font-body text-xs text-bark/40 mt-3 text-center px-8">[Your photo goes here — /public/images/about/]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader title="My Story" className="mb-6" />
              {/* TODO: Fill in your story */}
              <div className="space-y-4 font-body text-bark/70 leading-relaxed">
                <p>[Your origin story — how you got into DIY and upcycling. What was the first project that got you hooked?]</p>
                <p>[What drives you — the sustainability angle, the joy of making something from nothing, the budget-friendly philosophy. Why does this matter to you?]</p>
                <p>[What you make and who you make it for — your community, your followers, the kinds of people who come to your workshops.]</p>
              </div>
            </div>
            {/* TODO: Replace with a photo of your workspace or a project */}
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sage/20 to-sage/5 flex flex-col items-center justify-center border border-sand">
              <span className="text-5xl opacity-40 mb-2" aria-hidden="true">🛠️</span>
              <p className="font-body text-xs text-bark/40">[Workshop / workspace photo]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sand/30 border-y border-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="What I Believe" centered className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '♻️', title: 'Nothing goes to waste', desc: "If I can upcycle it, I will. There's something magic about turning trash into something beautiful — and it's better for the planet." },
              { emoji: '🌿', title: "Beautiful doesn't have to be expensive", desc: "The best projects I've ever made cost almost nothing. Creativity > budget, every time." },
              { emoji: '🤝', title: 'Making is better together', desc: "That's why I do workshops. Making something with your hands alongside other people is one of the best feelings." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-warm-white rounded-2xl p-8 border border-sand text-center">
                <div className="text-5xl mb-4" aria-hidden="true">{emoji}</div>
                <h3 className="font-display text-xl text-bark mb-3">{title}</h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="By the Numbers" centered className="mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '109K+', label: 'Instagram followers' },
              { number: '100+', label: 'Projects shared' },
              { number: '[X]', label: 'Workshops hosted' }, // TODO: Update
              { number: '[X]', label: 'Custom orders made' }, // TODO: Update
            ].map(({ number, label }) => (
              <div key={label} className="bg-warm-white rounded-2xl p-6 border border-sand">
                <div className="font-display text-4xl text-terracotta mb-2">{number}</div>
                <div className="font-body text-sm text-bark/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands / Press */}
      <section className="py-16 bg-sand/30 border-y border-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Brands I've Worked With" centered className="mb-10" />
          {/* TODO: Add brand logos here as partnerships come in */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] rounded-xl bg-warm-white border border-sand flex items-center justify-center opacity-40"
              >
                <span className="font-body text-xs text-bark/40">Logo {i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-xs text-bark/40 mt-4">
            [Replace placeholder boxes with brand logos]
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl text-bark mb-4">Want to work together?</h2>
          <p className="font-body text-bark/70 mb-8 max-w-md mx-auto">
            Whether you want something handmade, a workshop for your team, or a brand partnership — I&apos;d love to chat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-terracotta text-white font-body font-semibold px-8 py-3 rounded-full hover:bg-terracotta-dark transition-colors text-sm"
            >
              Shop Handmade
            </Link>
            <Link
              href="/contact?project=brand"
              className="border-2 border-sage text-sage font-body font-semibold px-8 py-3 rounded-full hover:bg-sage hover:text-white transition-colors text-sm"
            >
              Brand Partnerships →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
