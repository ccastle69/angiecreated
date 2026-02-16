export interface Product {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  price: number // in cents
  displayPrice: string
  category: 'tote' | 'custom' | 'digital'
  images: string[]
  stripePriceId: string // Replace with real Stripe Price ID from dashboard
  available: boolean
  badge?: string
  customForm?: boolean
  notes?: string
}

export interface Workshop {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  date: string // ISO string or "recurring"
  duration: string
  price: number // in cents
  displayPrice: string
  spotsTotal: number
  spotsRemaining: number
  zoomLink?: string
  stripePriceId: string // Replace with real Stripe Price ID from dashboard
  available: boolean
  topics: string[]
  whatToBring: string[]
  badge?: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: 'diy' | 'tote' | 'recipe' | 'garden' | 'workshop'
  imageSrc: string
  description: string
  featured: boolean
}
