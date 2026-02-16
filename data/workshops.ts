import { Workshop } from '@/lib/types'

export const workshops: Workshop[] = [
  {
    id: 'wine-bottle-upcycle',
    slug: 'wine-bottle-upcycle',
    title: 'Wine Bottle Upcycle Night',
    description:
      'Turn empty wine bottles into beautiful glass cups and vases — step by step, live on Zoom.',
    longDescription:
      "Don't throw out those wine bottles! In this 90-minute live workshop, I'll walk you through scoring, snapping, sanding, and decorating your bottles into gorgeous handmade glassware. It's easier than it looks, and way more fun with a group. Grab your materials, pour a glass (of a new bottle 🍷), and let's get crafty.",
    date: '2025-03-15T19:00:00',
    duration: '90 minutes',
    price: 3000,
    displayPrice: '$30',
    spotsTotal: 12,
    spotsRemaining: 8,
    stripePriceId: '', // TODO: Replace with real Stripe Price ID from your dashboard
    available: true,
    badge: 'Most Popular',
    topics: [
      'Glass scoring technique (no fancy tools needed)',
      'Hot/cold method for a clean snap',
      'Sanding inside, outside, and edges safely',
      'Decorating your finished piece',
      'Q&A — bring your bottles and questions',
    ],
    whatToBring: [
      '2–3 empty wine bottles (cleaned, labels removed)',
      'Safety glasses',
      'Sandpaper — I\'ll send a full materials list after booking',
      'A glass of wine to drink while you work 🍷',
      'Good vibes',
    ],
  },
  {
    id: 'tote-bag-workshop',
    slug: 'tote-bag-workshop',
    title: 'DIY Tote Bag Workshop',
    description:
      'Learn to make and customize your own tote bags from scratch — no sewing experience needed.',
    longDescription:
      "We'll start from a plain canvas tote and turn it into something you'll actually want to carry. I'll show you my favourite techniques for painting, stamping, and personalizing fabric. Perfect for gifts, matching sets, or just treating yourself.",
    date: '2025-04-05T18:00:00',
    duration: '2 hours',
    price: 3500,
    displayPrice: '$35',
    spotsTotal: 10,
    spotsRemaining: 10,
    stripePriceId: '', // TODO: Replace with real Stripe Price ID from your dashboard
    available: true,
    topics: [
      'Choosing and prepping your canvas',
      'Paint vs fabric markers — what works best',
      'Stamping and stencilling techniques',
      'Heat-setting your design so it lasts',
      'Ideas for personalizing for gifts',
    ],
    whatToBring: [
      'Plain canvas tote bag (I\'ll send a link to a good cheap one)',
      'Fabric paint or markers (list sent after booking)',
      'Old clothes — it gets messy!',
      'Your creative energy',
    ],
  },
]

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find((w) => w.slug === slug)
}
