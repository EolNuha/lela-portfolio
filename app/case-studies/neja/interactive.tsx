'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bookmark, Building2, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight,
  CircleAlert, Ellipsis, Forward, GalleryHorizontalEnd, Heart, ImagePlus, LocateFixed, Lock, Mail, MapPin, Minus, Navigation,
  Phone as PhoneIcon, Play, Plus, Search, ShieldCheck, ShoppingBag, Ticket, UserPlus, UserRound, Users, Wallet, X,
} from 'lucide-react'
import { Phone, PhoneKeys, StatusBar, hasStatusBar, screenTone } from './phone'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function CaseStudyMotion() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')]
    let frame = 0

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      if (prefersReducedMotion()) return
      const mid = window.innerHeight / 2
      parallax.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return
        const speed = Number(el.dataset.parallax) || 0.1
        el.style.setProperty('--py', `${((rect.top + rect.height / 2 - mid) * -speed).toFixed(1)}px`)
      })
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="q-readbar" ref={barRef} aria-hidden="true" />
}

export function DragScroll({ children, className = '', label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (event.pointerType !== 'mouse' || !el || el.scrollWidth <= el.clientWidth) return
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: false }
    el.setPointerCapture(event.pointerId)
    setDragging(true)
  }
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !ref.current) return
    const dx = event.clientX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    ref.current.scrollLeft = drag.current.startScroll - dx
  }
  const endDrag = () => {
    drag.current.active = false
    setDragging(false)
  }

  return (
    <div
      ref={ref}
      className={`q-drag ${className}${dragging ? ' is-dragging' : ''}`}
      role="region"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(event) => { if (drag.current.moved) event.preventDefault() }}
    >
      {children}
    </div>
  )
}

export type GalleryItem = { src: string; label: string; title?: string; copy?: string }
type GallerySlot = GalleryItem | { note: ReactNode } | null

export function PhoneGallery({ slots, className = '', pending }: { slots: GallerySlot[]; className?: string; pending?: string }) {
  const items = slots.filter((slot): slot is GalleryItem => !!slot && 'src' in slot)
  const [open, setOpen] = useState<number | null>(null)
  let count = 0

  return (
    <>
      <div className={`q-gallery ${className}`}>
        {slots.map((slot, i) => {
          if (!slot) return <span key={`empty-${i}`} className="q-gallery-empty" aria-hidden="true" />
          if (!('src' in slot)) return <div key={`note-${i}`} className="q-gallery-note">{slot.note}</div>
          const index = items.indexOf(slot)
          count += 1
          return (
            <button
              type="button"
              key={slot.src}
              className="q-gallery-item"
              onClick={() => setOpen(index)}
              style={{ ['--d' as string]: `${(count - 1) * 70}ms` }}
              aria-label={`Open ${slot.label} screen`}
            >
              <Phone src={slot.src} alt={`NEJA ${slot.label} screen`} />
              <span className="q-gallery-caption"><span>{index + 1}</span>{slot.label}</span>
            </button>
          )
        })}
        {pending && (
          <div className="q-gallery-pending">
            <span className="q-pending-phone"><strong>More to come</strong><span>In progress</span></span>
            <span className="q-gallery-caption"><span>{items.length + 1}</span>{pending}</span>
          </div>
        )}
      </div>
      {open !== null && <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}

function Lightbox({ items, index, onChange, onClose }: { items: GalleryItem[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const go = useCallback((step: number) => onChange((index + step + items.length) % items.length), [index, items.length, onChange])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.documentElement.classList.add('q-locked')
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('q-locked')
      previous?.focus()
    }
  }, [go, onClose])

  return (
    <div className="q-lightbox" role="dialog" aria-modal="true" aria-label={`${item.label} screen`} onClick={onClose}>
      <div className="q-lightbox-inner" onClick={(event) => event.stopPropagation()}>
        <Phone key={item.src} src={item.src} alt={`NEJA ${item.label} screen`} lazy={false} className="q-lightbox-phone" />
        <div className="q-lightbox-copy">
          <span>{index + 1} / {items.length}</span>
          <h3>{item.title ?? item.label}</h3>
          {item.copy && <p>{item.copy}</p>}
          <div className="q-lightbox-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous screen"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next screen"><ArrowRight size={16} /></button>
          </div>
        </div>
        <button type="button" ref={closeRef} className="q-lightbox-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
      </div>
    </div>
  )
}

type Vote = 'in' | 'out' | 'maybe'
const baseVotes: Record<Vote, number> = { in: 5, out: 2, maybe: 1 }
const offReasons: Record<string, string> = {
  'Too expensive': 'Showing similar events within your budget.',
  'Too far': 'Showing events closer to you, with rides from your area.',
  'Not my thing': 'Showing events that match your interests.',
  'Bad timing': 'Showing the same kind of event on other days.',
  'Want something calmer': 'Showing exhibitions, theatre, and acoustic shows nearby.',
}
const UNLOCK_AT = 6

export function PlaniVote() {
  const [vote, setVote] = useState<Vote | null>(null)
  const [reason, setReason] = useState<string | null>(null)
  const counts = { ...baseVotes, ...(vote ? { [vote]: baseVotes[vote] + 1 } : {}) }
  const unlocked = counts.in >= UNLOCK_AT
  const total = counts.in + counts.out + counts.maybe

  const choose = (next: Vote) => {
    setVote(vote === next ? null : next)
    setReason(null)
  }

  return (
    <div className="q-vote">
      <div className="q-vote-head">
        <div>
          <span>Plani · Saturday</span>
          <strong>SUNNY HILL</strong>
        </div>
        <span className={`q-vote-badge${unlocked ? ' is-on' : ''}`}>
          {unlocked ? <><Check size={12} /> Event chat unlocked</> : `${UNLOCK_AT - counts.in} more to unlock chat`}
        </span>
      </div>
      <div className="q-vote-bar" aria-hidden="true">
        <span style={{ width: `${(counts.in / total) * 100}%` }} />
        <span style={{ width: `${(counts.maybe / total) * 100}%` }} />
        <span style={{ width: `${(counts.out / total) * 100}%` }} />
      </div>
      <div className="q-vote-options" role="group" aria-label="Your answer">
        {(['in', 'maybe', 'out'] as Vote[]).map((option) => (
          <button type="button" key={option} className={vote === option ? 'is-picked' : ''} onClick={() => choose(option)} aria-pressed={vote === option}>
            <strong>{counts[option]}</strong>
            <span>{option}</span>
          </button>
        ))}
      </div>
      <p className="q-vote-hint">{vote ? 'Tap again to change your answer.' : 'Try it: answer the plan.'}</p>
      {vote === 'out' && (
        <div className="q-vote-off">
          <span>What’s off?</span>
          <div>
            {Object.keys(offReasons).map((item) => (
              <button type="button" key={item} className={reason === item ? 'is-picked' : ''} onClick={() => setReason(item)}>{item}</button>
            ))}
          </div>
          {reason && <p>{offReasons[reason]}</p>}
        </div>
      )}
    </div>
  )
}

const systemIcons = [
  ChevronLeft, ChevronRight, ChevronDown, X, Check, Plus, Minus, ArrowUpRight, Search, MapPin, LocateFixed, CalendarDays, Ticket, Bookmark, Heart,
  Bell, Users, UserPlus, UserRound, Mail, PhoneIcon, Lock, ShieldCheck, ImagePlus, GalleryHorizontalEnd, Building2, CircleAlert, Ellipsis, Play, Forward,
]

type MarkProps = { filled: boolean }

function HomeMark({ filled }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {filled && <path d="M5.5 20V9.2L12 3.9l6.5 5.3V17a3 3 0 0 1-3 3zM10 20v-4.5a2 2 0 0 1 2-2h2V20z" fill="currentColor" fillRule="evenodd" stroke="none" />}
      <path d="M3.5 10.5L12 3.5l8.5 7" />
      <path d="M5.5 9.2V20h10a3 3 0 0 0 3-3V9.2" />
      <path d="M10 20v-4.5a2 2 0 0 1 2-2h2V20" />
    </svg>
  )
}

const PIN = 'M12 21.4c0 0 7.2-6.9 7.2-12.1C19.2 5.4 16 2.3 12 2.3S4.8 5.4 4.8 9.3c0 5.2 7.2 12.1 7.2 12.1z'
function PinMark({ filled }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {filled && <path d={`${PIN}M14.5 9.3a2.5 2.5 0 1 0-5 0a2.5 2.5 0 1 0 5 0z`} fill="currentColor" fillRule="evenodd" stroke="none" />}
      <path d={PIN} />
      {!filled && <circle cx={12} cy={9.3} r={2.5} />}
    </svg>
  )
}

function SearchMark({ filled }: MarkProps) {
  return <Search fill={filled ? 'currentColor' : 'none'} strokeWidth={1.7} />
}

const BUBBLE = 'M4 20V8a4 4 0 0 1 4-4h12v9a4 4 0 0 1-4 4H8l-4 3z'
function PlaniMark({ filled }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {filled && <path d={`${BUBBLE}M11.1 10.5a1.1 1.1 0 1 0-2.2 0a1.1 1.1 0 1 0 2.2 0zM15.1 10.5a1.1 1.1 0 1 0-2.2 0a1.1 1.1 0 1 0 2.2 0z`} fill="currentColor" fillRule="evenodd" stroke="none" />}
      <path d={BUBBLE} />
      {!filled && <><circle cx={10} cy={10.5} r={1.1} fill="currentColor" stroke="none" /><circle cx={14} cy={10.5} r={1.1} fill="currentColor" stroke="none" /></>}
    </svg>
  )
}

function ProfileMark({ filled }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={7.5} r={4} fill={filled ? 'currentColor' : 'none'} />
      <path d={`M5 20.5v-1a4.5 4.5 0 0 1 4.5-4.5h5a4.5 4.5 0 0 1 4.5 4.5v1${filled ? 'z' : ''}`} fill={filled ? 'currentColor' : 'none'} />
    </svg>
  )
}

function FunnelMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 12L4.3 5.5Q3 4 5 4H21L14 12V18A2 2 0 0 1 12 20H10Z" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  )
}

const tabs = [
  { name: 'Discover', Mark: HomeMark },
  { name: 'Map', Mark: PinMark },
  { name: 'Search', Mark: SearchMark },
  { name: 'Plani', Mark: PlaniMark },
  { name: 'Profile', Mark: ProfileMark },
]

export function SystemBoard() {
  const [tab, setTab] = useState(0)
  const [mode, setMode] = useState(0)
  const [saved, setSaved] = useState(false)
  const [reminders, setReminders] = useState(true)
  const [remember, setRemember] = useState(true)
  const [count, setCount] = useState(1)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="q-system is-app">
      <div className="q-panel is-icons">
        <h3>Icons</h3>
        <div className="q-icons">
          {systemIcons.map((Icon, i) => <span key={i}><Icon size={18} strokeWidth={1.7} /></span>)}
        </div>
        <p className="q-ds-note">Lucide line icons at a 1.7 stroke. The tab bar, filter, and share icons are drawn for NEJA, with the same corner as everything else.</p>
      </div>

      <div className="q-panel is-elements">
        <h3>Labels</h3>
        <div className="q-ds-row">
          <span className="q-ds-section">Coming Soon <ArrowUpRight size={20} strokeWidth={2.2} /></span>
          <span className="q-ds-date"><span>13 – 15</span><strong>NOV</strong><em>Trending</em></span>
          <span className="q-ds-tags">{['Trending', 'Today', 'Free entry'].map((tag) => <i key={tag}>{tag}</i>)}</span>
        </div>
        <div className="q-ds-row">
          <span className="q-ds-meta">FREE · Ticket Info <ArrowUpRight size={14} /></span>
          <span className="q-ds-host">Hosted by <b>@artpolis</b></span>
          <span className="q-ds-rowtime"><span>Today</span><b>20:00</b><em>Not listed</em></span>
        </div>
        <div className="q-ds-notice"><CircleAlert size={16} />That username and password don’t match.</div>
      </div>

      <div className="q-panel is-iconbuttons">
        <h3>Icon Buttons</h3>
        <div className="q-ds-row">
          <span className="q-ds-fab" aria-hidden="true"><Plus size={22} strokeWidth={2} /></span>
          <span className="q-ds-round" aria-hidden="true"><Forward size={15} strokeWidth={2} /></span>
          <span className="q-ds-round is-outline" aria-hidden="true"><Ticket size={16} strokeWidth={1.8} /></span>
          <span className="q-ds-tile" aria-hidden="true"><FunnelMark /></span>
          <span className="q-ds-tile is-outline" aria-hidden="true"><ShoppingBag size={18} strokeWidth={1.7} /></span>
        </div>
      </div>

      <div className="q-panel is-segmented">
        <h3>Controls</h3>
        <div className="q-ds-control">
          <span>Event reminders</span>
          <button type="button" role="switch" aria-checked={reminders} aria-label="Event reminders" className={`q-ds-toggle${reminders ? ' is-on' : ''}`} onClick={() => setReminders(!reminders)}>
            <i>{reminders && <Check size={13} strokeWidth={3} />}</i>
          </button>
        </div>
        <div className="q-ds-control">
          <span>Tickets</span>
          <span className="q-ds-stepper">
            <button type="button" aria-label="One fewer" onClick={() => setCount(Math.max(1, count - 1))}><Minus size={16} /></button>
            <b aria-live="polite">{count}</b>
            <button type="button" aria-label="One more" onClick={() => setCount(Math.min(10, count + 1))}><Plus size={16} /></button>
          </span>
        </div>
        <button type="button" role="checkbox" aria-checked={remember} className="q-ds-check" onClick={() => setRemember(!remember)}>
          <i className={remember ? 'is-on' : ''}>{remember && <Check size={13} strokeWidth={3} />}</i>Remember me
        </button>
      </div>

      <div className="q-panel is-tabs">
        <h3>Navigation</h3>
        <div className="q-ds-tabbar" role="tablist" aria-label="Main navigation" style={{ ['--i' as string]: tab }}>
          <span className="q-ds-tabbar-marker" aria-hidden="true" />
          {tabs.map(({ name, Mark }, i) => (
            <button type="button" role="tab" aria-selected={i === tab} aria-label={name} key={name} className={i === tab ? 'is-on' : ''} onClick={() => setTab(i)}>
              <Mark filled={i === tab} />
            </button>
          ))}
        </div>
        <div className="q-ds-underline" role="tablist" aria-label="Account">
          {['Log in', 'New Account'].map((label, i) => (
            <button type="button" role="tab" aria-selected={i === mode} key={label} className={i === mode ? 'is-on' : ''} onClick={() => setMode(i)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="q-panel is-buttons">
        <h3>Buttons</h3>
        <div className="q-ds-buttons">
          <span className="q-ds-ticket">
            <span>Get tickets <ArrowUpRight size={20} strokeWidth={2} /></span>
            <i className="q-ds-perf" aria-hidden="true" />
            <b>€3</b>
          </span>
          <span className="q-ds-ticket is-plain"><span>Event page <ArrowUpRight size={20} strokeWidth={2} /></span></span>
          <span className="q-ds-cta">Log in / Sign up</span>
          <span className="q-ds-outline"><Mail size={18} strokeWidth={1.7} />Continue with email</span>
          <span className="q-ds-small-row">
            <span className="q-ds-pill"><Plus size={15} strokeWidth={1.8} />Add to Plani</span>
            <button type="button" className={`q-ds-pill${saved ? ' is-on' : ''}`} aria-pressed={saved} onClick={() => setSaved(!saved)}>
              <Bookmark size={15} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}
            </button>
            <span className="q-ds-prompt"><Wallet size={15} strokeWidth={1.8} />Add to wallet</span>
          </span>
        </div>
        <div className="q-ds-links">
          <span>Forgot your password?</span>
          <span>Remove from wallet</span>
        </div>
      </div>

      <div className="q-panel is-fields">
        <h3>Fields</h3>
        <div className="q-ds-searchrow">
          <span className="q-ds-search"><Search size={18} strokeWidth={1.8} />Search</span>
          <span className="q-ds-tile" aria-hidden="true"><FunnelMark /></span>
        </div>
        <label className="q-ds-field">
          <input type="text" defaultValue="elira" aria-label="Username or email" />
        </label>
        <label className="q-ds-field">
          <input type={showPassword ? 'text' : 'password'} defaultValue="hajde2026" aria-label="Password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'}</button>
        </label>
      </div>
    </div>
  )
}

type ColorItem = { name: string; hex: string; role: string; usage: string; texture: string }

export function ColorColumns({ colors }: { colors: ColorItem[] }) {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
    } catch {}
    setCopied(hex)
    window.setTimeout(() => setCopied((current) => (current === hex ? null : current)), 1400)
  }

  return (
    <div className="q-colors">
      {colors.map((color, i) => (
        <button
          type="button"
          key={color.hex}
          className="q-color"
          onClick={() => copy(color.hex)}
          style={{ ['--c' as string]: color.hex, ['--d' as string]: `${i * 70}ms` }}
          aria-label={`Copy ${color.name} ${color.hex}`}
        >
          <span className="q-color-tex"><img src={color.texture} alt="" loading="lazy" draggable={false} /></span>
          <span className="q-color-chip"><em>{copied === color.hex ? 'Copied' : 'Copy'}</em></span>
          <span className="q-color-row"><strong>{color.name}</strong><span>{color.hex}</span></span>
          <span className="q-color-row is-soft"><span>{color.role}</span><span>{color.usage}</span></span>
        </button>
      ))}
    </div>
  )
}

const STORY_MS = 5200

export function StoryReel({ stories }: { stories: ReactNode[] }) {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = stories.length

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const running = inView && !paused
  const go = (step: number) => setActive((current) => (current + step + count) % count)

  return (
    <div className="q-stories" ref={ref}>
      {stories.map((story, i) => {
        let offset = i - active
        if (offset > count / 2) offset -= count
        if (offset < -count / 2) offset += count
        const isActive = offset === 0
        return (
          <div
            key={i}
            role="button"
            tabIndex={0}
            aria-label={isActive ? `Story ${i + 1} of ${count}. Left half goes back, right half goes forward` : `Open story ${i + 1}`}
            aria-current={isActive}
            className={`q-story is-${i + 1}${isActive ? ' is-active' : ''}`}
            onClick={(event) => {
              if (!isActive) return setActive(i)
              const rect = event.currentTarget.getBoundingClientRect()
              go(event.clientX - rect.left < rect.width * 0.35 ? -1 : 1)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') go(1)
              if (event.key === 'ArrowLeft') go(-1)
              if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (isActive) go(1); else setActive(i) }
            }}
            onMouseEnter={() => isActive && setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ ['--o' as string]: offset, ['--s' as string]: isActive ? 1 : 0.8, zIndex: 3 - Math.abs(offset) }}
          >
            <div className="q-story-bars" aria-hidden="true">
              {stories.map((_, j) => (
                <span key={j} className={j < active ? 'is-full' : ''}>
                  {j === active && isActive && (
                    <i
                      key={active}
                      className={`is-running${running ? '' : ' is-paused'}`}
                      style={{ animationDuration: `${STORY_MS}ms` }}
                      onAnimationEnd={() => go(1)}
                    />
                  )}
                </span>
              ))}
            </div>
            <div className="q-story-head">
              <span className="q-story-avatar"><img src="/neja/app/app-icon.jpg" alt="" /></span>
              <strong>neja</strong>
              <Check size={10} strokeWidth={3} className="q-story-verified" />
              <span className="q-story-time">{i + 2}h</span>
            </div>
            {story}
          </div>
        )
      })}
    </div>
  )
}

export function ScreenCycle({ screens, interval = 2600 }: { screens: { src: string; label: string }[]; interval?: number }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % screens.length), interval)
    return () => window.clearInterval(timer)
  }, [interval, screens.length])

  return (
    <span className="q-phone q-cycle">
      <PhoneKeys />
      <span className="q-cycle-screen">
        {screens.map((screen, i) => (
          <img key={screen.src} src={screen.src} alt={i === active ? `NEJA ${screen.label} screen` : ''} className={i === active ? 'is-active' : ''} loading="lazy" draggable={false} />
        ))}
      </span>
      {hasStatusBar(screens[active].src) && <StatusBar tone={screenTone(screens[active].src)} />}
      <span className={`q-phone-home is-${screenTone(screens[active].src)}`} aria-hidden="true" />
    </span>
  )
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400)
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <strong ref={ref}>{display}{suffix}</strong>
}
