import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TYPE_LABELS: Record<string, string> = {
  tote: 'Custom tote bags',
  'custom-project': 'Custom project idea',
  workshop: 'Workshop question',
  brand: 'Brand partnership',
  other: 'General inquiry',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, type, message, heard } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const typeLabel = TYPE_LABELS[type] || 'General inquiry'

    // ── Email to Angie ──────────────────────────────────────────────────────
    await resend.emails.send({
      from: 'Angie Created <onboarding@resend.dev>',
      to: 'angie@angiecreated.com',
      replyTo: email,
      subject: `New inquiry: ${typeLabel} from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3D2B1F;">
          <div style="background: #FAF7F2; border-bottom: 3px solid #C4714A; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 24px; color: #C4714A;">New message from your website 🌿</h1>
          </div>
          <div style="padding: 32px; background: #FFFDF9; border: 1px solid #E8DDD0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; width: 140px; font-weight: bold;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;"><a href="mailto:${email}" style="color: #C4714A;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold;">Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;">${typeLabel}</td>
              </tr>
              ${heard ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-weight: bold;">How they found you</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0;">${heard}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px;">
              <p style="font-weight: bold; margin-bottom: 8px;">Message</p>
              <div style="background: #FAF7F2; border-left: 3px solid #C4714A; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DDD0;">
              <a href="mailto:${email}?subject=Re: Your inquiry to Angie Created"
                 style="background: #C4714A; color: white; padding: 12px 24px; border-radius: 99px; text-decoration: none; font-family: sans-serif; font-size: 14px; font-weight: bold;">
                Reply to ${name} →
              </a>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #3D2B1F; color: rgba(255,253,249,0.6); font-size: 12px; font-family: sans-serif;">
            Sent from angiecreated.com
          </div>
        </div>
      `,
    })

    // ── Auto-reply to sender ────────────────────────────────────────────────
    await resend.emails.send({
      from: 'Angie Created <onboarding@resend.dev>',
      to: email,
      subject: `Got it, ${name}! I'll be in touch soon 🌿`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3D2B1F;">
          <div style="background: #FAF7F2; border-bottom: 3px solid #C4714A; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 24px; color: #C4714A;">Angie Created</h1>
          </div>
          <div style="padding: 32px; background: #FFFDF9; border: 1px solid #E8DDD0;">
            <p style="font-size: 18px; margin-top: 0;">Hi ${name}! 👋</p>
            <p style="line-height: 1.7; color: #5a4a3a;">
              Thanks so much for reaching out — I got your message and I'm genuinely excited to read it.
              I'll get back to you within 1–2 days.
            </p>
            <p style="line-height: 1.7; color: #5a4a3a;">
              In the meantime, feel free to browse the shop or check out upcoming workshops if you haven't already.
            </p>
            <div style="margin-top: 28px;">
              <a href="https://angiecreated.vercel.app/shop"
                 style="background: #C4714A; color: white; padding: 12px 24px; border-radius: 99px; text-decoration: none; font-family: sans-serif; font-size: 14px; font-weight: bold; margin-right: 12px;">
                Visit the Shop
              </a>
              <a href="https://angiecreated.vercel.app/workshops"
                 style="background: #7A9E7E; color: white; padding: 12px 24px; border-radius: 99px; text-decoration: none; font-family: sans-serif; font-size: 14px; font-weight: bold;">
                See Workshops
              </a>
            </div>
            <p style="margin-top: 32px; line-height: 1.7; color: #5a4a3a;">
              Talk soon,<br/>
              <strong>Angie</strong>
            </p>
          </div>
          <div style="padding: 16px 32px; background: #3D2B1F; color: rgba(255,253,249,0.6); font-size: 12px; font-family: sans-serif;">
            You're receiving this because you submitted a form at angiecreated.com
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
