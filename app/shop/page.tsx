'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { SectionHeader } from '@/components/ui/Badge'
import type { Product } from '@/lib/types'

type FilterCategory = 'all' | 'tote' | 'digital' | 'custom'

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Tote Bags', value: 'tote' },
  { label: 'Workshops', value: 'digital' },
  { label: 'Custom', value: 'custom' },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered: Product[] = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter)

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-sand/40 border-b border-sand py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Shop Handmade"
            subtitle="Every piece is made with care. Custom tote bags, live workshops, and one-of-a-kind projects."
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter products by category">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`font-body text-sm font-semibold px-5 py-2 rounded-full border transition-all duration-200 ${
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

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-bark/50">Nothing here yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
