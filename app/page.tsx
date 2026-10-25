'use client'

import Link from 'next/link'
import { origin } from './case-studies/neja/back-link'
import { chapters } from './case-studies/neja/section-nav'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, Download, Link2, Menu, Paperclip, X } from 'lucide-react'

const portraitUrl = '/dorela-hero-street.jpg'
const CONTACT_EMAIL = 'dorelanuha22@gmail.com'

const aboutStory = [
  'My path did not begin in a lecture hall. It began on a stage.',
  'My long-held ambition of becoming a vocalist led me into audio engineering, where I immersed myself in acoustics, frequency manipulation, and the technical side of sound. But the deeper I went, the more I found myself asking: Am I in love with the physics of sound, or the human experience of expression?',
  'Rather than forcing a path that left me unmoored, I decided to explore. I deliberately dabbled across finance, sales, recruitment, marketing, operations, and coordination. Each role taught me something different about human behavior, operational friction, and how ideas become reality.',
  'When I finally paused to ask myself the right questions, I realized that product management sat at the precise intersection of everything that interested me: people, systems, design, and execution.',
  'My path has been anything but linear, but every step helped me understand what I want to build, and why.',
]

const experience = [
  {
    id: 'swiss-orange',
    year: '2026',
    dates: 'Jul – Oct 2026',
    role: 'Project & Business Analyst, Revenue Operations & Systems',
    company: 'Swiss Orange',
    location: 'Pristina, Kosovo',
    highlights: [
      'Architected business requirements discovery and process mapping for enterprise Salesforce Revenue Cloud implementations, optimizing quote-to-cash (Q2C) workflows and eliminating deliverable friction.',
      'Managed sprint tracking, backlogs, and milestone documentation across Jira and Confluence, ensuring 100% on-time execution for cross-functional project deliverables.',
      'Engineered centralized Confluence knowledge repositories derived from sales, billing, and technical analysis, resolving workflow bottlenecks to accelerate deployment timelines.',
    ],
    skills: ['Business Requirements', 'Process Mapping', 'Q2C Workflows', 'Sprint & Backlog Management', 'Documentation'],
    tools: ['Salesforce Revenue Cloud', 'Jira', 'Confluence', 'Miro'],
  },
  {
    id: 'american-councils',
    year: '2025',
    dates: 'Jun – Sep 2025',
    role: 'Global Program & Operations Coordinator',
    company: 'American Councils',
    location: 'Washington, D.C., USA',
    highlights: [
      'Selected as 1 of 4 global representatives to co-lead state-sponsored strategic orientation initiatives for 500+ top-tier international scholars across 35 nations, partnering directly with U.S. Department of State officials across 100+ program hours.',
      'Orchestrated 100% on-time arrival/departure operations across 4 high-density cohorts while facilitating 15+ leadership workshops, maintaining a 100% policy compliance record across 3 organizational tiers.',
    ],
    skills: ['Program Operations', 'Logistics Coordination', 'Workshop Facilitation', 'Policy Compliance', 'Stakeholder Management'],
    tools: ['Google Workspace', 'Zoom'],
  },
  {
    id: 'royal-york',
    year: '2024',
    dates: 'Jun – Oct 2024',
    role: 'Global Talent Operations & Recruitment Specialist',
    company: 'Royal York Property Management',
    location: 'Toronto, Canada',
    highlights: [
      'Spearheaded talent acquisition operations across 50+ global locations (40+ Canadian, 11 European), evaluating 100+ weekly applicants across 8+ specialized departments to fulfill high-volume staffing demands.',
      'Orchestrated 300+ strategic touchpoints weekly via LinkedIn Recruiter, building multi-time-zone pipelines and executing full-lifecycle hiring across executive, technical, and revenue-generating verticals.',
      'Standardized multi-tier evaluation frameworks and ATS protocols, benchmarking technical and cross-cultural standards to achieve 100% data integrity and accelerate average time-to-shortlist.',
    ],
    skills: ['Full-Lifecycle Recruitment', 'High-Volume Hiring', 'Pipeline Building', 'Evaluation Frameworks', 'Data Governance'],
    tools: ['LinkedIn Recruiter', 'ATS'],
  },
  {
    id: 'alexander-chapman',
    year: '2023',
    dates: 'Apr – Jul 2023',
    role: 'Financial Recruiter',
    company: 'Alexander Chapman',
    location: 'London, UK',
    highlights: [
      'Directed headhunting operations and end-to-end recruitment pipelines for tier-1 hedge fund and investment banking accounts across Quantitative Research, Risk Management, and Algorithmic Trading sectors.',
      'Achieved a 90% placement match rate by designing comprehensive candidate profiling models and prequalifying passive financial professionals on advanced quantitative capabilities to shorten client time-to-hire.',
      'Systematized high-integrity database protocols in Microdec CRM across 300+ daily candidate touchpoints, sustaining 99%+ data accuracy and optimizing market mapping reports for global financial institutions.',
    ],
    skills: ['Headhunting', 'Candidate Profiling', 'Market Mapping', 'Client Relationships', 'Data Governance'],
    tools: ['Microdec CRM', 'LinkedIn'],
  },
  {
    id: 'alpine-fleet',
    year: '2022',
    dates: 'Aug 2022 – Feb 2023',
    role: 'Marketing & Operations Manager',
    company: 'Alpine Fleet',
    location: 'Ferizaj, Kosovo',
    highlights: [
      'Co-managed cross-border fleet logistics and dispatch operations across high-density European transit corridors (Geneva Airport to Alpine routes), auditing cost metrics and schedules to streamline turnaround times for a team of 10+ field employees.',
      'Architected user journey prototypes and booking flows in Figma, driving digital checkout optimizations that increased online conversion rates while aligning multi-channel digital marketing initiatives with real-time demand.',
    ],
    skills: ['Logistics & Dispatch', 'Cost Auditing', 'User Journey Design', 'Conversion Optimization', 'Digital Marketing'],
    tools: ['Figma'],
  },
]

const RETURN_KEY = 'portfolio-return'

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [navFrosted, setNavFrosted] = useState(false)
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [projectOpen, setProjectOpen] = useState(false)
  const [heroStoryOpen, setHeroStoryOpen] = useState(false)
  const [backToTopOnDark, setBackToTopOnDark] = useState(false)
  const [navOnDark, setNavOnDark] = useState(true)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [sharedLinks, setSharedLinks] = useState<string[]>([])
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    const saved = sessionStorage.getItem(RETURN_KEY)
    if (saved) {
      sessionStorage.removeItem(RETURN_KEY)
      const { y, open } = JSON.parse(saved) as { y: number; open: boolean }
      setProjectOpen(open)
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
      return
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])

  const leaveToCaseStudy = () => {
    origin.fromPortfolio = true
    sessionStorage.setItem(RETURN_KEY, JSON.stringify({ y: window.scrollY, open: projectOpen }))
  }

  useEffect(() => {
    const sections = ['top', 'about', 'experience', 'projects', 'contact']
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 4)

      const header = document.querySelector('.site-header')
      const navBottom = header ? header.getBoundingClientRect().bottom : 72
      const photo = document.querySelector('.hero-photo')
      const storyOpen = Boolean(photo?.classList.contains('is-open'))

      let frosted = false
      if (storyOpen) {
        const paragraphs = document.querySelectorAll('.hero-photo-story p:not(.hero-close-hint)')
        frosted = Array.from(paragraphs).some((paragraph) => {
          const rect = paragraph.getBoundingClientRect()
          return rect.bottom > 0 && rect.top <= navBottom
        })
      } else {
        const greeting = document.querySelector('.hero-greeting')
        if (greeting) {
          frosted = greeting.getBoundingClientRect().top <= navBottom
        }
      }

      if (!frosted && photo) {
        frosted = photo.getBoundingClientRect().bottom <= navBottom
      }
      if (!frosted && !photo) {
        frosted = window.scrollY > 4
      }
      setNavFrosted(frosted)

      const current = sections.reduce((closest, sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return closest
        return section.getBoundingClientRect().top <= window.innerHeight * 0.35 ? sectionId : closest
      }, 'top')
      setActiveSection(current)

      const pointX = window.innerWidth - 40
      const pointY = window.innerHeight - 40
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120
      let onDark = nearBottom || current === 'experience' || current === 'contact'

      if (!onDark) {
        for (const sectionId of [...sections].reverse()) {
          const section = document.getElementById(sectionId)
          if (!section) continue
          const rect = section.getBoundingClientRect()
          if (pointX < rect.left || pointX > rect.right || pointY < rect.top || pointY > rect.bottom) continue

          if (sectionId === 'experience' || sectionId === 'contact') {
            onDark = true
          } else if (sectionId === 'projects') {
            const mark = section.querySelector('.project-mark')
            if (mark) {
              const markRect = mark.getBoundingClientRect()
              onDark = pointX >= markRect.left && pointX <= markRect.right
            }
          } else if (sectionId === 'top') {
            const photo = section.querySelector('.hero-photo')
            if (photo) {
              const photoRect = photo.getBoundingClientRect()
              onDark = pointY >= photoRect.top && pointY <= photoRect.bottom && pointX >= photoRect.left && pointX <= photoRect.right
            }
          }
          break
        }
      }

      setBackToTopOnDark(onDark)

      const navY = 28
      let navDark = false
      const experience = document.getElementById('experience')
      const contact = document.getElementById('contact')
      if (experience) {
        const rect = experience.getBoundingClientRect()
        if (navY >= rect.top && navY <= rect.bottom) navDark = true
      }
      if (!navDark && contact) {
        const rect = contact.getBoundingClientRect()
        if (navY >= rect.top && navY <= rect.bottom) navDark = true
      }
      if (!navDark && photo) {
        const rect = photo.getBoundingClientRect()
        if (navY >= rect.top && navY <= rect.bottom) navDark = true
      }
      setNavOnDark(navDark)

      const themeColor = navDark ? '#171512' : '#ffffff'
      let themeMeta = document.querySelector('meta[name="theme-color"]')
      if (!themeMeta) {
        themeMeta = document.createElement('meta')
        themeMeta.setAttribute('name', 'theme-color')
        document.head.appendChild(themeMeta)
      }
      if (themeMeta.getAttribute('content') !== themeColor) {
        themeMeta.setAttribute('content', themeColor)
      }
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    const story = document.querySelector('.hero-photo-story')
    story?.addEventListener('scroll', updateScrollState, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
      story?.removeEventListener('scroll', updateScrollState)
    }
  }, [heroStoryOpen])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const insertLink = () => {
    const raw = window.prompt('Paste a link to share')
    if (!raw) return
    const url = /^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${raw.trim()}`
    setSharedLinks((current) => (current.includes(url) ? current : [...current, url]))
  }

  const removeAttachment = (index: number) => {
    setAttachments((current) => current.filter((_, i) => i !== index))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeLink = (url: string) => {
    setSharedLinks((current) => current.filter((link) => link !== url))
  }

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const typedMessage = String(data.get('message') ?? '').trim()
    const message = [typedMessage, ...sharedLinks].filter(Boolean).join('\n\n')

    if (!name || !email || !typedMessage) {
      setFormStatus('error')
      setFormError('Please fill in name, email, and message.')
      return
    }

    const maxBytes = 5 * 1024 * 1024
    if (attachments.some((file) => file.size > maxBytes)) {
      setFormStatus('error')
      setFormError('Each file must be under 5MB.')
      return
    }

    setFormStatus('sending')
    setFormError('')

    const payload = new FormData()
    payload.append('name', name)
    payload.append('email', email)
    payload.append('message', message)
    sharedLinks.forEach((link, index) => {
      payload.append(sharedLinks.length === 1 ? 'link' : `link_${index + 1}`, link)
    })
    payload.append('_replyto', email)
    payload.append('_subject', `Portfolio message from ${name}`)
    payload.append('_template', 'table')
    attachments.forEach((file, index) => {
      payload.append(attachments.length === 1 ? 'attachment' : `attachment_${index + 1}`, file)
    })

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      })
      const result = await response.json()

      if (!response.ok || result.success === 'false' || result.success === false) {
        setFormStatus('error')
        setFormError(result.message || 'Unable to send message right now. Try emailing directly.')
        return
      }

      form.reset()
      setAttachments([])
      setSharedLinks([])
      if (fileInputRef.current) fileInputRef.current.value = ''
      setFormStatus('sent')
      window.setTimeout(() => setFormStatus('idle'), 5000)
    } catch {
      setFormStatus('error')
      setFormError('Unable to send message right now. Try emailing directly.')
    }
  }

  const links = [
    { label: 'Intro', href: 'top' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ]

  return (
    <main className="site-shell">
      <header className={`site-header${hasScrolled ? ' is-scrolled' : ''}${navFrosted ? ' is-frosted' : ''}${navOnDark ? ' is-on-dark' : ' is-on-light'}`}>
        <div className="nav-pill">
          <a
            href="/"
            className="wordmark"
            onClick={(event) => {
              event.preventDefault()
              window.scrollTo(0, 0)
              window.location.assign('/')
            }}
          >
            DORELA NUHA
          </a>
          <nav className={menuOpen ? 'desktop-nav open' : 'desktop-nav'}>
            {links.map(({ label, href }) => (
              <a className={activeSection === href ? 'active' : ''} key={label} href={`#${href}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </div>
      </header>

      <section id="top" className="hero-split">
        <div
          className={`hero-photo${heroStoryOpen ? ' is-open' : ''}`}
          onClick={() => setHeroStoryOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setHeroStoryOpen((open) => !open)
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={heroStoryOpen}
          aria-label={heroStoryOpen ? 'Hide story and show photo' : 'Show story'}
        >
          <div className={`hero-intro${heroStoryOpen ? ' is-hidden' : ''}`}>
            <p className="hero-tap-hint">Tap for more</p>
            <h1 className="hero-greeting">Hello,<br />I&apos;m Dorela</h1>
            <a href="#about" className={hasScrolled ? 'scroll-cue is-hidden' : 'scroll-cue'} aria-label="Scroll to about" onClick={(event) => event.stopPropagation()}><span /></a>
          </div>
          <div className="hero-photo-story" aria-hidden={!heroStoryOpen}>
            {aboutStory.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>
                {paragraph.includes('Am I in love with the physics of sound') ? (
                  <>
                    {paragraph.split('Am I in love with the physics of sound, or the human experience of expression?')[0]}
                    <em>Am I in love with the physics of sound, or the human experience of expression?</em>
                    {paragraph.split('Am I in love with the physics of sound, or the human experience of expression?')[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
            <p className="hero-close-hint">Tap to close</p>
          </div>
          <img src={portraitUrl} alt="Dorela Nuha smiling on a sunny city street corner" />
        </div>
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p>I align product, people, and possibilities into a single digital architecture</p>
            <div className="hero-actions">
              <a className="button dark" href="#projects">View case studies</a>
              <a className="button light" href="#contact">Get in touch <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="white-section about-section">
        <div className="about-heading">
          <h2>
            Good products begin with
            <br />
            <strong>better questions.</strong>
          </h2>
          <div className="about-meta">
            <div className="about-meta-marquee" aria-hidden="true">
              <div className="about-meta-track">
                <div className="about-meta-group">
                  <span>Product strategy</span>
                  <span className="about-meta-sep">·</span>
                  <span>UX &amp; workflows</span>
                  <span className="about-meta-sep">·</span>
                  <span>Cross-functional leadership</span>
                  <span className="about-meta-sep">·</span>
                </div>
                <div className="about-meta-group">
                  <span>Product strategy</span>
                  <span className="about-meta-sep">·</span>
                  <span>UX &amp; workflows</span>
                  <span className="about-meta-sep">·</span>
                  <span>Cross-functional leadership</span>
                  <span className="about-meta-sep">·</span>
                </div>
              </div>
            </div>
            <p className="sr-only">Product strategy, UX and workflows, Cross-functional leadership</p>
            <a className="about-jump" href="#experience">See selected experience <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>

      <section id="experience" className="gray-section">
        <h2 className="section-label">Experience</h2>
        <div className="experience-list">{experience.map((item) => {
        const isExpanded = expandedExperience === item.id
        return <article className={isExpanded ? 'is-expanded' : undefined} key={item.id}>
          <button className="experience-trigger" type="button" aria-expanded={isExpanded} onClick={() => setExpandedExperience(isExpanded ? null : item.id)}>
            <span>{item.year}</span>
            <div><h3>{item.role}</h3><p>{item.company}</p></div>
            <ChevronDown className="experience-chevron" size={17} />
          </button>
          <div className="experience-description" aria-hidden={!isExpanded}>
            <div className="experience-description-inner">
              <p className="experience-dates">{item.dates} · {item.location}</p>
              <ul className="experience-highlights">
                {item.highlights.map((highlight) => <li key={highlight.slice(0, 32)}>{highlight}</li>)}
              </ul>
              <div className="experience-meta">
                <div className="experience-meta-group">
                  <span className="experience-meta-label">Skills</span>
                  <div className="experience-pills">
                    {item.skills.map((skill) => <span className="experience-pill skill" key={skill}>{skill}</span>)}
                  </div>
                </div>
                <div className="experience-meta-group">
                  <span className="experience-meta-label">Tools</span>
                  <div className="experience-pills">
                    {item.tools.map((tool) => <span className="experience-pill tool" key={tool}>{tool}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      })}</div></section>

      <section id="projects" className="white-section project-section">
        <div className={`project-card${projectOpen ? ' is-open' : ''}`}>
          <div className="project-mark">
            <Link href="/case-studies/neja" className="project-mark-surface" aria-label="Open the NEJA case study" onClick={leaveToCaseStudy}>
              <img className="project-mark-image" src="/neja.png" alt="Crowd moving through a neon-lit corridor" />
              <div className="project-mark-content">
                <h2>NEJA<span>.</span></h2>
                <p>Architecting a centralized discovery platform that turns fragmented event hunting into a frictionless user journey.</p>
                <span className="project-mark-label">CASE STUDY IN PROGRESS</span>
              </div>
            </Link>
            <button type="button" className="project-mark-arrow" aria-expanded={projectOpen} aria-controls="project-info" aria-label={projectOpen ? 'Hide case study details' : 'Show case study details'} onClick={() => setProjectOpen((open) => !open)}><ArrowRight size={18} /></button>
          </div>
          <div id="project-info" className="project-info">
            <div className="project-info-inner">
              <h3>Connecting the Dots in Event Discovery</h3>
              <div className="project-details">
                <div className="project-points">
                  {chapters.map((chapter, i) => (
                    <Link key={chapter.name} href={`/case-studies/neja#${chapter.ids[0]}`} onClick={leaveToCaseStudy}><span>{i + 1}</span>{chapter.name}<ArrowUpRight size={14} /></Link>
                  ))}
                </div>
                <Link href="/case-studies/neja" className="text-link" onClick={leaveToCaseStudy}>Explore case study <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div>
            <h2>
              Let&apos;s create things
              <br />
              <strong>that matter.</strong>
            </h2>
            <div className="contact-actions">
              <button type="button" onClick={copyEmail}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy Email'}</button>
              <a href="https://linkedin.com/in/dorela-nuha" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="/Dorela-Nuha-CV.pdf" download><Download size={13} /> Resume</a>
            </div>
          </div>
          <form onSubmit={sendMessage} encType="multipart/form-data">
            <p className="form-intro">Always open to great ideas.</p>
            <input required aria-required="true" name="name" aria-label="Name" placeholder="Name *" />
            <input required aria-required="true" name="email" type="email" aria-label="Email Address" placeholder="Email Address *" />
            <div className="message-box">
              <textarea ref={messageRef} required aria-required="true" name="message" aria-label="Your Message" placeholder="Your Message... *" />
              <div className="message-box-footer">
                {(attachments.length > 0 || sharedLinks.length > 0) ? (
                  <div className="message-box-files">
                    {attachments.map((file, index) => (
                      <span className="message-chip" key={`${file.name}-${file.size}-${index}`}>
                        <Paperclip size={11} aria-hidden /><em>{file.name}</em>
                        <button type="button" className="chip-remove" aria-label={`Remove ${file.name}`} onClick={() => removeAttachment(index)}><X size={12} /></button>
                      </span>
                    ))}
                    {sharedLinks.map((link) => (
                      <span className="message-chip" key={link}>
                        <Link2 size={11} aria-hidden /><em>{link}</em>
                        <button type="button" className="chip-remove" aria-label={`Remove ${link}`} onClick={() => removeLink(link)}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="message-box-toolbar">
                  <button type="button" className="message-tool" aria-label="Attach files" onClick={() => fileInputRef.current?.click()}><Paperclip size={15} /></button>
                  <button type="button" className="message-tool" aria-label="Insert a link" onClick={insertLink}><Link2 size={15} /></button>
                  <input ref={fileInputRef} type="file" multiple hidden aria-hidden onChange={(event) => setAttachments(Array.from(event.target.files ?? []))} />
                </div>
              </div>
            </div>
            <button type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Message sent' : <>Send Message <ArrowUpRight size={13} /></>}
            </button>
            {formStatus === 'error' ? <p className="form-status error">{formError} <a href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL}</a></p> : null}
            {formStatus === 'sent' ? <p className="form-status">Thanks — your message is on its way.</p> : null}
          </form>
        </div>
        <footer><span>DORELA NUHA / PORTFOLIO · © 2026</span></footer>
      </section>
      <a href="#top" className={`back-to-top${hasScrolled ? ' is-visible' : ''}${backToTopOnDark ? ' is-on-dark' : ''}`} aria-label="Back to top">Back to top ↑</a>
    </main>
  )
}
