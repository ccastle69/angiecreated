import Link from 'next/link'
import { workshops } from '@/data/workshops'
import WorkshopCard from '@/components/WorkshopCard'
import { SectionHeader } from '@/components/ui/Badge'

export const metadata = {
  title: 'Live Workshops | Angie Created',
  description: 'Craft along with Angie on Zoom. Beginner-friendly DIY workshops — upcycling, tote bags, and more.',
}

export default function WorkshopsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-sage/10 border-b border-sage/20 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Live Workshops"
            subtitle="Grab your materials, pour a drink, and let's make something together. All skill levels welcome."
          />
          <div className="mt-8 flex flex-wrap gap-6 font-body text-sm text-bark/70">
            {[
              { icon: '💻', text: 'Live on Zoom — join from anywhere' },
              { icon: '🌱', text: 'All skill levels welcome' },
              { icon: '📋', text: 'Materials list sent after booking' },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-2">
                <span aria-hidden="true">{icon}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workshop Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>

        {/* Request a topic CTA */}
        <div className="bg-warm-white rounded-2xl border border-sand p-10 text-center">
          <div className="text-4xl mb-4" aria-hidden="true">🤔</div>
          <h3 className="font-display text-2xl text-bark mb-3">
            Don&apos;t see a topic you want?
          </h3>
          <p className="font-body text-bark/70 mb-6 max-w-md mx-auto">
            I&apos;m always planning new workshops. Tell me what you&apos;d love to learn and I&apos;ll
            try to make it happen.
          </p>
          <Link
            href="/contact?project=workshop-request"
            className="inline-block bg-sage text-white font-body font-semibold px-8 py-3 rounded-full hover:bg-sage-dark transition-colors text-sm"
          >
            Request a Workshop Topic →
          </Link>
        </div>
      </div>
    </div>
  )
}
