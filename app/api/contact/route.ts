import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, type, message, heard } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Log the submission
    console.log('📬 New contact form submission:', {
      name,
      email,
      type,
      message: message.substring(0, 100) + '...',
      heard,
      timestamp: new Date().toISOString(),
    })

    // TODO: Connect to Resend to email submissions to angie@angiecreated.com
    // Install: npm install resend
    // Then:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'Website <noreply@angiecreated.com>',
    //   to: 'angie@angiecreated.com',
    //   replyTo: email,
    //   subject: `New inquiry: ${type || 'General'} from ${name}`,
    //   html: `
    //     <h2>New inquiry from ${name}</h2>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Type:</strong> ${type}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //     <p><strong>Heard about you via:</strong> ${heard || 'Not specified'}</p>
    //   `
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
