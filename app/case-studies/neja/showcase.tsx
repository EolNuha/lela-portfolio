import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowUpRight, CalendarCheck, Car, ChevronsRight, Download, Heart, Link2, MapPin, Ticket, Users, Wallet,
} from 'lucide-react'
import { ScreenCycle } from './interactive'
import { Phone } from './phone'

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

export function Overview({ phones, hero = false, children }: { phones: Screen[]; hero?: boolean; children?: ReactNode }) {
  const Root = hero ? 'header' : 'section'
  const Title = hero ? 'h1' : 'h2'
  return (
    <Root className={`q-ov${hero ? ' is-hero' : ''}`} aria-label={hero ? undefined : 'Overview'}>
      {children}
      <img className="q-ov-ghost" src={img('wordmark')} alt="" aria-hidden="true" />
      <div className="q-ov-tags">
        <span>iOS and Android</span>
        <span>UX/UI Design</span>
        <span>Self initiated</span>
      </div>
      <Title className="q-ov-title">
        {hero && <span className="sr-only">NEJA: </span>}
        Every event,<br /><em>one app.</em>
      </Title>
      <p className="q-ov-sub" style={delay(100)}>Find it, decide with friends, buy the ticket, and get there and back. Neja is about gathering together.</p>
      <div className="q-ov-stage">
        {phones.map((screen, i) => (
          <div key={screen.src} className={`q-ov-phone is-${i}`} style={{ ...delay(140 + i * 70), ['--i' as string]: i }}>
            <Phone src={screen.src} alt={`NEJA ${screen.label} screen`} lazy={!hero} />
          </div>
        ))}
        <Chip className="is-vote" icon={<CalendarCheck size={18} />} title="Saturday, 21:00 wins" sub="78% of votes">
          <i className="q-chip-bar" aria-hidden="true" />
        </Chip>
        <Chip className="is-going" icon={<Users size={18} />} title="11 friends are in">
          <span className="q-chip-faces" aria-hidden="true"><i /><i /><i /><i /></span>
        </Chip>
        <Chip className="is-ticket" icon={<Ticket size={18} />} title="Ticket confirmed" sub="Sunny Hill · Standard" />
        <Chip className="is-ride" icon={<Car size={18} />} title="Ride home booked" sub="Leaves 02:30 · 3 seats left" />
      </div>
    </Root>
  )
}

const events = [
  { art: 'concert', title: 'Dukagjini Live Sessions', date: 'Fri, Jul 10 · 21:00', venue: 'Amfiteatri, Pejë', price: '€12' },
  { art: 'dj', title: 'Zone Club: Techno Night', date: 'Sat, Jun 20 · 23:00', venue: 'Zone Club, Prishtinë', price: '€10' },
  { art: 'dua-red', title: 'Sunny Hill Festival 2026', date: 'Fri, May 22 · 20:00', venue: 'Gërmi, Prishtinë', price: '€19', featured: true },
  { art: 'gate', title: 'Gate Club Saturdays', date: 'Sat, Apr 13 · 22:00', venue: 'Gate Club, Prishtinë', price: '€8', tag: 'New' },
  { art: 'club-neon', title: 'Neon Fridays', date: 'Fri, Jun 5 · 22:30', venue: 'Rooftop 13, Prishtinë', price: 'Free' },
]

export function EventCards() {
  return (
    <section id="event-cards" className="q-evc" aria-label="Event cards">
      <h2 className="q-evc-title">Every category on one feed, <span>styled like the poster</span> that made you want to go.</h2>
      <div className="q-evc-row">
        {events.map((event, i) => (
          <article key={event.title} className={`q-evc-card${event.featured ? ' is-featured' : ''}`} style={delay(i * 70)}>
            <div className="q-evc-art">
              <img src={img(event.art)} alt="" loading="lazy" />
              {event.tag && <span className="q-evc-tag">{event.tag}</span>}
              <span className="q-evc-price">{event.price}</span>
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
  const ticket = 'The receipt is the ticket: the most critical touchpoint of the journey, designed to remove friction at the door.'
  return (
    <section id="anatomy" className="q-anat" aria-label="App anatomy">
      <p className="q-anat-mobile">{intro}</p>
      <div className="q-anat-board">
        <p className="q-anat-text is-intro">{intro}</p>
        <div className="q-anat-phone is-top"><Phone src={top.src} alt={`NEJA ${top.label} screen`} /></div>
        <img className="q-anat-word" src={img('wordmark')} alt="NEJA" />
        <div className="q-anat-phone is-bottom"><Phone src={bottom.src} alt={`NEJA ${bottom.label} screen`} /></div>

        <span className="q-anat-line is-a" aria-hidden="true" />
        <div className="q-anat-call is-upcoming">
          <img src={img('concert')} alt="" loading="lazy" />
          <div><span>Your upcoming event · Jul 10</span><strong>Dukagjini Live Sessions</strong></div>
          <i><ArrowUpRight size={14} /></i>
        </div>

        <span className="q-anat-line is-b" aria-hidden="true" />
        <div className="q-anat-call is-trending">
          <img src={img('dua-red')} alt="" loading="lazy" />
          <span className="q-anat-pill">Trending</span>
          <i className="q-anat-heart"><Heart size={13} /></i>
          <div><strong>SUNNYHILL</strong><span>Prishtinë · From €19</span></div>
        </div>

        <span className="q-anat-line is-c" aria-hidden="true" />
        <div className="q-anat-call is-ticket">
          <img src={img('dua-stage')} alt="" loading="lazy" />
          <strong>SUNNYHILL</strong>
          <dl>
            <div><dt>Date</dt><dd>May 22, 2026</dd></div>
            <div><dt>Time</dt><dd>20:00</dd></div>
            <div><dt>Location</dt><dd>Gërmi, Prishtinë</dd></div>
            <div><dt>Ticket</dt><dd>Standard</dd></div>
          </dl>
          <span className="q-anat-code" aria-hidden="true" />
          <small>2312318694427 48</small>
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
            <linearGradient id="cordA" x1="0" x2="1"><stop offset="0" stopColor="#ff5fb4" /><stop offset="1" stopColor="#b02779" /></linearGradient>
            <linearGradient id="cordB" x1="0" x2="1"><stop offset="0" stopColor="#811e93" /><stop offset="1" stopColor="#b26cf0" /></linearGradient>
          </defs>
          {[
            { d: 'M-20 420 C 260 380, 620 250, 1020 150', c: 'url(#cordA)' },
            { d: 'M-20 600 C 300 560, 700 440, 1020 330', c: 'url(#cordB)' },
            { d: 'M-20 1180 C 320 1080, 640 980, 1020 760', c: 'url(#cordA)' },
            { d: 'M-20 1330 C 280 1280, 720 1180, 1020 1100', c: '#743055' },
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

export function LandingDevice({ phone }: { phone: Screen }) {
  return (
    <section id="landing" className="q-web" aria-label="Landing page">
      <div className="q-web-head">
        <h2>Landing Page</h2>
      </div>
      <div className="q-web-scene">
        <div className="q-ipad">
          <div className="q-ipad-screen">
            <img className="q-site-bg" src={img('concert')} alt="" loading="lazy" />
            <nav className="q-site-nav">
              <span className="q-site-logo"><img src={img('symbol')} alt="" />NEJA</span>
              <span className="q-site-links"><b>Events</b><b>Plani</b><b>Rruga</b><b>Download</b></span>
              <span className="q-site-actions"><b>Log in</b><b className="is-dark">Get the app <ArrowUpRight size={9} /></b></span>
            </nav>
            <div className="q-site-hero">
              <h3><strong>Every event.</strong> Planned<br />together, <strong>instantly.</strong></h3>
              <p>NEJA brings every event in Kosovo into one app, with plans and rides built in.</p>
              <span className="q-site-store"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.2.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8zM14.1 5.8c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3z" /></svg>Download on the App Store</span>
            </div>
            <div className="q-site-phones">
              <div className="q-site-phone"><Phone src={phone.src} alt="" /></div>
            </div>
            <div className="q-site-card">
              <span className="q-site-avatar" aria-hidden="true" />
              <div><strong>Arta</strong><span>added Sunny Hill to Plani</span></div>
              <em>5 in</em>
            </div>
          </div>
          <span className="q-ipad-cam" aria-hidden="true" />
        </div>
      </div>
      <p className="q-web-caption">A web entry point that sells the whole journey in one screen, then hands people straight to the App Store.</p>
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
                <img src={img('wordmark')} alt="NEJA" />
                <p>Every event in Kosovo, in one app. Find it, plan it, get there.</p>
                <span className="q-poster-qr" aria-hidden="true" />
              </div>
            </div>
            <span className="q-poster-legs" aria-hidden="true"><i /><i /></span>
          </figure>
        ))}
      </div>
      <p className="q-camp-caption">Duotone performers in the three brand colors, with Albanian microcopy that sounds like a friend: “Mos e humb” means don’t miss it.</p>
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
        <p>Case study in progress · 2026</p>
        <div style={delay(120)}>
          <p>Available for new projects,</p>
          <a href="/#contact">Get in touch <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  )
}
