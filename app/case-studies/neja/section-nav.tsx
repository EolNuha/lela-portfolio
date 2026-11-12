'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'

export const chapters = [
  { name: 'Intro', ids: ['top', 'concept', 'numbers', 'landing'] },
  { name: 'Progress', ids: ['process', 'built'] },
  { name: 'Research', ids: ['research', 'personas', 'journey', 'logic'] },
  { name: 'Experience', ids: ['structure', 'anatomy', 'sketches'] },
  { name: 'Interface', ids: ['sign-in', 'discover', 'event-cards', 'checkout', 'features'] },
  { name: 'Brand', ids: ['system', 'logo', 'type', 'color', 'grid'] },
  { name: 'Launch', ids: ['store', 'stories', 'social', 'campaign', 'wild', 'strategy'] },
  { name: 'Wrap up', ids: ['all-screens', 'next'] },
]

function surfaceIsLight(x: number, y: number) {
  const hit = document.elementsFromPoint(x, y).find((el) => el instanceof HTMLElement && !el.closest('.q-chapter-pill, .q-rail, .back-to-top'))
  let node = hit instanceof HTMLElement ? hit.closest('section') ?? hit : null
  while (node) {
    const match = getComputedStyle(node).backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (match) {
      const alpha = match[4] === undefined ? 1 : Number(match[4])
      if (alpha >= 0.45) {
        const lum = (0.2126 * Number(match[1]) + 0.7152 * Number(match[2]) + 0.0722 * Number(match[3])) / 255
        return lum > 0.62
      }
    }
    node = node.parentElement
  }
  return false
}

export function SectionNav() {
  const [active, setActive] = useState(chapters[0].name)
  const [visible, setVisible] = useState(false)
  const [onLight, setOnLight] = useState(false)
  const pillRef = useRef<HTMLElement>(null)

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
      const pill = pillRef.current
      let x = window.innerWidth / 2
      let y = 40
      if (pill && getComputedStyle(pill).display !== 'none') {
        const rect = pill.getBoundingClientRect()
        x = rect.left + rect.width / 2
        y = rect.top + Math.min(rect.height / 2, 22)
      }
      setOnLight(surfaceIsLight(x, y))
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
    const pill = pillRef.current
    if (!pill || !visible || getComputedStyle(pill).display === 'none') return
    const link = pill.querySelector('.is-active')
    if (!(link instanceof HTMLElement)) return
    pill.scrollTo({ left: Math.max(0, link.offsetLeft - (pill.clientWidth - link.offsetWidth) / 2), behavior: 'smooth' })
  }, [active, visible])

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }

  const link = ({ name, ids }: (typeof chapters)[number]) => (
    <a
      key={name}
      href={`#${ids[0]}`}
      className={name === active ? 'is-active' : undefined}
      aria-current={name === active ? 'location' : undefined}
      onClick={(event) => go(event, ids[0])}
    >
      <span>{name}</span>
    </a>
  )

  const current = chapters.find((chapter) => chapter.name === active) ?? chapters[0]

  return (
    <>
      <nav className={`q-rail${visible ? ' is-visible' : ''}`} aria-label="Chapters">{chapters.map(link)}</nav>
      <nav
        ref={pillRef}
        className={`q-chapter-pill${visible ? ' is-visible' : ''}${onLight ? ' is-on-light' : ' is-on-dark'}`}
        aria-label="Sections"
        aria-live="polite"
      >
        {link(current)}
      </nav>
    </>
  )
}
