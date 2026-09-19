'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, Download, Link2, Menu, Paperclip, X } from 'lucide-react'

const portraitUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8947.JPG-xs3E7SmXoPWIWN6x29BxKQUr2nOceJ.jpeg'
const CONTACT_EMAIL = 'dorelanuha22@gmail.com'

const aboutStory = [
  'My path did not begin in a lecture hall. It began on a stage.',
  'My long-held ambition of becoming a vocalist led me into audio engineering, where I immersed myself in acoustics, frequency manipulation, and the technical side of sound. But the deeper I went, the more I found myself asking: Am I in love with the physics of sound, or the human experience of expression?',
  'Rather than forcing a path that left me unmoored, I decided to explore. I deliberately dabbled across finance, sales, recruitment, marketing, operations, and coordination. Each role taught me something different about human behavior, operational friction, and how ideas become reality.',
  'When I finally paused to ask myself the right questions, I realized that product management sat at the precise intersection of everything that interested me: people, systems, design, and execution.',
  'My path has been anything but linear, but every step helped me understand what I want to build, and why.',
  "And I'm still asking better questions.",
]

const experience = [
  {
    year: '2025',
    role: 'Alumni Instructor & Coordinator',
    company: 'YES Alumni Orientation · U.S. Department of State',
    description: 'Orchestrated high-impact cross-cultural educational programs and leadership curricula for international cohorts, optimizing participant engagement and program retention metrics through data-driven feedback loops and qualitative assessment frameworks that iteratively refined workshop mechanics for scaled execution.',
    skills: ['Program Coordination', 'Event Operations', 'Leadership', 'Public Speaking', 'Cross-Cultural Communication', 'Stakeholder Management', 'Curriculum Development', 'Feedback Analysis'],
    tools: ['Google Workspace', 'Survey Tools', 'Project Planning', 'Zoom'],
  },
  {
    year: '2024',
    role: 'Talent Acquisition Specialist',
    company: 'Royal York Property Management',
    description: 'Spearheaded end-to-end recruitment lifecycles and scaled operational headcount by implementing rigorous competency-based screening matrices and ATS data analytics that significantly reduced time-to-fill metrics while aligning workforce planning strategies with aggressive company growth milestones.',
    skills: ['Talent Acquisition', 'Candidate Sourcing', 'Interview Coordination', 'Pipeline Management', 'Employer Branding', 'Process Optimization', 'Candidate Screening', 'Data Tracking'],
    tools: ['LinkedIn Recruiter', 'ATS Platforms', 'CRM Systems', 'Jira', 'Google Workspace'],
  },
  {
    year: '2023',
    role: 'Financial Recruiter',
    company: 'Alexander Chapman',
    description: 'Managed specialized talent acquisition mandates for high-stakes financial markets by executing targeted headhunting strategies and conducting deep-dive competency evaluations and financial acumen assessments to match elite quantitative talent with complex organizational needs.',
    skills: ['Recruitment', 'Candidate Assessment', 'Requirements Gathering', 'Relationship Management', 'Sales & Outreach', 'Market Research', 'Talent Matching'],
    tools: ['Microdec CRM', 'LinkedIn', 'Email Outreach', 'Candidate Databases', 'Spreadsheets'],
  },
  {
    year: '2022',
    role: 'Marketing & Operations Manager',
    company: 'SDA-Intech · Alpine Fleet',
    description: 'Directed multidisciplinary operations and multi-channel marketing campaigns to drive user acquisition, funnel optimization, and brand positioning, while streamlining internal workflows and resource allocation through digitized operational processes that directly enhanced cross-functional productivity and project turnaround times.',
    skills: ['Operations Management', 'Budget Management', 'Team Leadership', 'Process Improvement', 'Customer Journey Mapping', 'UX Design', 'Service Design', 'Marketing Operations'],
    tools: ['Figma', 'CRM Systems', 'Booking Systems', 'Analytics Tools', 'Spreadsheets'],
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [projectOpen, setProjectOpen] = useState(false)
  const [backToTopOnDark, setBackToTopOnDark] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [sharedLinks, setSharedLinks] = useState<string[]>([])
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const sections = ['top', 'about', 'experience', 'projects', 'contact']
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 4)
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
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

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
      <header className={hasScrolled ? 'site-header is-scrolled' : 'site-header'}>
        <a href="#top" className="wordmark">DORELA NUHA</a>
        <nav className={menuOpen ? 'desktop-nav open' : 'desktop-nav'}>
          {links.map(({ label, href }) => (
            <a className={activeSection === href ? 'active' : ''} key={label} href={`#${href}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
      </header>

      <section id="top" className="hero-split">
        <div className="hero-photo">
          <div className="hero-photo-story">
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
          </div>
          <img src={portraitUrl} alt="Dorela Nuha in graduation attire holding a bouquet" />
          <a href="#about" className={hasScrolled ? 'scroll-cue is-hidden' : 'scroll-cue'} aria-label="Scroll to about"><span /></a>
        </div>
        <div className="hero-copy"><div className="hero-copy-inner"><h1>Hello,<br />I&apos;m Dorela</h1><p>I align product, people, and possibilities into a single digital architecture</p><div className="hero-actions"><a className="button dark" href="#projects">View case studies</a><a className="button light" href="#contact">Get in touch <ArrowUpRight size={13} /></a></div></div></div>
      </section>

      <section id="about" className="white-section about-section"><div className="about-heading"><h2>Good products begin with<br /><strong>better questions.</strong></h2><div className="about-meta"><span>Product strategy</span><span>UX &amp; workflows</span><span>Cross-functional leadership</span><a className="about-jump" href="#experience">See selected experience <ArrowUpRight size={14} /></a></div></div></section>

      <section id="experience" className="gray-section"><h2 className="section-label">Experience</h2><div className="experience-list">{experience.map((item) => {
        const isExpanded = expandedExperience === item.year
        return <article className={isExpanded ? 'is-expanded' : ''} key={item.year}>
          <button className="experience-trigger" type="button" aria-expanded={isExpanded} onClick={() => setExpandedExperience(isExpanded ? null : item.year)}>
            <span>{item.year}</span>
            <div><h3>{item.role}</h3><p>{item.company}</p></div>
            <ChevronDown className="experience-chevron" size={17} />
          </button>
          <div className="experience-description" aria-hidden={!isExpanded}>
            <div className="experience-description-inner">
              <p>{item.description}</p>
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

      <section id="projects" className="white-section project-section"><div className={`project-card${projectOpen ? ' is-open' : ''}`}><div className="project-mark"><img className="project-mark-image" src="/neja.png" alt="Crowd moving through a neon-lit corridor" /><div className="project-mark-content"><span>CASE STUDY · 01</span><h2>NEJA<span>.</span></h2><p>Architecting a centralized discovery platform that turns fragmented event hunting into a frictionless user journey.</p></div><button type="button" className="project-mark-arrow" aria-expanded={projectOpen} aria-controls="project-info" aria-label={projectOpen ? 'Hide case study details' : 'Show case study details'} onClick={() => setProjectOpen((open) => !open)}><ArrowRight size={18} /></button></div><div id="project-info" className="project-info"><h3>Connecting the Dots in Event Discovery</h3><div className="project-details"><div className="project-details-inner"><div className="project-points">{['Problem discovery', 'User journey workflows', 'Figma wireframes', 'Success metrics'].map((point, i) => <div key={point}><span>0{i + 1}</span>{point}<ArrowUpRight size={14} /></div>)}</div><a href="#contact" className="text-link">Explore case study <ArrowUpRight size={14} /></a></div></div></div></div></section>

      <section id="contact" className="contact-section"><div className="contact-inner"><div><h2>Let&apos;s create things<br /><strong>that matter.</strong></h2><div className="contact-actions"><button type="button" onClick={copyEmail}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy Email'}</button><a href="https://linkedin.com/in/dorela-nuha" target="_blank" rel="noreferrer">LinkedIn</a><a href="/Dorela-Nuha-CV.pdf" download><Download size={13} /> Resume</a></div></div><form onSubmit={sendMessage} encType="multipart/form-data"><p className="form-intro">Always open to great ideas.</p><input required aria-required="true" name="name" aria-label="Name" placeholder="Name *" /><input required aria-required="true" name="email" type="email" aria-label="Email Address" placeholder="Email Address *" /><div className="message-box"><textarea ref={messageRef} required aria-required="true" name="message" aria-label="Your Message" placeholder="Your Message... *" /><div className="message-box-footer">{(attachments.length > 0 || sharedLinks.length > 0) ? <div className="message-box-files">{attachments.map((file, index) => <span className="message-chip" key={`${file.name}-${file.size}-${index}`}><Paperclip size={11} aria-hidden /><em>{file.name}</em><button type="button" className="chip-remove" aria-label={`Remove ${file.name}`} onClick={() => removeAttachment(index)}><X size={12} /></button></span>)}{sharedLinks.map((link) => <span className="message-chip" key={link}><Link2 size={11} aria-hidden /><em>{link}</em><button type="button" className="chip-remove" aria-label={`Remove ${link}`} onClick={() => removeLink(link)}><X size={12} /></button></span>)}</div> : null}<div className="message-box-toolbar"><button type="button" className="message-tool" aria-label="Attach files" onClick={() => fileInputRef.current?.click()}><Paperclip size={15} /></button><button type="button" className="message-tool" aria-label="Insert a link" onClick={insertLink}><Link2 size={15} /></button><input ref={fileInputRef} type="file" multiple hidden aria-hidden onChange={(event) => setAttachments(Array.from(event.target.files ?? []))} /></div></div></div><button type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Message sent' : <>Send Message <ArrowUpRight size={13} /></>}</button>{formStatus === 'error' ? <p className="form-status error">{formError} <a href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL}</a></p> : null}{formStatus === 'sent' ? <p className="form-status">Thanks — your message is on its way.</p> : null}</form></div><footer><span>DORELA NUHA / PORTFOLIO · © 2026</span></footer></section>
      <a href="#top" className={`back-to-top${hasScrolled ? ' is-visible' : ''}${backToTopOnDark ? ' is-on-dark' : ''}`} aria-label="Back to top">Back to top ↑</a>
    </main>
  )
}
