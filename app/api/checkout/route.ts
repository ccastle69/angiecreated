import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, productName, quantity = 1, metadata = {}, slug } = body

    if (!priceId) {
      return NextResponse.json(
        { error: 'No Stripe price ID set for this product yet. Please contact Angie directly.' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const isWorkshop = slug?.includes('workshop')

    const session = await createCheckoutSession({
      priceId,
      productName,
      quantity,
      metadata,
      successUrl: `${baseUrl}/shop/success?type=${isWorkshop ? 'workshop' : 'product'}`,
      cancelUrl: `${baseUrl}/shop/${slug || ''}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
