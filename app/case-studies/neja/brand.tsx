import type { CSSProperties } from 'react'
import { CountUp } from './interactive'
import { Phone } from './phone'

const img = (name: string) => `/neja/${name}.webp`

type Screen = { src: string; label: string }

const SYMBOL_POINTS: [number, number][] = [
  [0, 0], [42, 0], [171, 146], [244, 83], [244, 0], [284, 0], [284, 168], [244, 192], [244, 139], [143, 224], [244, 336], [244, 207], [284, 230],
  [284, 398], [242, 398], [113, 252], [40, 315], [40, 398], [0, 398], [0, 230], [40, 206], [40, 259], [141, 174], [40, 62], [40, 191], [0, 168],
]
const SYMBOL_PATH = `M${SYMBOL_POINTS.map(([x, y]) => `${x} ${y}`).join('L')}Z`

function Mark({ className = '' }: { className?: string }) {
  return (
    <svg className={`q-symbol ${className}`} viewBox="0 0 284 398" aria-hidden="true">
      <path d={SYMBOL_PATH} />
    </svg>
  )
}

function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`q-wordmark ${className}`} role="img" aria-label="NEJA" />
}

function SectionHead({ title, light = false, mark = false }: { title: string; light?: boolean; mark?: boolean }) {
  return (
    <div className={`q-head${light ? ' is-light' : ''}`}>
      <h2 className={mark ? 'q-head-mark' : undefined}>{mark && <Mark />}{title}</h2>
    </div>
  )
}

const numbers = [
  { value: 13, suffix: '+', label: 'Unique mobile screens' },
  { value: 8, label: 'Journey stages mapped' },
  { value: 5, label: 'Product pillars' },
  { value: 1, label: 'App for all events', photo: true },
]

export function Numbers() {
  return (
    <section id="numbers" className="q-nums q-light" aria-label="NEJA by the numbers">
      <div className="q-nums-text">
        <span className="q-nums-kicker">
          <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3.5l4.6 10.3 11 1.1-8.3 7.4 2.4 10.9L20 27.6l-9.7 5.6 2.4-10.9-8.3-7.4 11-1.1z" /></svg>
          Built for every<br />kind of event
        </span>
        <h2 className="q-nums-title">Attendee<br /><em>App</em></h2>
        <p>Event discovery is built around speed and relevance. People see nearby and trending events instantly, with filters <b>focused on time, location, and category</b> to cut decision friction.</p>
        <svg className="q-nums-arrow" viewBox="0 0 150 64" aria-hidden="true">
          <path d="M5 30c14 22 44 31 72 24 21-5 40-18 61-38" />
          <path d="M117 13.5c8.5-.6 15-1.3 21.5-2.5-1.6 7-3.1 12.6-5.4 19.4" />
        </svg>
      </div>
      <div className="q-nums-list">
        {numbers.map((item) => (
          <div key={item.label} className={item.photo ? 'is-photo' : undefined}>
            <CountUp value={item.value} suffix={item.suffix} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const LOCKUP = { x: 260, y: 121, symbolW: 284, symbolH: 398, gap: 80, wordW: 716, wordH: 199 }

export function LogoConstruction() {
  const { x, y, symbolW, symbolH, gap, wordW, wordH } = LOCKUP
  const wordX = x + symbolW + gap
  const wordY = y + (symbolH - wordH) / 2
  const right = wordX + wordW
  const bottom = y + symbolH
  const clear = 80
  const hLines = [y, bottom]
  const hDashed = [wordY, wordY + wordH, y + symbolH / 2]
  const vLines = [x, x + symbolW, wordX, right]
  return (
    <section id="logo" className="q-sec q-light q-logo-sec">
      <SectionHead title="Logo Construction" light />
      <figure className="q-logo-lockup">
        <svg viewBox="0 0 1600 640" role="img" aria-label="NEJA logo lockup on a construction grid">
          <defs>
            <mask id="q-wordmark-mask" maskUnits="userSpaceOnUse">
              <image href={img('wordmark')} x={wordX} y={wordY} width={wordW} height={wordH} preserveAspectRatio="none" />
            </mask>
          </defs>
          <g className="q-lk-grid">
            {hLines.map((v) => <line key={`h${v}`} x1="0" x2="1600" y1={v} y2={v} />)}
            {vLines.map((v) => <line key={`v${v}`} x1={v} x2={v} y1="0" y2="640" />)}
          </g>
          <g className="q-lk-dash">
            {hDashed.map((v) => <line key={`d${v}`} x1="0" x2="1600" y1={v} y2={v} />)}
          </g>
          <rect className="q-lk-clear" x={x - clear} y={y - clear} width={right - x + clear * 2} height={symbolH + clear * 2} />
          <rect className="q-lk-box" x={x} y={y} width={symbolW} height={symbolH} />
          <rect className="q-lk-box" x={wordX} y={wordY} width={wordW} height={wordH} />
          <path className="q-lk-ink" d={SYMBOL_PATH} transform={`translate(${x} ${y})`} />
          <rect className="q-lk-ink" x={wordX} y={wordY} width={wordW} height={wordH} mask="url(#q-wordmark-mask)" />
          <rect className="q-lk-unit" x={x} y={y} width="40" height="40" />
          <g className="q-lk-label">
            <text x={x + symbolW / 2} y={y - 22}>{symbolW}</text>
            <text x={x + symbolW + gap / 2} y={y - 22}>2x</text>
            <text x={wordX + wordW / 2} y={y - 22}>{wordW}</text>
            <text x={x - 34} y={y + symbolH / 2 + 8}>{symbolH}</text>
            <text x={right + 40} y={wordY + wordH / 2 + 8}>{wordH}</text>
            <text x={x + 20} y={y - 22} className="is-accent">x</text>
            <text x={x - clear / 2} y={y - clear / 2 + 8} className="is-accent">2x</text>
            <text x={right + clear / 2} y={bottom + clear / 2 + 8} className="is-accent">2x</text>
          </g>
        </svg>
      </figure>
      <div className="q-logo-tiles">
        <figure className="q-logo-tile is-light" aria-label="Primary mark">
          <svg viewBox="-60 -40 404 478" aria-hidden="true">
            <defs>
              <linearGradient id="q-logo-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff5fb4" /><stop offset=".5" stopColor="#b02779" /><stop offset="1" stopColor="#811e93" />
              </linearGradient>
            </defs>
            <path d={SYMBOL_PATH} fill="url(#q-logo-fill)" />
          </svg>
        </figure>
        <figure className="q-logo-tile is-dark" aria-label="Vector construction">
          <svg viewBox="-60 -40 404 478" aria-hidden="true">
            <defs>
              <linearGradient id="q-construct-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="284" y2="398">
                <stop offset="0" stopColor="#ff7cc4" /><stop offset=".55" stopColor="#d23b8f" /><stop offset="1" stopColor="#9b3fd1" />
              </linearGradient>
            </defs>
            <path className="q-logo-body" d={SYMBOL_PATH} />
            <g className="q-logo-edges">
              {SYMBOL_POINTS.map(([x1, y1], i) => {
                const [x2, y2] = SYMBOL_POINTS[(i + 1) % SYMBOL_POINTS.length]
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={{ ['--i' as string]: i } as CSSProperties} />
              })}
            </g>
            <g className="q-logo-nodes">
              {SYMBOL_POINTS.map(([px, py], i) => (
                <rect key={i} x={px - 5.5} y={py - 5.5} width={11} height={11} rx={2.5} style={{ ['--i' as string]: i } as CSSProperties} />
              ))}
            </g>
          </svg>
        </figure>
      </div>
    </section>
  )
}

export function GridSystem({ phone }: { phone: Screen }) {
  return (
    <section id="grid" className="q-sec q-dark q-grid-sec">
      <SectionHead title="Consistent Grid System" mark />
      <div className="q-grid-phone">
        <div className="q-grid-dims" aria-hidden="true">
          <span className="q-grid-dim is-full"><b>393 px</b></span>
          <span className="q-grid-dim is-inner"><b>361 px</b></span>
          <em className="is-gutter">Gutter 16</em>
          <em className="is-margin">Margin 16</em>
        </div>
        <Phone src={phone.src} alt={`NEJA ${phone.label} screen with the column grid overlaid`} />
        <span className="q-grid-cols" aria-hidden="true"><i /><i /><i /><i /></span>
      </div>
      <dl className="q-grid-specs">
        <div><dt>Columns</dt><dd>4</dd></div>
        <div><dt>Margins</dt><dd>16 px</dd></div>
        <div><dt>Gutters</dt><dd>16 px</dd></div>
        <div><dt>Spacing scale</dt><dd>4 · 8 · 16 · 24 · 32</dd></div>
      </dl>
    </section>
  )
}

function trussPath(from: [number, number], to: [number, number], depth: number, bays: number) {
  const [x1, y1] = from
  const [x2, y2] = to
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const nx = (-dy / len) * depth
  const ny = (dx / len) * depth
  const at = (i: number, low: boolean) => {
    const px = x1 + (dx * i) / bays + (low ? nx : 0)
    const py = y1 + (dy * i) / bays + (low ? ny : 0)
    return `${px.toFixed(1)} ${py.toFixed(1)}`
  }
  let d = `M${at(0, false)}L${at(bays, false)}M${at(0, true)}L${at(bays, true)}`
  for (let i = 0; i <= bays; i++) {
    d += `M${at(i, false)}L${at(i, true)}`
    if (i < bays) d += `M${at(i, false)}L${at(i + 1, true)}`
  }
  return d
}

function tornClip() {
  const jag = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1
  const points: string[] = []
  const steps = 22
  for (let i = 0; i <= steps; i++) points.push(`${(i / steps * 100).toFixed(1)}% ${(jag(i) * 3.2).toFixed(1)}%`)
  for (let i = 0; i <= steps; i++) points.push(`${(100 - jag(i + 40) * 3).toFixed(1)}% ${(i / steps * 100).toFixed(1)}%`)
  for (let i = 0; i <= steps; i++) points.push(`${(100 - i / steps * 100).toFixed(1)}% ${(100 - jag(i + 80) * 3.6).toFixed(1)}%`)
  for (let i = 0; i <= steps; i++) points.push(`${(jag(i + 120) * 3).toFixed(1)}% ${(100 - i / steps * 100).toFixed(1)}%`)
  return `polygon(${points.join(', ')})`
}

const trusses = [
  trussPath([-60, 150], [660, 40], 46, 16),
  trussPath([-60, 400], [660, 300], 40, 16),
  trussPath([-60, 660], [660, 570], 36, 16),
]

export function InTheWild() {
  return (
    <section id="wild" className="q-sec q-light q-wild" aria-label="NEJA brand in the wild">
      <div className="q-wild-grid">
        <figure className="q-wild-tile is-roof">
          <svg className="q-wild-truss" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g className="q-wild-glass">
              {Array.from({ length: 9 }, (_, i) => <line key={`g${i}`} x1={i * 80 - 40} y1="0" x2={i * 80 + 40} y2="800" />)}
            </g>
            {trusses.map((d) => <path key={d} className="q-wild-beam" d={d} />)}
            <path className="q-wild-rod" d="M200 157V200M420 123V200" />
          </svg>
          <div className="q-banner">
            <div className="q-banner-sheet">
              <span className="q-banner-logo"><Mark />NEJA</span>
              <strong>Find it, plan it, and get there together.</strong>
              <p>Every event in Kosovo, in one app. Concerts, festivals, theatre, and nights out.</p>
              <img src={img('hero-crowd')} alt="" loading="lazy" />
            </div>
          </div>
        </figure>
        <figure className="q-wild-tile is-wall">
          <div className="q-torn-wrap">
            <div className="q-torn" style={{ clipPath: tornClip() }}>
              <Mark />
              <Wordmark />
            </div>
            <span className="q-torn-tape" aria-hidden="true" />
          </div>
        </figure>
      </div>
    </section>
  )
}
