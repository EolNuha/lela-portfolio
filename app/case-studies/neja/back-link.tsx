'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

export const origin = { fromPortfolio: false }

export function BackLink({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <Link
      href="/#projects"
      className="q-back"
      aria-label="Back to portfolio"
      onClick={(event) => {
        if (!origin.fromPortfolio) return
        event.preventDefault()
        origin.fromPortfolio = false
        router.back()
      }}
    >
      {children}
    </Link>
  )
}
