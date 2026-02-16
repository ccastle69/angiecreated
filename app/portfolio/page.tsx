'use client'

import { useState } from 'react'
import Link from 'next/link'
import { portfolioItems } from '@/data/portfolio'
import { Badge, SectionHeader } from '@/components/ui/Badge'
import type { PortfolioItem } from '@/lib/types'

type FilterCat = 'all' | PortfolioItem['category']

const filters: { label: string; value: FilterCat }[] = [
  { label: 'All', value: 'all' },
  { label: 'DIY Projects', value: 'diy' },
  { label: 'Custom Totes', value: 'tote' },
  { label: 'Recipes', value: 'recipe' },
  { label: 'Garden', value: 'garden' },
  { label: 'Workshops', value: 'workshop' },
]

const categoryColors: Record<PortfolioItem['category'], string> = {
  diy: 'terracotta',
  tote: 'sage',
  recipe: 'terracotta',
  garden: 'sage',
  workshop: 'sand',
}

const placeholderGradients: Record<PortfolioItem['category'], string> = {
  diy: 'from-terracotta/20 to-sand',
  tote: 'from-sage/20 to-cream',
  recipe: 'from-sand to-terracotta/10',
  garden: 'from-sage/30 to-sage/10',
  workshop: 'from-cream to-sand',
}

const categoryEmoji: Record<PortfolioItem['category'], string> = {
  diy: '🛠️', tote: '🧺', recipe: '🍋', garden: '🌱', workshop: '💻',
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCat>('all')

  const filtered =
    activeFilter === 'all' ? portfolioItems : portfolioItems.filter((i) => i.category === activeFilter)

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-sand/40 border-b border-sand py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="From My Workshop"
            subtitle="Projects I've loved making — DIYs, custom totes, recipes, and everything from the garden."
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter portfolio by category">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`font-body text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                activeFilter === value
                  ? 'bg-terracotta text-white border-terracotta'
                  : 'bg-warm-white text-bark/70 border-sand hover:border-terracotta hover:text-terracotta'
              }`}
              aria-pressed={activeFilter === value}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-16 bg-terracotta rounded-2xl p-10 text-center">
          <h3 className="font-display text-3xl text-white mb-3">See more on Instagram</h3>
          <p className="font-body text-white/80 mb-6">
            New projects, behind-the-scenes, and garden updates — follow along!
          </p>
          <a
            href="https://instagram.com/angiecreated"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-terracotta font-body font-semibold px-8 py-3 rounded-full hover:bg-cream transition-colors text-sm"
          >
            @angiecreated →
          </a>
        </div>
      </div>
    </div>
  )
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [hovered, setHovered] = useState(false)
  const gradient = placeholderGradients[item.category]
  const badgeVariant = categoryColors[item.category] as 'terracotta' | 'sage' | 'sand'

  return (
    <div
      className={`break-inside-avoid relative rounded-2xl overflow-hidden border border-sand/60 cursor-pointer group ${item.featured ? 'mb-6' : 'mb-4'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image placeholder */}
      {/* TODO: Replace with <Image src={item.imageSrc} fill className="object-cover" alt={item.title} /> */}
      <div
        className={`bg-gradient-to-br ${gradient} flex flex-col items-center justify-center ${
          item.featured ? 'aspect-[3/4]' : 'aspect-square'
        }`}
      >
        <span className="text-4xl opacity-40 mb-2" aria-hidden="true">{categoryEmoji[item.category]}</span>
        <p className="font-body text-xs text-bark/40 text-center px-4">[Photo: {item.title}]</p>
      </div>

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-bark/80 flex flex-col items-center justify-center p-6 transition-opacity duration-200 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!hovered}
      >
        <Badge variant={badgeVariant} className="mb-3">
          {item.category}
        </Badge>
        <h3 className="font-display text-xl text-warm-white text-center mb-2">{item.title}</h3>
        <p className="font-body text-sm text-warm-white/80 text-center">{item.description}</p>
      </div>

      {/* Always-visible title bar */}
      <div className="bg-warm-white px-4 py-3 border-t border-sand/60">
        <p className="font-body text-sm font-semibold text-bark truncate">{item.title}</p>
      </div>
    </div>
  )
}
