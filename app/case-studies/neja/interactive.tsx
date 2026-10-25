'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import {
  ArrowLeft, ArrowRight, Bell, Bookmark, Calendar, Camera, Car, Check, ChevronLeft, ChevronRight, Clock, Compass, CreditCard,
  Eye, EyeOff, Heart, House, MapPin, MessageCircle, Mic, Music, Navigation, Plus, QrCode, Route, Search, Settings, Share2,
  Sparkles, Star, Ticket, User, Users, X,
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

const systemIcons = [House, Compass, Search, Heart, Bookmark, Ticket, Calendar, Clock, MapPin, Navigation, Route, Car, Users, User, MessageCircle, Mic, Camera, Music, Star, Bell, Share2, Plus, Check, X, ChevronLeft, ChevronRight, CreditCard, QrCode, Settings, Sparkles]
const categories = ['All', 'Concerts', 'Festivals', 'Theatre', 'Sports', 'Exhibitions', 'Workshops', 'Conferences', 'Nightlife']
const days = [{ d: 'Thu', n: 20 }, { d: 'Fri', n: 21 }, { d: 'Sat', n: 22 }, { d: 'Sun', n: 23 }]
const tabs = [{ name: 'Discover', icon: Compass }, { name: 'Plani', icon: Users }, { name: 'Rruga', icon: Route }, { name: 'Going', icon: Bookmark }, { name: 'Profile', icon: User }]

function Segmented({ options, label }: { options: string[]; label: string }) {
  const [active, setActive] = useState(0)
  return (
    <div className="q-seg" role="radiogroup" aria-label={label} style={{ ['--n' as string]: options.length, ['--i' as string]: active }}>
      <span className="q-seg-thumb" aria-hidden="true" />
      {options.map((option, i) => (
        <button type="button" role="radio" aria-checked={i === active} key={option} className={i === active ? 'is-on' : ''} onClick={() => setActive(i)}>{option}</button>
      ))}
    </div>
  )
}

export function SystemBoard() {
  const [chips, setChips] = useState<string[]>(['All'])
  const [day, setDay] = useState(2)
  const [tab, setTab] = useState(0)
  const [saved, setSaved] = useState(true)
  const [notify, setNotify] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const toggleChip = (chip: string) => {
    if (chip === 'All') return setChips(['All'])
    setChips((current) => {
      const rest = current.filter((item) => item !== 'All' && item !== chip)
      const next = current.includes(chip) ? rest : [...rest, chip]
      return next.length ? next : ['All']
    })
  }

  return (
    <div className="q-system">
      <div className="q-panel is-icons">
        <h3>Icons</h3>
        <div className="q-icons">
          {systemIcons.map((Icon, i) => <span key={i}><Icon size={18} strokeWidth={1.6} /></span>)}
        </div>
      </div>

      <div className="q-panel is-elements">
        <h3>Elements</h3>
        <div className="q-days" role="radiogroup" aria-label="Day">
          {days.map((item, i) => (
            <button type="button" role="radio" aria-checked={i === day} key={item.n} className={i === day ? 'is-on' : ''} onClick={() => setDay(i)}>
              <span>{item.d}</span><strong>{item.n}</strong>
            </button>
          ))}
          <span className="q-badge is-hot">Trending</span>
          <span className="q-badge">Tonight</span>
          <span className="q-badge">4.5 km away</span>
          <span className="q-going" aria-label="5 friends going">
            <i /><i /><i>+3</i><em>5 going</em>
          </span>
        </div>
        <div className="q-chips" role="group" aria-label="Categories">
          {categories.map((chip) => (
            <button type="button" key={chip} className={chips.includes(chip) ? 'is-on' : ''} aria-pressed={chips.includes(chip)} onClick={() => toggleChip(chip)}>
              {chip}{chips.includes(chip) && chip !== 'All' && <X size={11} />}
            </button>
          ))}
        </div>
      </div>

      <div className="q-panel is-iconbuttons">
        <h3>Icon Buttons</h3>
        <div className="q-iconbuttons">
          <span className="q-ib is-xl"><Plus size={26} strokeWidth={1.8} /></span>
          <span className="q-ib"><ChevronLeft size={18} /></span>
          <button type="button" className={`q-ib${saved ? ' is-on' : ''}`} onClick={() => setSaved(!saved)} aria-pressed={saved} aria-label="Save event"><Heart size={16} fill={saved ? 'currentColor' : 'none'} /></button>
          <span className="q-ib is-ghost"><Share2 size={16} /></span>
          <span className="q-ib is-ghost"><Search size={16} /></span>
        </div>
        <div className="q-toggles">
          <button type="button" className={`q-switch${notify ? ' is-on' : ''}`} onClick={() => setNotify(!notify)} role="switch" aria-checked={notify} aria-label="Notifications"><span /></button>
          <span>{notify ? 'Plan reminders on' : 'Plan reminders off'}</span>
        </div>
      </div>

      <div className="q-panel is-segmented">
        <h3>Segmented Controls</h3>
        <Segmented options={['In', 'Maybe', 'Out']} label="Plani answer" />
        <Segmented options={['Pay together', 'Pay alone']} label="Payment" />
      </div>

      <div className="q-panel is-tabs">
        <h3>Tab Bar</h3>
        <div className="q-tabbar" role="tablist" aria-label="Main navigation">
          {tabs.map((item, i) => {
            const Icon = item.icon
            return (
              <button type="button" role="tab" aria-selected={i === tab} key={item.name} className={i === tab ? 'is-on' : ''} onClick={() => setTab(i)}>
                <Icon size={18} strokeWidth={1.7} /><span>{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="q-panel is-buttons">
        <h3>Buttons</h3>
        <div className="q-buttons">
          <span className="q-btn is-accent">Get tickets</span>
          <span className="q-btn is-light">Add to Plani</span>
          <span className="q-btn is-dark">Continue with email</span>
          <span className="q-btn is-accent is-hover">Get tickets</span>
          <span className="q-btn is-light is-hover">Add to Plani</span>
          <span className="q-btn is-dark is-hover">Continue with email</span>
          <span className="q-btn is-disabled">Get tickets</span>
          <span className="q-btn is-disabled">Add to Plani</span>
          <span className="q-btn is-disabled">Continue with email</span>
        </div>
        <div className="q-links">
          <span>Skip</span>
          <span>Forgot password?</span>
          <span>New account? <strong>Sign up</strong></span>
        </div>
      </div>

      <div className="q-panel is-fields">
        <h3>Text Fields</h3>
        <label className="q-field">
          <span>Email</span>
          <input type="email" defaultValue="elira@neja.app" aria-label="Email" />
        </label>
        <label className="q-field">
          <span>Password</span>
          <input type={showPassword ? 'text' : 'password'} defaultValue="hajde2026" aria-label="Password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </label>
        <label className="q-field is-error">
          <span>Email</span>
          <input type="email" defaultValue="arta@gmail.com" aria-label="Email with error" aria-invalid="true" />
          <em>This email is already linked to a NEJA account.</em>
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
              <span className="q-story-avatar"><img src="/neja/symbol.webp" alt="" /></span>
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
