import Link from 'next/link'
import { Product } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
}

// Warm gradient placeholders by category
const placeholderGradients: Record<string, string> = {
  tote: 'from-sand via-terracotta/20 to-sand',
  custom: 'from-sage/20 via-sage/10 to-cream',
  digital: 'from-terracotta/10 via-sand to-cream',
}

export default function ProductCard({ product }: ProductCardProps) {
  const gradient = placeholderGradients[product.category] || placeholderGradients.tote

  const getHref = () => {
    if (product.slug === 'workshops') return '/workshops'
    if (product.customForm) return `/contact?project=${product.slug}`
    return `/shop/${product.slug}`
  }

  const getCtaLabel = () => {
    if (product.customForm) return "Tell Me What You Need →"
    if (product.slug === 'workshops') return "See Workshops →"
    return "Order Now →"
  }

  return (
    <article className="bg-warm-white rounded-2xl overflow-hidden hover-lift border border-sand/60 group">
      {/* Image area */}
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="terracotta">{product.badge}</Badge>
          </div>
        )}
        {/* TODO: Replace this div with <Image> once real photos are added to /public/images/products/ */}
        <div className="text-center p-6 opacity-40">
          <div className="text-5xl mb-2">
            {product.category === 'tote' ? '🧺' : product.category === 'custom' ? '💡' : '🛠️'}
          </div>
          <p className="font-body text-xs text-bark/60">[Product photo goes here]</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl text-bark mb-2 group-hover:text-terracotta transition-colors">
          {product.name}
        </h3>
        <p className="font-body text-sm text-bark/70 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-terracotta">
            {product.displayPrice}
          </span>
          <Link
            href={getHref()}
            className="font-body text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
            aria-label={`${getCtaLabel()} - ${product.name}`}
          >
            {getCtaLabel()}
          </Link>
        </div>

        {product.notes && (
          <p className="mt-3 font-body text-xs text-bark/50 border-t border-sand pt-3">
            {product.notes}
          </p>
        )}
      </div>
    </article>
  )
}
