import { Mail } from 'lucide-react'
import { PhoneKeys, StatusBar } from './phone'
import { InViewVideo } from './reveal'

const app = (name: string) => `/neja/app/${name}`

export function WelcomePhone() {
  return (
    <span className="q-phone">
      <PhoneKeys />
      <span className="q-welcome">
        <InViewVideo src={app('welcome.mp4')} poster={app('welcome-poster.jpg')} label="The NEJA welcome screen" />
        <span className="q-welcome-top">
          <small>Welcome to</small>
          <img src={app('logo.svg')} alt="NEJA" />
        </span>
        <span className="q-welcome-bottom" aria-hidden="true">
          <strong>Çka ka sonte?</strong>
          <span className="q-welcome-sub">Sign in to save events, make plans, and get tickets with friends.</span>
          <span className="q-welcome-email"><Mail strokeWidth={1.8} />Continue with email</span>
          <span className="q-welcome-social">
            <i><svg viewBox="0 0 24 24"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.2.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8zM14.1 5.8c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3z" /></svg></i>
            <i>
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.4-.2-2.1H12v4h6c-.1 1-.8 2.5-2.3 3.5v2.8h3.6c2.1-2 3.3-4.9 3.3-8.2z" />
                <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9C3.9 20.6 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.8 14.1c-.2-.7-.4-1.4-.4-2.1s.1-1.5.4-2.1V7H2.1C1.4 8.5 1 10.2 1 12s.4 3.5 1.1 5l3.7-2.9z" />
                <path fill="#EA4335" d="M12 5.4c1.6 0 2.7.7 3.4 1.3l2.5-2.4C16.4 2.9 14.4 2 12 2 7.7 2 3.9 4.4 2.1 7.9l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
              </svg>
            </i>
          </span>
          <span className="q-welcome-browse">Browse first ›</span>
        </span>
      </span>
      <StatusBar tone="dark" />
      <span className="q-phone-home is-dark" aria-hidden="true" />
    </span>
  )
}
