import { Product } from '@/lib/types'

export const products: Product[] = [
  {
    id: 'custom-tote-bag',
    slug: 'custom-tote-bag',
    name: 'Custom Tote Bag',
    description:
      'Personalized handmade tote bags for bachelorette trips, friend groups, and special occasions.',
    longDescription:
      "Each tote is handmade and customized just for you. Perfect for bachelorette weekends, matching friend group bags, birthday trips, or any occasion worth remembering. Tell me your colors, text, and vibe — I'll handle the rest. Every bag is made with love and attention to detail, so no two are exactly alike.",
    price: 3500,
    displayPrice: '$35',
    category: 'tote',
    images: ['/images/products/tote-bag-1.jpg'],
    stripePriceId: 'price_1T1VufBSG79lBdhpvx5ExXrv', // TODO: Replace with real Stripe Price ID from your dashboard
    available: true,
    badge: 'Popular',
    notes: 'Minimum order: 4 bags. Lead time: 2 weeks. Price per bag.',
  },
  {
    id: 'custom-project',
    slug: 'custom-project',
    name: "Let's Build Something Together",
    description:
      "Have a project in mind but not sure how to make it? Tell me what you're dreaming up.",
    longDescription:
      "I love a new challenge. If you have something you want to make — a gift, a home project, a party decoration, anything — but you're not sure how to pull it off, reach out. We'll figure it out together. I genuinely love hearing about new project ideas. The weirder, the better.",
    price: 0,
    displayPrice: 'Free consult',
    category: 'custom',
    images: ['/images/products/custom-project.jpg'],
    stripePriceId: 'price_1T1VxoBSG79lBdhp1sp8Bjc6',
    available: true,
    customForm: true,
    badge: 'New',
  },
  {
    id: 'workshops',
    slug: 'workshops',
    name: 'Join a Live Workshop',
    description: 'Craft along with me live on Zoom. New projects every month.',
    longDescription:
      "Pour yourself a drink, gather your materials, and let's make something together. My live Zoom workshops are relaxed, fun, and beginner-friendly. You'll leave with a finished project and a new skill.",
    price: 3000,
    displayPrice: 'From $30',
    category: 'digital',
    images: ['/images/products/workshop.jpg'],
    stripePriceId: 'price_1T1VwWBSG79lBdhpFERReuKI',
    available: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
