import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products, getProductBySlug } from '@/data/products'
import { Badge } from '@/components/ui/Badge'
import { ToteBagForm, CustomProjectForm } from './ProductForms'

// Server component — generateStaticParams is allowed here
export function generateStaticParams() {
  return products
    .filter((p) => p.slug !== 'workshops')
    .map((p) => ({ slug: p.slug }))
}

const placeholderGradients: Record<string, string> = {
  tote: 'from-sand via-terracotta/20 to-sand',
  custom: 'from-sage/20 via-sage/10 to-cream',
  digital: 'from-terracotta/10 via-sand to-cream',
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  if (product.slug === 'workshops') return null

  const gradient = placeholderGradients[product.category] || placeholderGradients.tote

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="font-body text-sm text-bark/50" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-bark">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className={`relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-sand/60`}>
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                <div className="text-8xl mb-4">
                  {product.category === 'tote' ? '🧺' : '💡'}
                </div>
                <p className="font-body text-sm text-bark/60">[Product photo goes here]</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <Badge variant="terracotta" className="mb-4">{product.badge}</Badge>
            )}
            <h1 className="font-display text-4xl md:text-5xl text-bark mb-3">{product.name}</h1>
            <p className="font-display text-3xl text-terracotta mb-6">{product.displayPrice}</p>
            <p className="font-body text-bark/70 leading-relaxed mb-6">{product.longDescription}</p>
            {product.notes && (
              <div className="bg-sand/50 rounded-xl px-5 py-4 mb-6 font-body text-sm text-bark/70 border border-sand">
                📋 {product.notes}
              </div>
            )}
            {/* Client components handle all interactivity */}
            {product.customForm ? (
              <CustomProjectForm />
            ) : (
              <ToteBagForm product={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
