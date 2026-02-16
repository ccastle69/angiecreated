import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { Resend } from 'resend'
import Stripe from 'stripe'

const resend = new Resend(process.env.RESEND_API_KEY)

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
      const customerName = session.customer_details?.name || 'there'
      const customerEmail = session.customer_details?.email
      const productName = session.metadata?.productName || 'your order'
      const amountPaid = session.amount_total
        ? `$${(session.amount_total / 100).toFixed(2)}`
        : ''
      const isWorkshop = productName.toLowerCase().includes('workshop')

      // ── Notify Angie of new order ─────────────────────────────────────────
      await resend.emails.send({
        from: 'Angie Created <onboarding@resend.dev>',
        to: 'angie@angiecreated.com',
        subject: `💰 New order: ${productName} from ${customerName}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3D2B1F;">
            <div style="background: #FAF7F2; border-bottom: 3px solid #C4714A; padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 24px; color: #C4714A;">New order received! 🎉</h1>
            </div>
            <div style="padding: 32px; background: #FFFDF9; border: 1px solid #E8DDD0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; width: 140px; font-weight: bold;">Customer</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;">${customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;">
                    <a href="mailto:${customerEmail}" style="color: #C4714A;">${customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold;">Product</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;">${productName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold;">Amount paid</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; color: #7A9E7E; font-weight: bold;">${amountPaid}</td>
                </tr>
                ${session.metadata && Object.keys(session.metadata).filter(k => k !== 'productName').length > 0 ? `
                <tr>
                  <td colspan="2" style="padding: 16px 0 8px; font-weight: bold;">Order details</td>
                </tr>
                ${Object.entries(session.metadata)
                  .filter(([k]) => k !== 'productName')
                  .map(([k, v]) => `
                <tr>
                  <td style="padding: 6px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold; text-transform: capitalize;">${k}</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #E8DDD0;">${v}</td>
                </tr>`).join('')}` : ''}
              </table>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DDD0;">
                <a href="mailto:${customerEmail}?subject=Your ${productName} order"
                   style="background: #C4714A; color: white; padding: 12px 24px; border-radius: 99px; text-decoration: none; font-family: sans-serif; font-size: 14px; font-weight: bold;">
                  Email ${customerName} →
                </a>
              </div>
            </div>
            <div style="padding: 16px 32px; background: #3D2B1F; color: rgba(255,253,249,0.6); font-size: 12px; font-family: sans-serif;">
              Payment processed via Stripe · Session: ${session.id}
            </div>
          </div>
        `,
      })

      // ── Confirmation email to customer ────────────────────────────────────
      if (customerEmail) {
        await resend.emails.send({
          from: 'Angie Created <onboarding@resend.dev>',
          to: customerEmail,
          subject: isWorkshop
            ? `You're in! See you at ${productName} 🎉`
            : `Order confirmed: ${productName} 🧺`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3D2B1F;">
              <div style="background: #FAF7F2; border-bottom: 3px solid #C4714A; padding: 24px 32px;">
                <h1 style="margin: 0; font-size: 24px; color: #C4714A;">Angie Created</h1>
              </div>
              <div style="padding: 32px; background: #FFFDF9; border: 1px solid #E8DDD0;">
                <p style="font-size: 18px; margin-top: 0;">Hi ${customerName}! 🌿</p>
                ${isWorkshop ? `
                <p style="line-height: 1.7; color: #5a4a3a;">
                  Your spot is reserved for <strong>${productName}</strong>! I'm so excited to make something with you.
                </p>
                <p style="line-height: 1.7; color: #5a4a3a;">
                  I'll send you the Zoom link and full materials list within 24 hours — keep an eye on your inbox.
                </p>` : `
                <p style="line-height: 1.7; color: #5a4a3a;">
                  Your order for <strong>${productName}</strong> is confirmed${amountPaid ? ` (${amountPaid})` : ''}!
                </p>
                <p style="line-height: 1.7; color: #5a4a3a;">
                  I'll be in touch within 24 hours to confirm your details and get started. Can't wait to make something for you!
                </p>`}
                <p style="margin-top: 32px; line-height: 1.7; color: #5a4a3a;">
                  Talk soon,<br/>
                  <strong>Angie</strong>
                </p>
              </div>
              <div style="padding: 16px 32px; background: #3D2B1F; color: rgba(255,253,249,0.6); font-size: 12px; font-family: sans-serif;">
                Questions? Reply to this email or reach out at angie@angiecreated.com
              </div>
            </div>
          `,
        })
      }
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
