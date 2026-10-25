import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import { Afacad, Caveat, Inter, Jost } from 'next/font/google'
import {
  ArrowLeft, Briefcase, Car, Clock, GraduationCap, MessageCircle, Search, Users, Wallet, Zap,
} from 'lucide-react'
import { BackLink } from './back-link'
import { BackToTop } from './back-to-top'
import { SectionNav } from './section-nav'
import { GridSystem, InTheWild, LogoConstruction, Numbers } from './brand'
import {
  CaseStudyMotion, ColorColumns, CountUp, DragScroll, PhoneGallery, PlaniVote, StoryReel, SystemBoard, type GalleryItem,
} from './interactive'
import { Phone, PhoneKeys, StatusBar } from './phone'
import { Anatomy, Campaign, EventCards, LandingDevice, Overview, Thanks } from './showcase'
import { Sketches } from './sketch'
import './neja.css'
import './showcase.css'
import './brand.css'

const afacad = Afacad({ subsets: ['latin', 'latin-ext'], variable: '--font-afacad' })
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })
const jost = Jost({ subsets: ['latin', 'latin-ext'], variable: '--font-jost' })
const caveat = Caveat({ subsets: ['latin', 'latin-ext'], variable: '--font-caveat' })
const sketchHand = existsSync(join(process.cwd(), 'public/neja/sketch-hand.webp')) ? '/neja/sketch-hand.webp' : undefined

export const metadata: Metadata = {
  title: 'NEJA · Case Study in Progress · Dorela Nuha',
  description: 'NEJA is an event discovery app for every kind of event in Kosovo, with group planning and shared rides built in. An independent product case study by Dorela Nuha, currently in progress.',
}

const img = (name: string) => `/neja/${name}.webp`

type PhaseStatus = 'complete' | 'active' | 'upcoming'

const phases: { title: string; items: string[]; status: PhaseStatus }[] = [
  { title: 'Problem Discovery', items: ['Market gap', 'Starting hypothesis', 'Opportunity'], status: 'complete' },
  { title: 'User Research', items: ['Survey, ages 16 to 21', 'Key findings', 'Behavior patterns'], status: 'complete' },
  { title: 'Insights & Personas', items: ['Personas', 'Job to be done', 'Problem statement'], status: 'complete' },
  { title: 'Product Concept', items: ['Five pillars', 'Navigation model'], status: 'complete' },
  { title: 'Flows & Architecture', items: ['Journey map', 'App structure', 'Screen blueprint'], status: 'complete' },
  { title: 'Wireframes', items: ['Feed', 'Event detail', 'Plani'], status: 'complete' },
  { title: 'Visual Design & UI', items: ['Identity', 'Color & type', 'UI screens'], status: 'active' },
  { title: 'Prototype & Testing', items: ['Clickable prototype', 'Usability tests'], status: 'upcoming' },
  { title: 'Launch & Iteration', items: ['Phase 1 launch', 'Success metrics'], status: 'upcoming' },
]

const statusLabel: Record<PhaseStatus, string> = { complete: 'Complete', active: 'In progress', upcoming: 'Up next' }

const findings = [
  { title: 'Events are missed, not skipped', finding: '80% had missed an event they wanted to attend, citing late discovery, missing details, and information scattered across platforms.', insight: 'The core problem is visibility. People miss events because they never knew they existed.', shaped: 'Discover feed' },
  { title: 'There is no single place to look', finding: 'Most participants find events through friends, Instagram, and TikTok rather than through any dedicated platform.', insight: 'Discovery depends on luck and on who you follow. Every category needs to live in one place.', shaped: 'Categories' },
  { title: 'Going is a group decision', finding: 'Planning happens through group chats, recommendations, and asking friends who else is going.', insight: 'Once an event is found, the next friction is coordinating people around it.', shaped: 'Plani' },
  { title: 'Getting there is part of the event', finding: 'Responses repeatedly highlighted transport access, location visibility, and the difficulty of getting home after an event.', insight: 'Transportation is not separate from the event. It is part of the experience itself.', shaped: 'Rruga' },
  { title: 'Atmosphere outweighs information', finding: 'Mood, crowd energy, and who is performing mattered more to participants than traditional event descriptions.', insight: 'The interface has to feel immersive, not like a plain listing.', shaped: 'A cinematic UI' },
]

const personas = [
  {
    code: 'P01',
    name: 'Dren, 19',
    role: 'The Spontaneous Student',
    image: img('persona-student'),
    rows: [
      { icon: GraduationCap, text: 'University student in Prishtinë' },
      { icon: Wallet, text: 'Low purchasing power; actively looks for free and affordable events.' },
      { icon: Zap, text: 'Wants something new every weekend and goes wherever his friends are going.' },
      { icon: Search, text: 'Expects every event nearby in one feed, so he hears about them before, not the day after.' },
    ],
  },
  {
    code: 'P02',
    name: 'Arta, 27',
    role: 'The Planned Professional',
    image: img('persona-professional'),
    rows: [
      { icon: Briefcase, text: 'Marketing professional living in Ferizaj' },
      { icon: Wallet, text: 'Medium budget; willing to spend on events that are worth the trip.' },
      { icon: Zap, text: 'Wants to plan theatre, exhibitions, and concerts early, together with her friends.' },
      { icon: Search, text: 'Expects clear event details, group plans without endless chats, and a ride there and back.' },
    ],
  },
]

const frictions = ['Finding out events exist', 'Missing key details', 'Deciding with friends', 'Getting tickets', 'Getting there and back', 'Keeping the memories']

const journeyStages = ['Need', 'Discover', 'Decide together', 'Get tickets', 'Get there', 'The event', 'Get home', 'Remember']
const journeyRows = [
  {
    label: 'Doing',
    cells: ['Asks friends what’s happening this weekend.', 'Scrolls Instagram stories, venue pages, and TikTok, hoping to catch it.', 'Pastes links into group chats and waits for replies.', 'Hunts for the organizer, a ticket link, or a reservation line.', 'Works out who drives and who needs a ride.', 'Coordinates meetups by text and calls.', 'Looks for a ride home after the event.', 'Photos end up scattered across phones and stories.'],
  },
  {
    label: 'Thinking',
    cells: ['“Is anything happening near me?”', '“Is it worth going? What does it cost?”', '“Are my friends actually in?”', '“Where do I even buy this?”', '“Who’s driving? How do we split it?”', '“Where are you? Where do we meet?”', '“How do I get home safely?”', '“Where are the photos from the event?”'],
  },
  {
    label: 'Pain Points',
    cells: ['Events are scattered, so many are found too late or never.', 'Details are missing: price, time, location.', 'Plans die in the chat when someone says no.', 'Ticket info lives on a different platform.', 'Transport is hard to arrange and to split.', 'Live coordination is scattered across apps.', 'Getting home is often the hardest part.', 'No shared record of the event.'],
  },
  {
    label: 'NEJA Answers',
    cells: ['Every event nearby, across every category, from the first screen.', 'Event cards with every key detail.', 'Plani: In, Out, or Maybe, with alternatives on Out.', 'Get tickets redirects to the organizer in V1.', 'Rruga: shared rides and split costs.', 'An event chat that unlocks, then disappears.', '“Going home?” Ride groups and trusted contacts.', 'Memories: photos, videos, and reviews.'],
  },
]

const pillars = [
  { name: 'Discover', copy: 'Every category of event in one feed, personalized by interests, location, and friends.', image: img('concert') },
  { name: 'Plani', copy: 'Collaborative plans where friends decide together which events to go to.', image: img('plani') },
  { name: 'Rruga', copy: 'Shared rides, split costs, and organized movement before and after.', image: img('map') },
  { name: 'Experience', copy: 'Temporary communities around each event, built for live coordination.', image: img('club-neon') },
  { name: 'Memories', copy: 'Photos, videos, and reviews tied to each event, kept as a personal history.', image: img('zone') },
]

const row = (n: number) => 20 + n * 29.7

const structureNodes: { label: string; x: number; row: number; main?: boolean }[] = [
  { label: 'Sign in', x: 221, row: 5, main: true },
  { label: 'Home page', x: 326, row: 4, main: true },
  { label: 'Sign up', x: 326, row: 5 },
  { label: 'Password recovery', x: 326, row: 6 },
  { label: 'Event', x: 478, row: 0, main: true },
  ...['Location', 'Sign in', 'Account'].map((label, i) => ({ label, x: 478, row: i + 1 })),
  ...['My tickets', 'Favorites', 'Search'].map((label, i) => ({ label, x: 478, row: i + 8 })),
  ...['Upcoming / Past Events', 'Events / Organizers', 'Event / Organizers'].map((label, i) => ({ label, x: 595, row: i + 8 })),
  { label: 'Ticket Checkout', x: 765, row: 0, main: true },
  { label: 'Organizer', x: 765, row: 1 },
  ...['Edit', 'Location', 'Payment', 'Notifications', 'Mode', 'Support', 'Language', 'Sign out / Sign in'].map((label, i) => ({ label, x: 765, row: i + 3 })),
  { label: 'Payment', x: 906, row: 0, main: true },
]

const spine = (x: number, rows: number[]) => {
  const last = row(rows[rows.length - 1])
  return `M${x} ${row(0)}V${last - 8}Q${x} ${last} ${x + 8} ${last}H${x + 23}${rows.slice(0, -1).map((r) => `M${x} ${row(r)}H${x + 23}`).join('')}`
}

const structurePaths = {
  main: `M156 ${row(5)}H297Q305 ${row(5)} 305 ${row(5) - 8}V${row(4) + 8}Q305 ${row(4)} 313 ${row(4)}H447Q455 ${row(4)} 455 ${row(4) - 8}V${row(0) + 8}Q455 ${row(0)} 463 ${row(0)}H906`,
  soft: [
    `M305 ${row(5)}V${row(6) - 8}Q305 ${row(6)} 313 ${row(6)}H326M305 ${row(5)}H326`,
    spine(455, [1, 2, 3, 8, 9, 10]),
    spine(742, [1, 3, 4, 5, 6, 7, 8, 9, 10]),
  ],
}

const blueprint = [
  { screen: 'Home feed', elements: 'Map toggle, “For You” carousel, category pills, filter control.', rationale: 'Immediate clarity, so users can switch between discovery by location and discovery by topic.' },
  { screen: 'Event card', elements: 'Hero image, date and time badge, “friends going” avatar stack, save action.', rationale: 'High visual impact; social proof drives clicks.' },
  { screen: 'Event detail', elements: 'Summary, venue map, lineup, primary actions: Get Tickets and Add to Plani.', rationale: 'Minimal scroll depth, so decisions stay above the fold.' },
  { screen: 'Plani modal', elements: 'Friend selection, shareable link, quick poll: “Who’s down?”', rationale: 'Removes friction from group decisions.' },
]

const screens: Record<string, GalleryItem> = {
  welcome: { src: img('screen-welcome'), label: 'Welcome', title: '“Çka ka sonte?”', copy: 'The first screen asks the question people usually send to the group chat: what’s on tonight? Email, Apple, or Google sign in gets people to the feed in one tap.' },
  signIn: { src: img('screen-sign-in'), label: 'Sign in', title: '“Hajde...”', copy: 'Log in and new account live on one screen, with clear inline errors when an email is already linked to a NEJA account.' },
  location: { src: img('screen-location'), label: 'Location', title: 'Where do you go out?', copy: 'Location permission localizes the feed from the first session, with a manual city picker for people who would rather choose.' },
  trending: { src: img('screen-home-trending'), label: 'Trending', title: 'What’s happening, at a glance', copy: 'A trending hero event with its date and distance, upcoming events, and active plans with friends, all above the fold.' },
  home: { src: img('screen-home'), label: 'Discover', title: 'An immersive feed', copy: 'Every card carries a visual layer of cinematic imagery and an information layer with venue, time, price, and friends interested.' },
  homeClean: { src: img('screen-home-clean'), label: 'Home, alternate', title: 'A calmer home', copy: 'An alternate home direction with lighter overlays, explored while defining the visual hierarchy of the feed.' },
  event: { src: img('screen-event'), label: 'Event details', title: 'Everything needed to decide', copy: 'Date, time, venue map, friends going, ticket tiers, and the two actions that matter most: Add to Plani and Buy.' },
  split: { src: img('screen-split'), label: 'Split bill', title: 'Pay together or alone', copy: 'Checkout opens with a simple choice between splitting the bill with friends and paying for a single ticket.' },
  payers: { src: img('screen-payers'), label: 'Payers', title: 'Choose who’s in', copy: 'Pick payment partners from your friends, so a group ticket is settled before anyone arrives at the door.' },
  method: { src: img('screen-payment-method'), label: 'Payment method', title: 'Saved cards, fast checkout', copy: 'Saved cards up front, with a quick path to add a new one.' },
  addCard: { src: img('screen-add-card'), label: 'Add card', title: 'Add a card', copy: 'A focused card form with nothing else competing for attention.' },
  confirmed: { src: img('screen-payment-complete'), label: 'Confirmed', title: 'Payment complete', copy: 'A clear confirmation the moment the payment goes through.' },
  ticket: { src: img('screen-ticket'), label: 'Receipt', title: 'The receipt is the ticket', copy: 'A scannable barcode with the date, venue, and ticket type, ready to download or bring back to the dashboard.' },
}

const allScreens = [screens.welcome, screens.signIn, screens.location, screens.trending, screens.home, screens.homeClean, screens.event, screens.split, screens.payers, screens.method, screens.addCard, screens.confirmed, screens.ticket]

const colors = [
  { name: 'Midnight', hex: '#0B0910', role: 'Base surface', usage: 'Dark mode', texture: img('tex-midnight') },
  { name: 'Neja Magenta', hex: '#B02779', role: 'Primary action', usage: 'Buttons, highlights', texture: img('tex-magenta') },
  { name: 'Ultraviolet', hex: '#811E93', role: 'Payments', usage: 'Cards, checkout', texture: img('tex-ultraviolet') },
  { name: 'Velvet', hex: '#743055', role: 'Secondary action', usage: 'Tags, plans', texture: img('tex-velvet') },
  { name: 'Smoke', hex: '#3D3737', role: 'Sheets & overlays', usage: 'Modals, maps', texture: img('tex-smoke') },
  { name: 'Mist', hex: '#F9F9F9', role: 'Light surfaces', usage: 'Forms, receipts', texture: img('tex-mist') },
]

const voice = [
  { line: 'Çka ka sonte?', meaning: 'What’s on tonight?' },
  { line: 'Hajde...', meaning: 'Come on, let’s go.' },
  { line: 'Rruga · Plani', meaning: 'The road · The plan' },
]

const metrics = [
  { name: 'Discovery efficiency', copy: 'Average time from opening the app to an RSVP or ticket click. Lower means better personalization.' },
  { name: 'Social virality', copy: 'Conversion rate of shared event and Plani links into installs and RSVPs.' },
  { name: 'Retention at 30 days', copy: 'Share of users still active a month after onboarding.' },
]

const tracking = [
  { event: 'event_card_clicked', trigger: 'User taps an event card', params: 'event_id, category, position_in_feed', purpose: 'Content relevance & feed CTR' },
  { event: 'invite_link_generated', trigger: 'User taps “Invite friends”', params: 'event_id, channel', purpose: 'Social virality loop' },
]

const nextSteps = [
  { phase: '7', title: 'Component system', copy: 'Turn the screens into reusable buttons, event cards, filter chips, tags, inputs, and modals with defined variants.' },
  { phase: '8', title: 'Clickable prototype', copy: 'Tap an event into details, save it, add it to Plani, and check out, end to end in Figma.' },
  { phase: '8', title: 'Usability testing', copy: '“Can you find something to do this weekend in 10 seconds?” Then simplify navigation and reduce steps.' },
  { phase: '9', title: 'Phase 1 launch', copy: 'Seed the feed with curated public listings in Prishtinë and measure Monthly Active Bookers.' },
]

function Head({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <div className={`q-head${light ? ' is-light' : ''}`}>
      <h2>{title}</h2>
    </div>
  )
}

export default function NejaCaseStudy() {
  return (
    <main className={`q ${afacad.variable} ${inter.variable} ${jost.variable} ${caveat.variable}`} id="top">
      <CaseStudyMotion />

      <Overview hero phones={[screens.location, screens.payers, screens.home, screens.event, screens.confirmed]}>
        <nav className="q-topbar" aria-label="Case study">
          <BackLink><ArrowLeft size={16} /></BackLink>
          <span className="q-status">Case study in progress</span>
        </nav>
      </Overview>

      <section id="concept" className="q-sec q-dark q-concept">
        <h2 className="q-label">Concept</h2>
        <div className="q-concept-body">
          <p className="q-strong">NEJA is an event finder for every kind of event in Kosovo: concerts, festivals, theatre, sports, exhibitions, workshops, and nights out. On top of discovery, it adds Plani for deciding with friends and Rruga for getting there and back, features no other event app in the country offers. The goal is to make the whole experience of an event easier, more accessible, and more efficient, from start to end.</p>
          <p className="q-soft">Most people in Kosovo don’t skip events. They miss them, because they never knew they existed. Event information is scattered across Instagram stories, venue pages, posters, and word of mouth. NEJA brings it into one place and borrows the everyday mechanics of the apps Gen Z already uses, like story carousels, tags, and instant social actions. The name carries the intent: Neja is about gathering together.</p>
        </div>
        <img className="q-concept-mark" src={img('symbol')} alt="" aria-hidden="true" />
        <dl className="q-meta">
          <div><dt>Role</dt><dd>Founding Product Manager</dd></div>
          <div><dt>Type</dt><dd>Independent product</dd></div>
          <div><dt>Scope</dt><dd>Research, strategy, UX, UI</dd></div>
          <div><dt>Status</dt><dd>Visual design in progress</dd></div>
        </dl>
      </section>

      <Numbers />

      <LandingDevice phone={screens.home} />

      <section id="process" className="q-sec q-light q-process">
        <Head title="Design Process" light />
        <DragScroll className="q-phases-wrap" label="Design process phases">
          <ol className="q-phases">
            {phases.map((phase, i) => (
              <li key={phase.title} className={`q-phase is-${phase.status}`} style={{ ['--d' as string]: `${i * 55}ms` }}>
                <span className="q-phase-top">
                  <span>{i + 1}</span>
                  <em>{statusLabel[phase.status]}</em>
                </span>
                <h3>{phase.title}</h3>
                <ul>{phase.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </li>
            ))}
          </ol>
        </DragScroll>
        <div className="q-showcase">
          <figure className="q-tile is-tall">
            <div data-parallax="0.06" className="q-parallax"><Phone src={screens.event.src} alt="NEJA event details screen" /></div>
          </figure>
          <figure className="q-tile is-icon">
            <span className="q-appicon">
              <img src={img('symbol')} alt="NEJA app icon" />
              <em aria-label="3 notifications">3</em>
            </span>
          </figure>
          <figure className="q-tile is-card">
            <img src={img('card')} alt="NEJA payment card" loading="lazy" />
          </figure>
        </div>
      </section>

      <section id="research" className="q-sec q-light q-research">
        <Head title="User Research" light />
        <div className="q-research-top">
          <p className="q-strong is-dark">To understand how young people in Kosovo find, evaluate, and attend events, I ran a survey on where they find events, what information they prioritize, where current tools fail them, and how social coordination shapes their decisions.</p>
          <div className="q-stat">
            <CountUp value={80} suffix="%" />
            <p>of participants had missed an event they wanted to attend.</p>
          </div>
        </div>
        <div className="q-findings">
          {findings.map((item, i) => (
            <article key={item.title} className="q-finding" style={{ ['--d' as string]: `${i * 60}ms` }}>
              <span className="q-finding-index">{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.finding}</p>
              <p className="q-finding-insight">{item.insight}</p>
              <span className="q-finding-shaped">Shaped <strong>{item.shaped}</strong></span>
            </article>
          ))}
          <article className="q-finding is-quote" style={{ ['--d' as string]: '300ms' }}>
            <p>“People don’t skip events. They miss them, because the information never reached them.”</p>
            <span>The core insight</span>
          </article>
        </div>
      </section>

      <section id="personas" className="q-sec q-dark q-personas-sec">
        <Head title="Persona Analysis" />
        <div className="q-personas">
          {personas.map((persona, i) => (
            <div key={persona.code} className={`q-persona-slot is-${i}`} style={{ ['--d' as string]: `${i * 120}ms` }}>
              <article className="q-persona">
                <span className="q-persona-dot" aria-hidden="true" />
                <h3>{persona.name}</h3>
                <ul className="q-persona-rows">
                  {persona.rows.map((row) => {
                    const Icon = row.icon
                    return <li key={row.text}><Icon size={14} strokeWidth={1.6} />{row.text}</li>
                  })}
                </ul>
                <div className="q-persona-photo">
                  <img src={persona.image} alt={`Portrait of ${persona.name.split(',')[0]}, ${persona.role.toLowerCase()}`} loading="lazy" />
                </div>
              </article>
            </div>
          ))}
          <div className="q-persona-slot is-2" style={{ ['--d' as string]: '240ms' }}>
            <article className="q-persona is-jtbd">
              <span className="q-persona-dot" aria-hidden="true" />
              <h3>Job to be done</h3>
              <ul className="q-persona-rows">
                <li><Clock size={14} strokeWidth={1.6} />When I have free time,</li>
                <li><Search size={14} strokeWidth={1.6} />I want to see everything happening near me in one place,</li>
                <li><Users size={14} strokeWidth={1.6} />so I never miss an event I’d love and can easily go with my friends.</li>
              </ul>
              <span className="q-persona-note">Shared by both personas</span>
              <div className="q-persona-photo is-scene">
                <img src={img('gate')} alt="Two friends celebrating together at an event" loading="lazy" />
              </div>
            </article>
          </div>
        </div>
        <div className="q-problem">
          <span>Problem statement</span>
          <p>How might we bring every event in Kosovo into one personalized place, so people stop missing what they’d love, and make the journey from finding an event to getting home effortless?</p>
          <ul>{frictions.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section id="journey" className="q-sec q-light q-journey-sec">
        <Head title="Event Journey Map" light />
        <DragScroll className="q-journey-wrap" label="Event journey map">
          <div className="q-journey" style={{ ['--cols' as string]: journeyStages.length }}>
            <span className="q-journey-corner">Stages</span>
            {journeyStages.map((stage, i) => (
              <span key={stage} className="q-journey-stage" style={{ ['--t' as string]: i / (journeyStages.length - 1) }}>{stage}</span>
            ))}
            {journeyRows.map((row) => (
              <div key={row.label} className={`q-journey-row${row.label === 'NEJA Answers' ? ' is-answer' : ''}`}>
                <span className="q-journey-label">{row.label}</span>
                {row.cells.map((cell, i) => <p key={i} className="q-journey-cell">{cell}</p>)}
              </div>
            ))}
          </div>
        </DragScroll>
      </section>

      <section id="logic" className="q-sec q-dark q-logic">
        <div className="q-logic-text">
          <h2 className="q-label">Product Logic</h2>
          <p>The research turned scattered habits into one clear product logic: find the event, decide together, get there, live it, and remember it. Other event apps stop at the listing. NEJA covers the whole journey of an event, from start to end.</p>
        </div>
        <figure className="q-logic-photo">
          <img src={img('club-neon')} alt="" loading="lazy" />
          <span className="q-logic-outline" aria-hidden="true"><img src={img('symbol')} alt="" /></span>
        </figure>
        <div className="q-pillars">
          {pillars.map((pillar, i) => (
            <article key={pillar.name} className="q-pillar" style={{ ['--d' as string]: `${i * 70}ms` }}>
              <img src={pillar.image} alt="" loading="lazy" />
              <span>{i + 1}</span>
              <h3>{pillar.name}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="structure" className="q-sec q-light q-structure">
        <Head title="App Structure" light />
        <DragScroll className="q-tree-wrap" label="App structure">
          <div className="q-tree">
            <div className="q-tree-canvas">
              <span className="q-tree-phone"><span className="q-phone is-blank"><PhoneKeys /><img src={img('symbol')} alt="" /><StatusBar /><span className="q-phone-home is-dark" aria-hidden="true" /></span></span>
              <svg className="q-tree-lines" viewBox="0 0 960 340" aria-hidden="true">
                {structurePaths.soft.map((d) => <path key={d} d={d} className="is-soft" />)}
                <path d={structurePaths.main} />
              </svg>
              {structureNodes.map((node) => (
                <span
                  key={`${node.label}-${node.x}-${node.row}`}
                  className={`q-node${node.main ? ' is-main' : ''}`}
                  style={{ left: `calc(${node.x} * var(--u))`, top: `calc(${row(node.row)} * var(--u))` }}
                >
                  {node.label}
                </span>
              ))}
            </div>
          </div>
        </DragScroll>
        <div className="q-blueprint">
          <div className="q-blueprint-intro">
            <h3>Screen Blueprint</h3>
            <p>Before visual design, each screen in the core loop was mapped to its essential elements and the product reasoning behind it.</p>
          </div>
          <div className="q-table" role="table" aria-label="Screen blueprint">
            <div className="q-table-row is-head" role="row">
              <span role="columnheader">Screen</span>
              <span role="columnheader">Essential elements</span>
              <span role="columnheader">Product rationale</span>
            </div>
            {blueprint.map((row) => (
              <div className="q-table-row" role="row" key={row.screen}>
                <span role="cell">{row.screen}</span>
                <span role="cell">{row.elements}</span>
                <span role="cell">{row.rationale}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Anatomy top={screens.trending} bottom={screens.ticket} />

      <Sketches hand={sketchHand} />

      <section id="sign-in" className="q-sec q-dark q-flow">
        <Head title="First Sign In" />
        <PhoneGallery
          slots={[
            screens.welcome,
            screens.signIn,
            { note: <><p className="q-note-lead">Opens on a cinematic splash, then personalizes the feed so it adapts to what each person actually goes to.</p><ul className="q-note-list"><li>Event categories</li><li>Music and interests</li><li>Favorite cities</li><li>Budget range</li><li>Transportation preferences</li><li>Atmosphere preferences</li></ul></> },
            screens.location,
          ]}
        />
      </section>

      <section id="discover" className="q-sec q-dark q-flow">
        <Head title="Discover" />
        <PhoneGallery
          slots={[
            { note: <><p className="q-note-lead">Every category in one feed, trending, nearby, and personalized, so nothing worth going to slips past.</p><ul className="q-note-chips"><li>Concerts</li><li>Festivals</li><li>Theatre</li><li>Sports</li><li>Exhibitions</li><li>Workshops</li><li>Conferences</li><li>Nightlife</li></ul></> },
            screens.trending,
            screens.home,
            screens.event,
          ]}
        />
      </section>

      <EventCards />

      <section id="checkout" className="q-sec q-dark q-flow">
        <Head title="Ticket Checkout" />
        <PhoneGallery
          slots={[
            screens.split,
            screens.payers,
            { note: <p className="q-note-lead">Split the bill with friends or pay alone. In V1, Get tickets redirects to the organizer; this checkout is the direction for V2, once partnerships make in app payments viable.</p> },
            screens.method,
            screens.addCard,
            screens.confirmed,
            screens.ticket,
            null,
          ]}
        />
      </section>

      <section id="features" className="q-sec q-dark q-features-sec">
        <Head title="Core Features" />
        <div className="q-features">
          <article className="q-feature is-dark">
            <div className="q-feature-text">
              <h3>Discover</h3>
              <div>
                <p>Every event in one place, across every category. Each card pairs cinematic imagery with venue, time, price, category, distance, and friends interested.</p>
                <ul className="q-feature-pills"><li>Save</li><li>Add to Plani</li><li>Get tickets</li></ul>
              </div>
            </div>
            <div className="q-feature-media is-phone"><Phone src={screens.home.src} alt="NEJA discover screen" /></div>
          </article>

          <article className="q-feature is-light">
            <div className="q-feature-text">
              <h3>Plani</h3>
              <div>
                <p>Plans are built around events, not messages. Everyone answers In, Out, or Maybe. When someone is Out, NEJA asks what’s off and suggests alternatives, so the plan adapts instead of dying.</p>
              </div>
            </div>
            <div className="q-feature-media"><PlaniVote /></div>
          </article>

          <article className="q-feature is-light">
            <div className="q-feature-text">
              <h3>Rruga</h3>
              <div>
                <p>Getting there as part of the experience: ride to the event, ride home, split a ride, or join a ride group. Trusted contacts, route sharing, and arrival confirmation keep everyone safe.</p>
              </div>
            </div>
            <figure className="q-feature-media q-map">
              <img src={img('map')} alt="Map of Prishtina" loading="lazy" />
              <span className="q-map-pin" aria-hidden="true" />
              <span className="q-map-card is-top"><Car size={13} />Going home?</span>
              <span className="q-map-card is-bottom"><Users size={13} />3 people from Ferizaj are going</span>
            </figure>
          </article>

          <article className="q-feature is-dark">
            <div className="q-feature-text">
              <h3>Memories</h3>
              <div>
                <p>The experience doesn’t end when the event does. Attendees add photos, videos, and reviews, and the Profile becomes a personal history of every event attended.</p>
              </div>
            </div>
            <div className="q-feature-media q-memories">
              <figure><img src={img('zone')} alt="" loading="lazy" /><figcaption><MessageCircle size={11} />“Worth the drive.”</figcaption></figure>
              <figure><img src={img('gate')} alt="" loading="lazy" /><figcaption><MessageCircle size={11} />“Found people to split a taxi with.”</figcaption></figure>
            </div>
          </article>
        </div>
      </section>

      <section id="system" className="q-sec q-dark q-system-sec">
        <Head title="Design System" />
        <SystemBoard />
      </section>

      <LogoConstruction />

      <section id="type" className="q-sec q-dark q-type">
        <h2 className="q-label">Typography</h2>
        <div className="q-type-grid">
          <div className="q-type-main">
            <strong>Futura</strong>
            <div className="q-type-copy">
              <p>Futura brings the geometric energy of event posters while staying clear at small sizes, so event names feel loud and details stay readable.</p>
              <p>Paired with Albanian microcopy, it gives NEJA a voice that sounds like a friend.</p>
            </div>
          </div>
          <div className="q-type-weights">
            {[['Book', 400], ['Medium', 500], ['Demi', 600], ['Bold', 700]].map(([name, weight]) => (
              <div key={name} className="q-weight" style={{ fontWeight: weight }}>
                <span>{name}</span>
                <b aria-hidden="true">N</b>
              </div>
            ))}
          </div>
        </div>
        <div className="q-voice">
          {voice.map((item, i) => (
            <p key={item.line} style={{ ['--d' as string]: `${i * 80}ms` }}><strong>{item.line}</strong><em>{item.meaning}</em></p>
          ))}
        </div>
      </section>

      <section id="color" className="q-sec q-dark q-color-sec">
        <Head title="Color" />
        <ColorColumns colors={colors} />
      </section>

      <GridSystem phone={screens.home} />

      <section id="store" className="q-sec q-dark q-store">
        <div className="q-store-grid">
          <div className="q-store-tile">
            <div className="q-store-card">
              <div className="q-store-top">
                <span className="q-store-icon"><img src={img('symbol')} alt="" /></span>
                <div>
                  <strong>NEJA</strong>
                  <span>Every event in Kosovo, in one app</span>
                  <em>Get</em>
                </div>
              </div>
              <div className="q-store-stats">
                <div><span>Category</span><strong>Events</strong><em>All categories</em></div>
                <div><span>City</span><strong>Prishtinë</strong><em>Kosovo</em></div>
                <div><span>Launch</span><strong>Phase 1</strong><em>Curated feed</em></div>
              </div>
            </div>
          </div>
          <div className="q-store-tile is-home">
            <div className="q-home-frame">
              <div className="q-home-screen">
                <img className="q-home-wall" src={img('club-neon')} alt="" loading="lazy" />
                <span className="q-home-time">9:41</span>
                <span className="q-home-island" aria-hidden="true" />
                <span className="q-home-app">
                  <span className="q-store-icon is-lg"><img src={img('symbol')} alt="" /></span>
                  <em>NEJA</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="q-sec q-light q-stories-sec">
        <Head title="Launch Stories" light />
        <StoryReel
          stories={[
            <div key="a" className="q-story-body is-a">
              <p className="q-story-top">Everything happening in Prishtinë, in one app.</p>
              <img src={img('payment-hand')} alt="" loading="lazy" />
              <span className="q-sticker is-event"><img src={img('dua-red')} alt="" /><span><b>Sunny Hill</b>Sat · 20:00</span></span>
              <p className="q-story-big"><span>Çka ka</span><span>sonte?</span></p>
            </div>,
            <div key="b" className="q-story-body is-b">
              <p className="q-story-top is-center">Plan it with your people.</p>
              <span className="q-sticker is-poll"><b>Who’s in?</b><span><em>In · 5</em><em>Maybe · 1</em></span></span>
              <span className="q-sticker is-faces" aria-hidden="true"><i /><i /><i /></span>
              <Phone src={screens.trending.src} alt="" />
            </div>,
            <div key="c" className="q-story-body is-c">
              <img className="q-story-bg" src={img('concert')} alt="" loading="lazy" />
              <span className="q-sticker is-link">neja.app</span>
              <p className="q-story-big is-right"><span>Never miss</span><span>an event again.</span></p>
            </div>,
          ]}
        />
      </section>

      <Campaign />

      <InTheWild />
      <section id="strategy" className="q-sec q-light q-strategy">
        <Head title="Launch Strategy" light />
        <div className="q-strategy-grid">
          <div className="q-decision">
            <span>Key tradeoff</span>
            <p>No in app payments in V1. “Get tickets” redirects to organizers, ticket providers, and reservation lines, keeping the product realistic and avoiding payment liability and infrastructure.</p>
          </div>
          <div className="q-phase-plan">
            <div>
              <h3>Phase 1 · Aggregation & curation</h3>
              <p>Populate NEJA from public listings (promoter sites, public event posts, and regional platforms), with flagship events curated by hand to hold the visual standard.</p>
            </div>
            <div>
              <h3>Phase 2 · Organizers post directly</h3>
              <p>As Plani and Rruga drive traffic, organizers claim their venue, post events directly, and see live analytics: “150 people added your event to Plani.” Sponsored placement follows.</p>
            </div>
            <p className="q-guard">Guardrails: public data only, no implied partnerships, and immediate takedown on an organizer’s request.</p>
          </div>
        </div>

        <div className="q-success">
          <div className="q-north">
            <span>North star</span>
            <h3>Monthly Active Bookers</h3>
            <p>Unique users who save, RSVP, or click through to tickets for at least one event a month.</p>
          </div>
          <div className="q-metrics">
            {metrics.map((metric, i) => (
              <article key={metric.name} style={{ ['--d' as string]: `${i * 70}ms` }}>
                <h4>{metric.name}</h4>
                <p>{metric.copy}</p>
              </article>
            ))}
          </div>
          <div className="q-table is-tracking" role="table" aria-label="Tracking plan">
            <div className="q-table-row is-head" role="row">
              <span role="columnheader">Event</span>
              <span role="columnheader">Trigger</span>
              <span role="columnheader">Parameters</span>
              <span role="columnheader">Purpose</span>
            </div>
            {tracking.map((row) => (
              <div className="q-table-row" role="row" key={row.event}>
                <span role="cell"><code>{row.event}</code></span>
                <span role="cell">{row.trigger}</span>
                <span role="cell">{row.params}</span>
                <span role="cell">{row.purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="all-screens" className="q-sec q-light q-all">
        <Head title="All Screens" light />
        <PhoneGallery slots={allScreens} className="is-mini" pending="Plani, Rruga and more" />
      </section>

      <section id="next" className="q-sec q-dark q-next">
        <Head title="What’s Next" />
        <div className="q-next-grid">
          {nextSteps.map((step, i) => (
            <article key={step.title} style={{ ['--d' as string]: `${i * 80}ms` }}>
              <span>Phase {step.phase}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <Thanks screens={[screens.welcome, screens.home, screens.event, screens.payers, screens.ticket]} />

      <SectionNav />
      <BackToTop />
    </main>
  )
}
