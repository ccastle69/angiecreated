import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

interface CreateCheckoutSessionParams {
  priceId: string
  productName: string
  quantity?: number
  metadata?: Record<string, string>
  successUrl: string
  cancelUrl: string
}

export async function createCheckoutSession({
  priceId,
  productName,
  quantity = 1,
  metadata = {},
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionParams) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity,
      },
    ],
    metadata: {
      productName,
      ...metadata,
    },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}
