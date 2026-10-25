'use client'

import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [onDark, setOnDark] = useState(true)

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > 4)
      const x = window.innerWidth - 40
      const y = window.innerHeight - 40
      const overLight = [...document.querySelectorAll('.q-light')].some((el) => {
        const rect = el.getBoundingClientRect()
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      })
      setOnDark(!overLight)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <a href="#top" className={`back-to-top${visible ? ' is-visible' : ''}${onDark ? ' is-on-dark' : ''}`} aria-label="Back to top">Back to top ↑</a>
  )
}
