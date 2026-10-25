'use client'

import { useEffect, useState, type MouseEvent } from 'react'

export const chapters = [
  { name: 'Intro', ids: ['top', 'concept', 'numbers', 'landing'] },
  { name: 'Research', ids: ['process', 'research', 'personas', 'journey', 'logic'] },
  { name: 'Experience', ids: ['structure', 'anatomy', 'sketches'] },
  { name: 'Interface', ids: ['sign-in', 'discover', 'event-cards', 'checkout', 'features'] },
  { name: 'Brand', ids: ['system', 'logo', 'type', 'color', 'grid'] },
  { name: 'Launch', ids: ['store', 'stories', 'campaign', 'wild', 'strategy'] },
  { name: 'Wrap up', ids: ['all-screens', 'next'] },
]

export function SectionNav() {
  const [active, setActive] = useState(chapters[0].name)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [onDark, setOnDark] = useState(true)

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35
      let current = chapters[0].name
      for (const chapter of chapters) {
        const el = document.getElementById(chapter.ids[0])
        if (el && el.getBoundingClientRect().top <= line) current = chapter.name
      }
      setActive(current)
      setVisible(window.scrollY > window.innerHeight * 0.6)
      const y = window.innerHeight - 40
      setOnDark(![...document.querySelectorAll('.q-light')].some((el) => {
        const rect = el.getBoundingClientRect()
        return 40 >= rect.left && 40 <= rect.right && y >= rect.top && y <= rect.bottom
      }))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    setOpen(false)
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }

  const links = () => chapters.map(({ name, ids }) => (
    <a
      key={name}
      href={`#${ids[0]}`}
      className={name === active ? 'is-active' : undefined}
      aria-current={name === active ? 'location' : undefined}
      onClick={(event) => go(event, ids[0])}
    >
      <span>{name}</span>
    </a>
  ))

  return (
    <>
      <nav className={`q-rail${visible ? ' is-visible' : ''}`} aria-label="Chapters">{links()}</nav>

      <button
        type="button"
        className={`q-index-btn${visible ? ' is-visible' : ''}${onDark ? ' is-on-dark' : ''}`}
        aria-expanded={open}
        aria-controls="q-index"
        onClick={() => setOpen((value) => !value)}
      >
        Index <span>{active}</span>
      </button>

      <div className={`q-index-backdrop${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="q-index" className={`q-index${open ? ' is-open' : ''}`} aria-label="All chapters" aria-hidden={!open} inert={!open}>{links()}</nav>
    </>
  )
}
