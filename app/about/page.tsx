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
              <p className="font-body text-lg text-bark/70 leading-relaxed mb-4">
                Hi, I&apos;m Angie — the youngest of three daughters (by exactly 11 minutes, if you ask my twin). Growing up the self-proclaimed &ldquo;son my dad never had,&rdquo; I spent more weekends than I&apos;d like to admit learning to fix, build, and renovate things alongside my parents. My mom is Korean, my dad is Swedish, and both of them have been flipping and fixing homes for over 20 years. That DIY-or-die attitude was basically in my blood — even if it took me a while to appreciate it.
              </p>
              <p className="font-body text-lg text-bark/70 leading-relaxed">
                After college, something clicked. All those reluctant Saturday projects turned into actual passion. I started gardening, cooking from scratch, upcycling things other people threw away — and realized I genuinely loved making things with my hands. What started as a creative outlet has slowly, unexpectedly, become the main thing.
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
              <div className="space-y-4 font-body text-bark/70 leading-relaxed">
                <p>Growing up first-gen American with a Korean mom and a Swedish dad means I inherited two very different versions of the same philosophy: don&apos;t waste anything, and make it yourself. My parents have been buying, renovating, and selling homes my whole life — so I grew up knowing which end of a hammer to hold before I knew how to drive.</p>
                <p>I didn&apos;t always love it. There were plenty of weekends I would have rather been anywhere else. But somewhere along the way, the skills stuck — and so did the mindset. The idea that you don&apos;t need to buy something new when you can make something better. That a little creativity and some elbow grease can turn almost anything into something worth keeping.</p>
                <p>These days I channel all of that into DIY projects, recipes, gardening, and custom pieces I make for people who want something handmade and personal. I started sharing it online almost by accident, and the community that&apos;s grown around it has been the best surprise. If you&apos;re here, you&apos;re probably my kind of person.</p>
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
              { number: '20+', label: 'Years of DIY (reluctant & willing)' },
              { number: '2 🇰🇷🇸🇪', label: 'Countries in my DNA' },
              { number: '∞', label: 'Projects that started as trash' },
            ].map(({ number, label }) => (
              <div key={label} className="bg-warm-white rounded-2xl p-6 border border-sand">
                <div className="font-display text-4xl text-terracotta mb-2">{number}</div>
                <div className="font-body text-sm text-bark/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands / Press — uncomment and add logos once partnerships are established
      <section className="py-16 bg-sand/30 border-y border-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Brands I've Worked With" centered className="mb-10" />
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
        </div>
      </section>
      */}

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
