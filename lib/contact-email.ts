export type ContactAttachment = { name: string; size: number }

export type ContactEmailInput = {
  name: string
  email: string
  message: string
  links: string[]
  attachments: ContactAttachment[]
  sentAt: Date
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Belgrade' }).format(date)

const label = (text: string) =>
  `<p style="margin:0 0 12px;color:#8a8a8a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;">${text}</p>`

export function buildContactEmail({ name, email, message, links, attachments, sentAt }: ContactEmailInput) {
  const firstName = name.split(/\s+/)[0]
  const subject = `Portfolio message from ${name}`
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: your message on my portfolio')}`

  const linkRows = links
    .map(
      (url) => `
        <tr><td style="padding:0 0 8px;">
          <a href="${escape(url)}" style="display:block;border:1px solid #e6e6e3;border-radius:12px;padding:14px 16px;text-decoration:none;">
            <span style="display:block;color:#111;font-size:14px;font-weight:600;">${escape(hostOf(url))} &#8599;</span>
            <span style="display:block;color:#6b6b6b;font-size:12px;margin-top:3px;word-break:break-all;">${escape(url)}</span>
          </a>
        </td></tr>`,
    )
    .join('')

  const attachmentRows = attachments
    .map(
      (file) => `
        <tr><td style="padding:0 0 8px;">
          <div style="border:1px solid #e6e6e3;border-radius:12px;padding:14px 16px;">
            <span style="color:#111;font-size:14px;font-weight:600;word-break:break-all;">&#128206; ${escape(file.name)}</span>
            <span style="color:#6b6b6b;font-size:12px;"> &middot; ${formatSize(file.size)}</span>
          </div>
        </td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f2f2ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2ef;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">
        <tr><td style="background:#0b0b0b;padding:28px 36px;">
          <p style="margin:0;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;">Dorela Nuha &middot; Portfolio</p>
          <p style="margin:6px 0 0;color:#9a9a9a;font-size:13px;">New message from your contact form</p>
        </td></tr>
        <tr><td style="padding:36px 36px 8px;">
          ${label('From')}
          <p style="margin:0;color:#111;font-size:24px;font-weight:600;letter-spacing:-.01em;">${escape(name)}</p>
          <p style="margin:6px 0 0;font-size:14px;"><a href="mailto:${escape(email)}" style="color:#1155cc;text-decoration:none;">${escape(email)}</a></p>
          <p style="margin:4px 0 0;color:#8a8a8a;font-size:12px;">${escape(formatDate(sentAt))}</p>
        </td></tr>
        <tr><td style="padding:28px 36px 8px;">
          ${label('Message')}
          <div style="border-left:3px solid #111;padding:2px 0 2px 16px;color:#1d1d1f;font-size:15px;line-height:1.65;">${escape(message).replace(/\r?\n/g, '<br>')}</div>
        </td></tr>
        ${links.length ? `<tr><td style="padding:28px 36px 0;">${label(`Links (${links.length})`)}<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${linkRows}</table></td></tr>` : ''}
        ${attachments.length ? `<tr><td style="padding:28px 36px 0;">${label(`Attachments (${attachments.length})`)}<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${attachmentRows}</table><p style="margin:2px 0 0;color:#8a8a8a;font-size:12px;">The files are attached to this email.</p></td></tr>` : ''}
        <tr><td style="padding:32px 36px 36px;">
          <a href="${replyHref}" style="display:inline-block;background:#111;border-radius:999px;color:#ffffff;font-size:14px;font-weight:600;padding:13px 26px;text-decoration:none;">Reply to ${escape(firstName)}</a>
        </td></tr>
        <tr><td style="border-top:1px solid #ececea;padding:20px 36px;color:#8a8a8a;font-size:12px;line-height:1.6;">
          Sent from the contact form on <a href="https://dorelanuha.vercel.app" style="color:#8a8a8a;">dorelanuha.vercel.app</a>. Replying to this email goes straight to ${escape(email)}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = [
    `New message from your portfolio`,
    ``,
    `From: ${name} <${email}>`,
    `Sent: ${formatDate(sentAt)}`,
    ``,
    message,
    ...(links.length ? ['', `Links:`, ...links.map((url) => `- ${url}`)] : []),
    ...(attachments.length ? ['', `Attachments:`, ...attachments.map((file) => `- ${file.name} (${formatSize(file.size)})`)] : []),
  ].join('\n')

  return { subject, html, text }
}
