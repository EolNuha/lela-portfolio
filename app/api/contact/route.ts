import { buildContactEmail } from '@/lib/contact-email'

const TO = process.env.CONTACT_TO ?? 'dorelanuha22@gmail.com'
// The sender's domain has to be verified in Resend; neja.app is.
const FROM = process.env.CONTACT_FROM ?? 'Dorela Nuha Portfolio <portfolio@neja.app>'
// Vercel rejects request bodies over 4.5 MB, so files have to fit under that together.
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fail = (status: number, message: string) => Response.json({ ok: false, message }, { status })

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return Response.json({ ok: false, fallback: true }, { status: 503 })

  let data: FormData
  try {
    data = await request.formData()
  } catch {
    return fail(400, 'Your message could not be read. Please try again.')
  }

  if (String(data.get('website') ?? '')) return Response.json({ ok: true })

  const name = String(data.get('name') ?? '').trim().slice(0, 120)
  const email = String(data.get('email') ?? '').trim().slice(0, 200)
  const message = String(data.get('message') ?? '').trim().slice(0, 5000)
  const links = data
    .getAll('link')
    .map((value) => String(value).trim())
    .filter((url) => /^https?:\/\/\S+$/i.test(url))
    .slice(0, 10)
  const files = data.getAll('attachment').filter((value): value is File => value instanceof File && value.size > 0).slice(0, 5)

  if (!name || !message) return fail(400, 'Please fill in name, email, and message.')
  if (!EMAIL_PATTERN.test(email)) return fail(400, 'Please enter a valid email address.')
  if (files.reduce((total, file) => total + file.size, 0) > MAX_ATTACHMENT_BYTES) return fail(413, 'Attachments must be under 4MB in total.')

  const { subject, html, text } = buildContactEmail({
    name,
    email,
    message,
    links,
    attachments: files.map((file) => ({ name: file.name, size: file.size })),
    sentAt: new Date(),
  })

  const attachments = await Promise.all(
    files.map(async (file) => ({ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString('base64') })),
  )

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, html, text, attachments }),
  })

  if (!sent.ok) {
    console.error('Resend refused the contact email', sent.status, await sent.text())
    return fail(502, 'Unable to send message right now. Try emailing directly.')
  }

  return Response.json({ ok: true })
}
