import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('✅ Payment received:', {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        productName: session.metadata?.productName,
        amount: session.amount_total,
        metadata: session.metadata,
      })

      // TODO: Add post-purchase email via Resend
      // Example:
      // await resend.emails.send({
      //   from: 'Angie Created <hello@angiecreated.com>',
      //   to: session.customer_details?.email!,
      //   subject: 'Your order is confirmed! 🎉',
      //   html: `<p>Thanks for your order, ${session.customer_details?.name}!</p>`
      // })

      // TODO: Notify Angie of new order
      // await resend.emails.send({
      //   from: 'Orders <orders@angiecreated.com>',
      //   to: 'angie@angiecreated.com',
      //   subject: `New order: ${session.metadata?.productName}`,
      //   html: `<pre>${JSON.stringify(session.metadata, null, 2)}</pre>`
      // })
      break
    }

    case 'payment_intent.payment_failed': {
      console.error('❌ Payment failed:', event.data.object)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
