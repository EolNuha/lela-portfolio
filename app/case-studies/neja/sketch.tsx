import type { ReactNode } from 'react'
import rough from 'roughjs'
import type { Options } from 'roughjs/bin/core'

const INK = '#24242c'
const PAPER = '#f4f1ea'
const MARKER = '#d23b8f'

const gen = rough.generator()

type Look = 'line' | 'fill' | 'shade' | 'paper' | 'hatch'

const seedOf = (...values: number[]) => values.reduce((acc, v) => (acc * 31 + Math.round(v * 10)) % 2147483646, 7) + 1
const tidy = (d: string) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1))

function looks(look: Look, size: number, seed: number, stroke: string, width: number): Options {
  const base: Options = { seed, stroke, strokeWidth: width, roughness: Math.min(1.15, Math.max(.45, size / 160)), bowing: .9 }
  if (look === 'fill') return { ...base, fill: INK, fillStyle: 'hachure', hachureGap: 1.5, fillWeight: 1.3, hachureAngle: -38 }
  if (look === 'shade') return { ...base, fill: 'rgba(36, 36, 44, .42)', fillStyle: 'hachure', hachureGap: 4.2, fillWeight: .8, hachureAngle: -40 }
  if (look === 'paper') return { ...base, fill: PAPER, fillStyle: 'solid' }
  if (look === 'hatch') return { ...base, stroke: 'none', fill: INK, fillStyle: 'hachure', hachureGap: 5, fillWeight: .9, hachureAngle: 52 }
  return base
}

function Drawn({ drawable }: { drawable: ReturnType<typeof gen.path> }) {
  return (
    <>
      {gen.toPaths(drawable).map((p, i) => (
        <path key={i} d={tidy(p.d)} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill ?? 'none'} />
      ))}
    </>
  )
}

function roundedRect(x: number, y: number, w: number, h: number, r: number) {
  const k = Math.min(r, w / 2, h / 2)
  return `M${x + k} ${y}H${x + w - k}A${k} ${k} 0 0 1 ${x + w} ${y + k}V${y + h - k}A${k} ${k} 0 0 1 ${x + w - k} ${y + h}H${x + k}A${k} ${k} 0 0 1 ${x} ${y + h - k}V${y + k}A${k} ${k} 0 0 1 ${x + k} ${y}Z`
}

function Box({ x, y, w, h, r = 0, look = 'line', width = 1.3 }: { x: number; y: number; w: number; h: number; r?: number; look?: Look; width?: number }) {
  const d = r ? roundedRect(x, y, w, h, r) : `M${x} ${y}H${x + w}V${y + h}H${x}Z`
  return <Drawn drawable={gen.path(d, looks(look, Math.min(w, h) * 2, seedOf(x, y, w, h), INK, width))} />
}

function Ring({ cx, cy, r, look = 'line', width = 1.3 }: { cx: number; cy: number; r: number; look?: Look; width?: number }) {
  return <Drawn drawable={gen.circle(cx, cy, r * 2, looks(look, r * 4, seedOf(cx, cy, r), INK, width))} />
}

function Line({ d, look = 'line', size = 40, stroke = INK, width = 1.3 }: { d: string; look?: Look; size?: number; stroke?: string; width?: number }) {
  return <Drawn drawable={gen.path(d, looks(look, size, seedOf(d.length, d.charCodeAt(1), d.charCodeAt(d.length - 2)), stroke, width))} />
}

function T({ x, y, size = 15, anchor, fill = INK, children }: { x: number; y: number; size?: number; anchor?: 'middle' | 'end'; fill?: string; children: ReactNode }) {
  const tilt = ((seedOf(x, y, size) % 100) / 100 - .5) * 2.6
  return <text x={x} y={y} fontSize={size * 1.15} textAnchor={anchor} fill={fill} transform={`rotate(${tilt.toFixed(2)} ${x} ${y})`}>{children}</text>
}

function Picture({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const sx = w / 100
  const sy = h / 60
  return (
    <>
      <Box x={x} y={y} w={w} h={h} r={8} />
      <Line d={`M${x + 16 * sx} ${y + 51 * sy}L${x + 40 * sx} ${y + 23 * sy}L${x + 56 * sx} ${y + 40 * sy}L${x + 66 * sx} ${y + 30 * sy}L${x + 86 * sx} ${y + 51 * sy}`} size={w} />
      <Ring cx={x + 70 * sx} cy={y + 16 * sy} r={Math.min(sx, sy) * 6} />
    </>
  )
}

function Status({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Line d={`M${x + 222} ${y + 38}v-4M${x + 227} ${y + 38}v-7M${x + 232} ${y + 38}v-10`} size={10} />
      <Box x={x + 242} y={y + 28} w={24} h={11} r={3} />
    </>
  )
}

function Frame({ x, y }: { x: number; y: number }) {
  return <Box x={x} y={y} w={300} h={612} r={38} width={1.6} />
}

function Home({ x, y }: { x: number; y: number }) {
  const tabs = ['Discover', 'Plani', 'Rruga', 'Going', 'Profile']
  return (
    <>
      <g className="q-sk-ink">
        <Frame x={x} y={y} />
        <Status x={x} y={y} />
        <Ring cx={x + 228} cy={y + 74} r={12} />
        <Ring cx={x + 262} cy={y + 74} r={14} />
        <Ring cx={x + 262} cy={y + 70} r={5} />
        <Line d={`M${x + 253} ${y + 84}q9 -9 18 0`} size={12} />
        <Box x={x + 22} y={y + 162} w={256} h={38} r={19} />
        <Ring cx={x + 44} cy={y + 180} r={7} />
        <Line d={`M${x + 49} ${y + 185}l6 6M${x + 250} ${y + 174}h14M${x + 253} ${y + 180}h8M${x + 255} ${y + 186}h4`} size={12} />
        <Box x={x + 22} y={y + 214} w={80} h={28} r={14} look="shade" />
        <Box x={x + 110} y={y + 214} w={84} h={28} r={14} />
        <Box x={x + 202} y={y + 214} w={76} h={28} r={14} />
        <Box x={x + 22} y={y + 286} w={256} h={154} r={14} />
        <Picture x={x + 34} y={y + 298} w={232} h={92} />
        <Line d={`M${x + 250} ${y + 314}c-4 -6 -12 -2 -8 4l8 7l8 -7c4 -6 -4 -10 -8 -4z`} size={12} />
        {[0, 1, 2].map((i) => <Ring key={i} cx={x + 40 + i * 10} cy={y + 427} r={6} look="paper" />)}
        <Box x={x + 22} y={y + 482} w={122} h={52} r={10} />
        <Box x={x + 156} y={y + 482} w={122} h={52} r={10} />
        <Picture x={x + 30} y={y + 490} w={36} h={36} />
        <Picture x={x + 164} y={y + 490} w={36} h={36} />
        <Box x={x + 14} y={y + 548} w={272} h={52} r={26} />
        {tabs.map((_, i) => <Ring key={i} cx={x + 46 + i * 52} cy={y + 566} r={8} look={i === 0 ? 'fill' : 'line'} />)}
      </g>
      <g className="q-sk-text">
        <T x={x + 30} y={y + 40} size={15}>9:41</T>
        <T x={x + 28} y={y + 82} size={26}>NEJA</T>
        <T x={x + 28} y={y + 116} size={17}>Hello, Arta</T>
        <T x={x + 28} y={y + 146} size={27}>What’s on tonight?</T>
        <T x={x + 60} y={y + 186} size={15}>Search events</T>
        <T x={x + 62} y={y + 233} size={14} anchor="middle">Concerts</T>
        <T x={x + 152} y={y + 233} size={14} anchor="middle">Festivals</T>
        <T x={x + 240} y={y + 233} size={14} anchor="middle">Theatre</T>
        <T x={x + 26} y={y + 274} size={20}>Trending</T>
        <T x={x + 274} y={y + 274} size={14} anchor="end">See all</T>
        <T x={x + 34} y={y + 410} size={16}>Sunny Hill · May 22</T>
        <T x={x + 266} y={y + 410} size={16} anchor="end">€19</T>
        <T x={x + 74} y={y + 432} size={13}>11 friends going</T>
        <T x={x + 26} y={y + 472} size={20}>Upcoming</T>
        <T x={x + 72} y={y + 506} size={13}>Dukagjini</T>
        <T x={x + 72} y={y + 522} size={12}>Jul 10</T>
        <T x={x + 206} y={y + 506} size={13}>Zone Club</T>
        <T x={x + 206} y={y + 522} size={12}>Jun 20</T>
        {tabs.map((tab, i) => <T key={tab} x={x + 46 + i * 52} y={y + 591} size={11} anchor="middle">{tab}</T>)}
      </g>
    </>
  )
}

function Event({ x, y }: { x: number; y: number }) {
  return (
    <>
      <g className="q-sk-ink">
        <Frame x={x} y={y} />
        <Status x={x} y={y} />
        <Ring cx={x + 40} cy={y + 76} r={16} />
        <Line d={`M${x + 43} ${y + 69}l-7 7l7 7`} size={12} />
        <Line d={`M${x + 258} ${y + 64}v22l8 -6l8 6v-22z`} size={14} />
        <Picture x={x + 22} y={y + 104} w={256} h={168} />
        <Box x={x + 34} y={y + 116} w={46} h={46} r={8} look="paper" />
        {[0, 1, 2, 3].map((i) => <Ring key={i} cx={x + 38 + i * 14} cy={y + 362} r={10} look="paper" />)}
        <Line d={`M${x + 26} ${y + 424}q30 -4 60 0t60 0t60 0t40 0M${x + 26} ${y + 440}q30 -4 60 0t60 0t60 0t40 0M${x + 26} ${y + 456}q30 -4 60 0t60 0t40 0`} size={60} />
        <Box x={x + 22} y={y + 472} w={256} h={66} r={10} />
        <Line d={`M${x + 22} ${y + 500}q80 10 140 -6t116 6M${x + 120} ${y + 472}q-12 30 4 66M${x + 210} ${y + 472}q10 30 -6 66`} size={60} />
        <Line d={`M${x + 168} ${y + 516}c-10 -12 -6 -26 6 -26s16 14 6 26l-6 8z`} look="fill" size={20} />
        <Box x={x + 98} y={y + 556} w={84} h={40} r={20} />
        <Box x={x + 190} y={y + 556} w={88} h={40} r={20} look="shade" />
      </g>
      <g className="q-sk-text">
        <T x={x + 30} y={y + 40} size={15}>9:41</T>
        <T x={x + 150} y={y + 82} size={20} anchor="middle">Event details</T>
        <T x={x + 57} y={y + 136} size={13} anchor="middle">22</T>
        <T x={x + 57} y={y + 152} size={13} anchor="middle">MAY</T>
        <T x={x + 26} y={y + 308} size={26}>Sunny Hill Festival</T>
        <T x={x + 26} y={y + 332} size={15}>Gërmi, Prishtinë · 20:00</T>
        <T x={x + 96} y={y + 367} size={15}>11 friends going</T>
        <T x={x + 26} y={y + 404} size={19}>About</T>
        <T x={x + 26} y={y + 584} size={24}>€19</T>
        <T x={x + 140} y={y + 581} size={14} anchor="middle">Add to Plani</T>
        <T x={x + 234} y={y + 581} size={14} anchor="middle">Get tickets</T>
      </g>
    </>
  )
}

function Plani({ x, y }: { x: number; y: number }) {
  const people = [
    { name: 'Arta', pick: 0 },
    { name: 'Dren', pick: 0 },
    { name: 'Blerta', pick: 1 },
    { name: 'Lirim', pick: 2 },
  ]
  const chips = ['In', 'Maybe', 'Out']
  return (
    <>
      <g className="q-sk-ink">
        <Frame x={x} y={y} />
        <Status x={x} y={y} />
        <Ring cx={x + 40} cy={y + 76} r={16} />
        <Line d={`M${x + 43} ${y + 69}l-7 7l7 7`} size={12} />
        {[0, 1, 2].map((i) => <Ring key={i} cx={x + 256 + i * 8} cy={y + 76} r={2} look="fill" />)}
        <Box x={x + 22} y={y + 102} w={256} h={68} r={12} />
        <Picture x={x + 32} y={y + 111} w={50} h={50} />
        {people.map((person, row) => (
          <g key={person.name}>
            <Ring cx={x + 40} cy={y + 238 + row * 44} r={14} />
            {chips.map((chip, i) => (
              <Box key={chip} x={x + 128 + i * 52} y={y + 226 + row * 44} w={46} h={24} r={12} look={person.pick === i ? 'shade' : 'line'} />
            ))}
          </g>
        ))}
        <Box x={x + 22} y={y + 436} w={170} h={20} r={10} look="hatch" />
        <Box x={x + 22} y={y + 436} w={226} h={20} r={10} />
        <Box x={x + 22} y={y + 470} w={52} h={20} r={10} look="hatch" />
        <Box x={x + 22} y={y + 470} w={226} h={20} r={10} />
        <Box x={x + 232} y={y + 512} w={44} h={24} r={12} look="shade" />
        <Ring cx={x + 264} cy={y + 524} r={8} look="paper" />
        <Box x={x + 22} y={y + 554} w={256} h={44} r={22} look="shade" />
      </g>
      <g className="q-sk-text">
        <T x={x + 30} y={y + 40} size={15}>9:41</T>
        <T x={x + 150} y={y + 82} size={20} anchor="middle">Plani</T>
        <T x={x + 94} y={y + 132} size={18}>Sunny Hill</T>
        <T x={x + 94} y={y + 152} size={13}>Sat, May 22 · 5 friends</T>
        <T x={x + 26} y={y + 208} size={20}>Who’s in?</T>
        {people.map((person, row) => (
          <g key={person.name}>
            <T x={x + 62} y={y + 243 + row * 44} size={15}>{person.name}</T>
            {chips.map((chip, i) => (
              <T key={chip} x={x + 151 + i * 52} y={y + 243 + row * 44} size={12} anchor="middle" >{chip}</T>
            ))}
          </g>
        ))}
        <T x={x + 26} y={y + 424} size={20}>When?</T>
        <T x={x + 274} y={y + 451} size={13} anchor="end">78%</T>
        <T x={x + 274} y={y + 485} size={13} anchor="end">22%</T>
        <T x={x + 26} y={y + 529} size={16}>Need a ride home?</T>
        <T x={x + 150} y={y + 581} size={16} anchor="middle">Send to the group</T>
      </g>
    </>
  )
}

function Note({ arrow, head, x, y, children }: { arrow: string; head: string; x: number; y: number; children: ReactNode }) {
  return (
    <g className="q-sk-note">
      <Line d={arrow} stroke={MARKER} width={2} size={90} />
      <Line d={head} stroke={MARKER} width={2} size={14} />
      <T x={x} y={y} size={22} fill={MARKER}>{children}</T>
    </g>
  )
}

export function Sketches({ hand }: { hand?: string }) {
  return (
    <section id="sketches" className="q-sketch" aria-label="Paper sketches">
      <div className="q-sketch-head">
        <h2>Paper Sketches</h2>
      </div>
      <div className="q-sketch-scroll">
        <div className="q-sketch-desk">
          <span className="q-prop is-notebook" aria-hidden="true" />
          <span className="q-prop is-ruler" aria-hidden="true" />
          <span className="q-prop is-pen" aria-hidden="true" />
          <svg className="q-sketch-paper" viewBox="0 0 1200 800" role="img" aria-label="Hand drawn wireframes of the NEJA home feed, event details and Plani screens">
            <defs>
              <filter id="q-pen" x="-2%" y="-2%" width="104%" height="104%">
                <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="grain" />
                <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.7 1.6" result="mask" />
                <feComposite in="SourceGraphic" in2="mask" operator="in" result="ink" />
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="warp" />
                <feDisplacementMap in="ink" in2="warp" scale="1.4" />
              </filter>
              <radialGradient id="q-smudge">
                <stop offset="0" stopColor="#5a5246" stopOpacity=".09" />
                <stop offset="1" stopColor="#5a5246" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="300" cy="700" rx="180" ry="60" fill="url(#q-smudge)" transform="rotate(-8 300 700)" />
            <ellipse cx="1010" cy="160" rx="140" ry="44" fill="url(#q-smudge)" transform="rotate(6 1010 160)" />
            <g className="q-sk-guide" aria-hidden="true">
              <path d="M30 108.5H1172M30 723.5H1172" />
            </g>
            <path className="q-sk-highlight" d="M858 79c22 -3 44 -2 68 1" />
            <path className="q-sk-highlight is-thin" d="M846 314c28 -3 58 -2 88 1" />
            <g className="q-sk-text">
              <T x={70} y={84} size={30}>1. Home</T>
              <T x={450} y={84} size={30}>2. Event details</T>
              <T x={830} y={84} size={30}>3. Plani</T>
            </g>
            <Home x={60} y={110} />
            <Event x={440} y={110} />
            <Plani x={820} y={110} />
            <Note arrow="M150 770q-40 -40 -60 -232" head="M83 549l7 -13l8 12" x={160} y={778}>social proof first</Note>
            <Note arrow="M548 768q-30 -20 -6 -56" head="M533 719l9 -9l4 12" x={556} y={778}>one tap to Plani</Note>
            <Note arrow="M880 764q-34 -60 -4 -160" head="M868 613l8 -10l5 11" x={890} y={778}>vote, don’t chat</Note>
          </svg>
          {hand && <img className="q-sketch-hand" src={hand} alt="" aria-hidden="true" loading="lazy" />}
        </div>
      </div>
      <p className="q-sketch-cap">Every flow started on paper. Home, Event details and Plani were sketched by hand to settle hierarchy and the core loop before a single pixel was drawn.</p>
    </section>
  )
}
