type PhoneProps = { src: string; alt: string; className?: string; lazy?: boolean }

const LIGHT_SCREENS = ['screen-event', 'screen-payers', 'screen-ticket', 'screen-split', 'screen-payment-method', 'screen-add-card', 'screen-payment-complete']

const HEADER_IN_STATUS_AREA = ['screen-home-trending', 'screen-home-clean']

export const screenTone = (src: string) => (LIGHT_SCREENS.some((name) => src.includes(name)) ? 'light' : 'dark')
export const hasStatusBar = (src: string) => !HEADER_IN_STATUS_AREA.some((name) => src.includes(name))

export function PhoneKeys() {
  return <span className="q-phone-keys" aria-hidden="true" />
}

export function StatusBar({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={`q-phone-status is-${tone}`} aria-hidden="true">
      <b>9:41</b>
      <span>
        <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12"><path d="M8 2.6c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .6C5.2.6 2.6 1.7.7 3.6L2 5c1.6-1.5 3.7-2.4 6-2.4Zm0 3.7c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4.3a6.8 6.8 0 0 0-4.7 1.9l1.3 1.4c.9-.8 2.1-1.3 3.4-1.3Zm0 3.6c.5 0 1 .2 1.3.5L8 11.8 6.7 10.4c.3-.3.8-.5 1.3-.5Z" /></svg>
        <svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2.5" y="2.5" width="18" height="7" rx="2" /><path d="M24.5 4v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" opacity=".45" /></svg>
      </span>
    </span>
  )
}

export function Phone({ src, alt, className = '', lazy = true }: PhoneProps) {
  const tone = screenTone(src)
  return (
    <span className={`q-phone ${className}`}>
      <PhoneKeys />
      <img src={src} alt={alt} loading={lazy ? 'lazy' : 'eager'} draggable={false} />
      {hasStatusBar(src) && <StatusBar tone={tone} />}
      <span className={`q-phone-home is-${tone}`} aria-hidden="true" />
    </span>
  )
}
