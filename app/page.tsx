'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Copy, Download, Menu, X } from 'lucide-react'

const portraitUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8947.JPG-xs3E7SmXoPWIWN6x29BxKQUr2nOceJ.jpeg'

const experience = [
  {
    year: '2025',
    role: 'Alumni Instructor & Coordinator',
    company: 'YES Alumni Orientation · U.S. Department of State',
    description: 'Orchestrated high-impact cross-cultural educational programs and leadership curricula for international cohorts, optimizing participant engagement and program retention metrics through data-driven feedback loops and qualitative assessment frameworks that iteratively refined workshop mechanics for scaled execution.',
  },
  {
    year: '2024',
    role: 'Talent Acquisition Specialist',
    company: 'Royal York Property Management',
    description: 'Spearheaded end-to-end recruitment lifecycles and scaled operational headcount by implementing rigorous competency-based screening matrices and ATS data analytics that significantly reduced time-to-fill metrics while aligning workforce planning strategies with aggressive company growth milestones.',
  },
  {
    year: '2023',
    role: 'Financial Recruiter',
    company: 'Alexander Chapman',
    description: 'Managed specialized talent acquisition mandates for high-stakes financial markets by executing targeted headhunting strategies and conducting deep-dive competency evaluations and financial acumen assessments to match elite quantitative talent with complex organizational needs.',
  },
  {
    year: '2022',
    role: 'Marketing & Operations Manager',
    company: 'SDA-Intech · Alpine Fleet',
    description: 'Directed multidisciplinary operations and multi-channel marketing campaigns to drive user acquisition, funnel optimization, and brand positioning, while streamlining internal workflows and resource allocation through digitized operational processes that directly enhanced cross-functional productivity and project turnaround times.',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)

  useEffect(() => {
    const sections = ['top', 'about', 'experience', 'projects', 'contact']
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 48)
      const current = sections.reduce((closest, sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return closest
        return section.getBoundingClientRect().top <= window.innerHeight * 0.35 ? sectionId : closest
      }, 'top')
      setActiveSection(current)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText('dorelanuha22@gmail.com')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const links = ['About', 'Experience', 'Projects', 'Contact']

  return (
    <main className="site-shell">
      <header className={hasScrolled ? 'site-header is-scrolled' : 'site-header'}>
        <a href="#top" className="wordmark">DORELA&nbsp; NUHA</a>
        <nav className={menuOpen ? 'desktop-nav open' : 'desktop-nav'}>
          {links.map((item) => {
            const sectionId = item.toLowerCase()
            return <a className={activeSection === sectionId ? 'active' : ''} key={item} href={`#${sectionId}`} onClick={() => setMenuOpen(false)}>{item}</a>
          })}
        </nav>
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
      </header>

      <section id="top" className="hero-split">
        <div className="hero-photo"><img src={portraitUrl} alt="Dorela Nuha in graduation attire holding a bouquet" /><a href="#about" className={hasScrolled ? 'scroll-cue is-hidden' : 'scroll-cue'} aria-label="Scroll to about"><span /></a></div>
        <div className="hero-copy"><div className="hero-copy-inner"><h1>Hello,<br />I&apos;m Dorela</h1><p>I study systems, operational friction, and how people interact with digital environments. My work focuses on translating ambiguous business problems into clean product architecture.<br />Currently based in Ferizaj, Kosovo, building intentional projects.</p><div className="hero-actions"><a className="button dark" href="#projects">View case studies</a><a className="button light" href="#contact">Get in touch <ArrowUpRight size={13} /></a></div></div></div>
      </section>

      <section id="about" className="white-section about-section"><div className="about-heading"><h2>Good products begin with<br /><strong>better questions.</strong></h2><div className="about-meta"><span>Product strategy</span><span>UX &amp; workflows</span><span>Cross-functional leadership</span></div></div><div className="about-story"><p>My path did not begin in a computer science lecture hall; it began in the pursuit of music.</p><p>Throughout my childhood and late teens, my world was consumed by an ambition to perform as a vocalist. That passion eventually led me into audio engineering — a rigorous, technical education dissecting acoustics, frequency manipulation, and hardware architecture. But as I immersed myself in the machinery, I had to confront a critical question: <em>Am I in love with the physics of sound, or the human experience of expression?</em></p><p>I realized that while I lived to sing, the technical infrastructure, instrument drills, and audio theory left me unmoored. Rather than forcing a mismatch, I shifted my inquiry. Instead of asking <em>what path should I stick to</em>, I asked <em>what else is out there to explore?</em></p><p>I opened my world up to systematic experimentation, diving headfirst into diverse operational environments to test my capabilities. In my early twenties, I deliberately dabbled across finance, sales, recruitment, marketing, operations, and coordination. Each role helped me map operational friction, human behavior, and structural execution.</p><p>When I finally paused to ask myself what I actually wanted to build, the realization struck: I had been searching for a discipline that could synthesize everything I had learned.</p><p>Product management answered the exact questions I was asking. It sits at the precise intersection of people, systems, and design. I thrive on orchestrating moving parts, synthesizing cross-functional skillsets, and translating ambiguity into a cohesive reality.</p><p>Asking the better questions is how I found my way here. And this is only the beginning.</p></div></section>

      <section id="experience" className="gray-section"><div className="experience-list">{experience.map((item) => {
        const isExpanded = expandedExperience === item.year
        return <article className={isExpanded ? 'is-expanded' : ''} key={item.year}>
          <button className="experience-trigger" type="button" aria-expanded={isExpanded} onClick={() => setExpandedExperience(isExpanded ? null : item.year)}>
            <span>{item.year}</span>
            <div><h3>{item.role}</h3><p>{item.company}</p></div>
            <ChevronDown className="experience-chevron" size={17} />
          </button>
          <div className="experience-description" aria-hidden={!isExpanded}><p>{item.description}</p></div>
        </article>
      })}</div></section>

      <section id="projects" className="white-section project-section"><div className="project-card"><div className="project-mark"><span>CASE STUDY · 01</span><h2>NEJA<span>.</span></h2><p>An event discovery ecosystem built to make finding your next meaningful experience feel effortless.</p></div><div className="project-info"><h3>From scattered listings<br />to a confident decision.</h3><div className="project-points">{['Problem discovery', 'User journey workflows', 'Figma wireframes', 'Success metrics'].map((point, i) => <div key={point}><span>0{i + 1}</span>{point}<ArrowUpRight size={14} /></div>)}</div><a href="#contact" className="text-link">Explore case study <ArrowUpRight size={14} /></a></div></div></section>

      <section id="contact" className="contact-section"><div className="contact-inner"><div><h2>Let&apos;s create things<br /><strong>that matter.</strong></h2><p>Have a question, an ambitious idea, or a role in mind? I&apos;d love to hear from you.</p><div className="contact-actions"><button onClick={copyEmail}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy Email'}</button><a href="https://linkedin.com/in/dorela-nuha" target="_blank" rel="noreferrer">LinkedIn</a><a href="/Dorela-Nuha-CV.pdf" download><Download size={13} /> Resume</a></div></div><form onSubmit={(e) => e.preventDefault()}><input required aria-label="Name" placeholder="Name" /><input required type="email" aria-label="Email Address" placeholder="Email Address" /><textarea required aria-label="Your Message" placeholder="Your Message..." /><button type="submit">Send Message <ArrowUpRight size={13} /></button></form></div></section>

      <footer><span>DORELA NUHA / PRODUCT</span><a href="#top">Back to top ↑</a></footer>
    </main>
  )
}
