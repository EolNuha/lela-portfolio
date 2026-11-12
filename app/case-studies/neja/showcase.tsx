import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowUpRight, Bell, CalendarCheck, ChevronsRight, Download, Heart, Link2, MapPin, Ticket, Users, Wallet,
} from 'lucide-react'
import { ScreenCycle } from './interactive'
import { Phone } from './phone'
import { WelcomePhone } from './welcome'

const img = (name: string) => `/neja/${name}.webp`
const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

type Screen = { src: string; label: string }

function Chip({ icon, title, sub, className = '', children }: { icon: ReactNode; title: string; sub?: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`q-chip ${className}`}>
      <span className="q-chip-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        {sub && <span>{sub}</span>}
        {children}
      </div>
    </div>
  )
}

export function Overview({ phones, center, hero = false, children }: { phones: Screen[]; center?: ReactNode; hero?: boolean; children?: ReactNode }) {
  const Root = hero ? 'header' : 'section'
  const Title = hero ? 'h1' : 'h2'
  return (
    <Root className={`q-ov${hero ? ' is-hero' : ''}`} aria-label={hero ? undefined : 'Overview'}>
      {children}
      <img className="q-ov-ghost" src="/neja/app/logo.svg" alt="" aria-hidden="true" />
      <div className="q-ov-tags">
        <span>iOS and Android</span>
        <span>Product · Strategy · Design</span>
        <span className="is-accent">Launching 2027</span>
      </div>
      <Title className="q-ov-title">
        {hero && <span className="sr-only">NEJA: </span>}
        Every event,<br /><em>one app.</em>
      </Title>
      <p className="q-ov-sub" style={delay(100)}>Find it, decide with friends, get the ticket, and get there and back. Neja is about gathering together.</p>
      <div className="q-ov-stage">
        {phones.map((screen, i) => (
          <div key={screen.src} className={`q-ov-phone is-${i}`} style={{ ...delay(140 + i * 70), ['--i' as string]: i }}>
            {i === 2 && center ? center : <Phone src={screen.src} alt={`NEJA ${screen.label} screen`} lazy={!hero} />}
          </div>
        ))}
        <Chip className="is-vote" icon={<CalendarCheck size={18} />} title="Plan made in Plani" sub="Event first, then your people" />
        <Chip className="is-going" icon={<Users size={18} />} title="Who’s coming with you?">
          <span className="q-chip-faces" aria-hidden="true"><i /><i /><i /><i /></span>
        </Chip>
        <Chip className="is-ticket" icon={<Ticket size={18} />} title="Ticket in your wallet" sub="Saved from the organiser" />
        <Chip className="is-ride" icon={<Bell size={18} />} title="Starts in 2 hours" sub="Reminder from NEJA" />
      </div>
    </Root>
  )
}

const events = [
  { art: 'dukagjini.jpg', title: 'Dukagjini Live Sessions', date: 'Coming soon', venue: 'Dukagjini, Prishtinë', category: 'Live music' },
  { art: 'romeo-xhulieta.jpg', title: 'Romeo dhe Xhulieta', date: '23 – 25 Nov · Teatri Kombëtar', venue: 'Pallati i Rinisë, Prishtinë', category: 'Theatre' },
  { art: 'euphoria.jpg', title: 'Euphoria Night', date: 'Sat, 28 Nov · 23:00', venue: 'Zone Electronic, Prishtinë', category: 'Club night', featured: true, tag: 'Trending' },
  { art: 'imazhe-migruese.jpg', title: 'Imazhe Migruese', date: 'Until 11 Dec', venue: 'Galeria Kombëtare, Prishtinë', category: 'Exhibition', tag: 'Free entry' },
  { art: 'opera-gala.jpg', title: 'Opera Gala', date: 'Thu, 19 Nov · 19:30', venue: 'Klan Arena, Prishtinë', category: 'Classical' },
]

export function EventCards() {
  return (
    <section id="event-cards" className="q-evc" aria-label="Event cards">
      <h2 className="q-evc-title">Every category on one feed, <span>styled like the poster</span> that made you want to go.</h2>
      <div className="q-evc-row">
        {events.map((event, i) => (
          <article key={event.title} className={`q-evc-card${event.featured ? ' is-featured' : ''}`} style={delay(i * 70)}>
            <div className="q-evc-art">
              <img src={`/neja/app/events/${event.art}`} alt="" loading="lazy" />
              {event.tag && <span className="q-evc-tag">{event.tag}</span>}
              <span className="q-evc-price">{event.category}</span>
              <span className="q-evc-actions" aria-hidden="true"><i><Heart size={13} /></i><i><Link2 size={13} /></i></span>
            </div>
            <div className="q-evc-info">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p><MapPin size={12} />{event.venue}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Anatomy({ top, bottom }: { top: Screen; bottom: Screen }) {
  const intro = 'Get to know the app inside out. Every detail is there to move people from finding an event to getting in.'
  const ticket = 'The wallet holds every ticket, wherever it was bought: the date, the doors, and a link back to the organiser’s ticket page for the entry ticket itself.'
  return (
    <section id="anatomy" className="q-anat" aria-label="App anatomy">
      <p className="q-anat-mobile">{intro}</p>
      <div className="q-anat-board">
        <p className="q-anat-text is-intro">{intro}</p>
        <div className="q-anat-phone is-top"><Phone src={top.src} alt={`NEJA ${top.label} screen`} /></div>
        <img className="q-anat-word" src="/neja/app/logo.svg" alt="NEJA" />
        <div className="q-anat-phone is-bottom"><Phone src={bottom.src} alt={`NEJA ${bottom.label} screen`} /></div>

        <span className="q-anat-line is-a" aria-hidden="true" />
        <div className="q-anat-call is-upcoming">
          <img src="/neja/app/events/opera-gala.jpg" alt="" loading="lazy" />
          <div><span>Coming up · 19 Nov</span><strong>Opera Gala</strong></div>
          <i><ArrowUpRight size={14} /></i>
        </div>

        <span className="q-anat-line is-b" aria-hidden="true" />
        <div className="q-anat-call is-trending">
          <img src="/neja/app/events/euphoria.jpg" alt="" loading="lazy" />
          <span className="q-anat-pill">Trending</span>
          <i className="q-anat-heart"><Heart size={13} /></i>
          <div><strong>EUPHORIA NIGHT</strong><span>Zone Electronic · 28 Nov</span></div>
        </div>

        <span className="q-anat-line is-c" aria-hidden="true" />
        <div className="q-anat-call is-ticket">
          <img src="/neja/app/ticket-photo.jpg" alt="" loading="lazy" />
          <strong>DEEP SPACE PRISHTINA</strong>
          <dl>
            <div><dt>Date</dt><dd>12 Nov</dd></div>
            <div><dt>Doors</dt><dd>14:00</dd></div>
            <div><dt>Ticket</dt><dd>Standard</dd></div>
            <div><dt>Admits</dt><dd>1</dd></div>
          </dl>
          <small>Bought on the organiser’s site</small>
        </div>

        <p className="q-anat-text is-ticket">{ticket}</p>

        <span className="q-anat-line is-d" aria-hidden="true" />
        <div className="q-anat-call is-wallet">
          <i><Download size={14} /></i>
          <i className="is-accent"><Wallet size={14} /></i>
          <span>Add to Wallet</span>
          <ChevronsRight size={16} />
        </div>

        <svg className="q-anat-cords" viewBox="0 0 1000 1360" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cordA" x1="0" x2="1"><stop offset="0" stopColor="#ff7cc4" /><stop offset="1" stopColor="#ff2daa" /></linearGradient>
            <linearGradient id="cordB" x1="0" x2="1"><stop offset="0" stopColor="#a8126d" /><stop offset="1" stopColor="#ff5cbd" /></linearGradient>
          </defs>
          {[
            { d: 'M-20 420 C 260 380, 620 250, 1020 150', c: 'url(#cordA)' },
            { d: 'M-20 600 C 300 560, 700 440, 1020 330', c: 'url(#cordB)' },
            { d: 'M-20 1180 C 320 1080, 640 980, 1020 760', c: 'url(#cordA)' },
            { d: 'M-20 1330 C 280 1280, 720 1180, 1020 1100', c: '#7a0f50' },
          ].map((cord) => (
            <g key={cord.d}>
              <path d={cord.d} stroke={cord.c} />
              <path d={cord.d} className="q-anat-twist" />
            </g>
          ))}
        </svg>
      </div>
      <p className="q-anat-mobile">{ticket}</p>
    </section>
  )
}

export function LandingDevice() {
  return (
    <section id="landing" className="q-web" aria-label="Launch site">
      <div className="q-web-head">
        <h2>Launch Site</h2>
        <a className="q-web-visit" href="https://neja.app" target="_blank" rel="noreferrer">Visit neja.app<ArrowUpRight size={16} /></a>
      </div>
      <div className="q-web-scene">
        <div className="q-ipad">
          <div className="q-ipad-screen">
            <div className="q-site" aria-label="The neja.app home page">
              <span className="q-site-media" aria-hidden="true" />
              <nav className="q-site-tab" aria-hidden="true"><b>About</b><b>Features</b><b>How it works</b><b>For hosts</b><b>FAQ</b></nav>
              <span className="q-site-lang" aria-hidden="true"><b>EN</b>/<i>SQ</i></span>
              <div className="q-site-stage">
                <div className="q-site-copy">
                  <div className="q-site-pitch">
                    <p className="q-site-kicker">Coming soon</p>
                    <p className="q-site-lead">Every event in Kosova, in one app. Be the first to know.</p>
                    <span className="q-site-field" aria-hidden="true">
                      <em>Your email</em>
                      <b>Notify me<i><ArrowUpRight /></i></b>
                    </span>
                    <p className="q-site-platform">Launching on the App Store and Google Play</p>
                  </div>
                  <img className="q-site-brand" src="/neja/app/logo.svg" alt="NEJA" />
                </div>
                <div className="q-site-device"><WelcomePhone /></div>
              </div>
            </div>
          </div>
          <span className="q-ipad-cam" aria-hidden="true" />
        </div>
      </div>
      <p className="q-web-caption">neja.app collects the waitlist before launch, in English and Albanian, with the app’s real welcome screen playing beside the sign-up.</p>
    </section>
  )
}

const posters = [
  { tone: 'magenta', art: 'dua-red', kicker: 'Mos e humb', title: 'SUNNY HILL', date: '22.05.26', time: '20:00', venue: 'Gërmi, Prishtinë' },
  { tone: 'violet', art: 'concert', kicker: 'Live sonte', title: 'DUKAGJINI', date: '10.07.26', time: '21:00', venue: 'Amfiteatri, Pejë' },
  { tone: 'velvet', art: 'dj', kicker: 'Hajde', title: 'ZONE CLUB', date: '20.06.26', time: '23:00', venue: 'Zone Club, Prishtinë' },
]

export function Campaign() {
  return (
    <section id="campaign" className="q-camp" aria-label="Poster campaign">
      <div className="q-camp-head">
        <h2>Out of Home Campaign</h2>
      </div>
      <div className="q-camp-wall">
        {posters.map((poster, i) => (
          <figure key={poster.title} className={`q-poster is-${poster.tone}`} style={delay(i * 110)}>
            <div className="q-poster-sheet">
              <div className="q-poster-top">
                <span>{poster.kicker}</span>
                <b>{poster.time} · {poster.date}</b>
              </div>
              <strong className="q-poster-title">{poster.title}</strong>
              <span className="q-poster-venue">{poster.venue}</span>
              <span className="q-poster-blob"><img src={img(poster.art)} alt="" loading="lazy" /></span>
              <div className="q-poster-foot">
                <img src="/neja/app/logo.svg" alt="NEJA" />
                <p>Every event in Kosova, in one app. Find it, plan it, get there.</p>
                <span className="q-poster-qr" aria-hidden="true" />
              </div>
            </div>
            <span className="q-poster-legs" aria-hidden="true"><i /><i /></span>
          </figure>
        ))}
      </div>
      <p className="q-camp-caption">Duotone performers in black, magenta, and white, with Albanian microcopy that sounds like a friend: “Mos e humb” means don’t miss it.</p>
    </section>
  )
}

export function Thanks({ screens }: { screens: Screen[] }) {
  return (
    <section className="q-thanks" aria-label="Thanks for scrolling">
      <h2 className="q-thanks-type">Thanks for<br />scrolling!</h2>
      <div className="q-thanks-phone" style={delay(150)}>
        <ScreenCycle screens={screens} />
      </div>
      <div className="q-thanks-foot">
        <p>Final phase · Launching 2027 · <a className="q-thanks-site" href="https://neja.app" target="_blank" rel="noreferrer">neja.app</a></p>
        <div style={delay(120)}>
          <p>Available for new projects,</p>
          <a href="/#contact">Get in touch <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  )
}
