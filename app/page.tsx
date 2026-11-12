'use client'

import Link from 'next/link'
import { origin } from './case-studies/neja/back-link'
import { chapters } from './case-studies/neja/section-nav'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Copy, Download, Link2, Menu, Paperclip, X } from 'lucide-react'

const portraitUrl = '/dorela-portrait.jpg'
const CONTACT_EMAIL = 'dorelanuha22@gmail.com'

const objective = 'I’m an aspiring product manager with a track record of turning messy, cross-functional problems into clear systems that people actually use. Since 2022 I’ve worked across business analysis, program operations, recruitment, and marketing in Kosova, Canada, and the US: mapping quote-to-cash processes for Salesforce rollouts, running sprints and backlogs in Jira and Confluence, and coordinating programs for more than 500 international scholars. Today I’m building NEJA, an app for every event in Kosova, which I’m taking from user research and strategy through design and development toward its 2027 launch. I’m looking for an associate product or operations role where I can own problems end to end, stay close to users and the teams who build for them, and grow into a product manager who ships things that matter.'

const experience = [
  {
    id: 'swiss-orange',
    year: '2026',
    dates: 'Aug – Oct 2026 · Contract',
    role: 'Project and Business Analyst – Revenue Operations',
    company: 'Swiss Orange Group',
    location: 'Pristina, Kosova',
    highlights: [
      'Translated stakeholder needs into business requirements and end-to-end quote-to-cash (Q2C) process maps for enterprise Salesforce Revenue Cloud implementations.',
      'Directed sprint backlogs, release milestones and project documentation in Jira and Confluence across cross-functional teams, sustaining a 100% on-time release record.',
      'Established centralized Confluence knowledge bases from sales, billing and technical analysis, eliminating recurring workflow bottlenecks and accelerating deployment timelines.',
    ],
    skills: ['Requirements Gathering', 'Process Mapping', 'Quote-to-Cash (Q2C)', 'Workflow Automation', 'Sprint & Backlog Management', 'Stakeholder Management'],
    tools: ['Salesforce Revenue Cloud', 'Salesforce Sales Cloud', 'Jira', 'Confluence', 'n8n', 'Miro', 'draw.io', 'Slack'],
  },
  {
    id: 'american-councils',
    year: '2025',
    dates: 'Jul – Sep 2025 · Seasonal',
    role: 'Arrival Orientation Alumni Instructor – Global Programs',
    company: 'American Councils for International Education',
    location: 'Washington, D.C., USA',
    highlights: [
      'Selected as 1 of 4 alumni leads worldwide to deliver the U.S. Department of State arrival orientation for 500+ scholars from 35 countries across 100+ program hours.',
      'Orchestrated arrival and departure logistics for 4 cohorts with zero schedule slippage and facilitated 15+ leadership workshops in partnership with Department of State officials and program staff.',
    ],
    skills: ['Program Operations', 'Stakeholder Management', 'Cross-Functional Coordination', 'Logistics Planning', 'Workshop Facilitation'],
    tools: ['Asana', 'Microsoft Excel', 'Google Forms', 'Google Docs', 'Microsoft Teams', 'Canva'],
  },
  {
    id: 'royal-york',
    year: '2024',
    dates: 'Aug – Oct 2024',
    role: 'Talent Acquisition Specialist – Global Recruiting',
    company: 'Royal York Property Management',
    location: 'Toronto, Canada',
    highlights: [
      'Drove high-volume recruitment for 50+ locations across Canada and Europe (40+ Canadian, 11 European), screening 100+ applicants weekly across 8+ departments.',
      'Built multi-time-zone talent pipelines through 300+ weekly LinkedIn Recruiter touchpoints, managing full-cycle hiring for executive, technical and revenue-generating roles.',
      'Standardized candidate evaluation criteria and applicant tracking system (ATS) data protocols, improving data accuracy and reducing average time-to-shortlist.',
    ],
    skills: ['Recruiting Operations', 'Pipeline Management', 'Process Standardization', 'Data Quality', 'Full-Cycle Recruiting'],
    tools: ['Zoho Recruit', 'Workable', 'LinkedIn Recruiter', 'HubSpot', 'Indeed', 'Google Sheets', 'Zoom'],
  },
  {
    id: 'alpine-fleet',
    year: '2022',
    dates: 'Sep 2022 – Feb 2023',
    role: 'Operations Manager – Logistics & Digital Marketing',
    company: 'AlpineFleet',
    location: 'Geneva, Switzerland (remote from Ferizaj, Kosova)',
    highlights: [
      'Co-managed cross-border dispatch for Geneva Airport to Alpine resort transfers, auditing cost and schedule data to accelerate fleet turnaround for a 10+ person field team.',
      'Designed booking-flow prototypes in Figma and optimized the online checkout, increasing online conversion, while aligning Google Ads and Meta campaigns with real-time demand.',
    ],
    skills: ['Operations Management', 'Cost Analysis', 'User Journey Mapping', 'Prototyping', 'Conversion Optimization', 'Performance Marketing'],
    tools: ['Figma', 'Google Analytics', 'Google Ads', 'Meta Ads Manager', 'WordPress', 'Google Sheets'],
  },
]

const cert = (file: string) => `/certifications/${file}.jpg`

type CertImage = { src: string; alt: string }

type Certification = {
  year: string
  title: string
  issuer: string
  issued: string
  logo: string
  images: CertImage[]
  details: { title: string; text: string }[]
  skills: string[]
  course?: string
}

const certifications: Certification[] = [
  {
    year: '2026', title: 'Product Management: An Introduction', issuer: 'IBM via Coursera', issued: 'Nov 2026', logo: cert('logo-coursera'),
    images: [{ src: cert('ibm-product-management-intro'), alt: 'IBM Product Management: An Introduction course certificate' }],
    details: [{ title: 'IBM Course Certificate', text: 'Completed IBM’s Product Management: An Introduction through Coursera, the first course of the IBM Product Manager Professional Certificate. Covers the product manager’s role, responsibilities, and core skills, the end-to-end product management lifecycle, value creation, and the link between portfolio, product, and project management. Credential ID 2A5W8UVZPB8J.' }],
    skills: ['Product Management', 'Product Strategy', 'Product Lifecycle Management', 'Portfolio Management'],
  },
  {
    year: '2026', title: 'Product-Led Fundamentals', issuer: 'ProductLed', issued: 'Oct 2026', logo: cert('logo-productled'),
    images: [{ src: cert('productled-fundamentals'), alt: 'Product-Led Fundamentals certificate' }],
    details: [{ title: 'Product-Led Fundamentals Certificate', text: 'Awarded by Wes Bush for mastering product-led GTM framework design, time-to-value (TTV) optimization, and scalable self-serve acquisition models that position the core product as the primary growth catalyst.' }],
    skills: ['Product-Led Growth (PLG)', 'Go-to-Market Strategy', 'User Acquisition & Retention', 'Time-to-Value (TTV) Optimization', 'Customer Journey Optimization'],
  },
  {
    year: '2025', title: 'Kennedy-Lugar YES Program Alumni Instructor Certificate', issuer: 'American Councils for International Education', issued: 'Aug 2025', logo: cert('logo-american-councils'),
    images: [{ src: cert('yes-alumni-instructor'), alt: 'YES Program DC Orientation Alumni Instructor certificate' }],
    details: [{ title: 'YES Program DC Orientation Alumni Instructor Certificate', text: 'Awarded by American Councils for International Education and the U.S. Department of State for leading workshop facilitation, stakeholder coordination, and onboarding programs for incoming exchange cohorts during the Washington, DC Orientation.' }],
    skills: ['Student Leadership', 'Program Facilitation', 'Cohort Management', 'Onboarding'],
  },
  {
    year: '2024', title: 'YES Alumni City Representative Certificate of Appreciation', issuer: 'Kennedy-Lugar Youth Exchange and Study (YES) Program', issued: 'Aug 2024', logo: cert('logo-yes'),
    images: [{ src: cert('yes-city-representative'), alt: 'YES Alumni City Representative certificate of appreciation' }],
    details: [{ title: 'YES Alumni City Representative Certificate of Appreciation', text: 'Awarded by American Councils and the U.S. Department of State for leadership, community development, and event organization as YES Alumni City Representative.' }],
    skills: ['Event Management', 'Community Leadership', 'Public Relations', 'Cross-Cultural Communication'],
  },
  {
    year: '2024', title: 'Certificate of Teaching Excellence, Pre-Departure Orientation', issuer: 'U.S. Department of State', issued: 'Jun 2024', logo: cert('logo-state-department'),
    images: [
      { src: cert('teaching-excellence-yes'), alt: 'Certificate of Teaching Excellence, YES Pre-Departure Orientation' },
      { src: cert('teaching-excellence-flex'), alt: 'Certificate of Teaching Excellence, FLEX Pre-Departure Orientation' },
    ],
    details: [
      { title: 'YES Pre-Departure Orientation', text: 'Awarded for teaching excellence as a Teaching Assistant during the YES Program Pre-Departure Orientation in Prizren, Kosova, facilitating cultural adaptation and leadership preparation for exchange students.' },
      { title: 'FLEX Pre-Departure Orientation', text: 'Awarded by American Councils for International Education for serving as a Teaching Assistant during the FLEX Pre-Departure Orientation in Podgorica, Montenegro.' },
    ],
    skills: ['Public Speaking', 'Training Program Development', 'Leadership Development'],
  },
  {
    year: '2023', title: 'Alumni Internship Program Certificate of Completion', issuer: 'U.S. Department of State', issued: 'Aug 2023', logo: cert('logo-state-department'),
    images: [{ src: cert('alumni-internship-ivy-journey'), alt: 'YES Alumni Intern, Ivy Journey certificate of completion' }],
    details: [{ title: 'YES Alumni Intern, Ivy Journey', text: 'Completed a competitive summer internship at Ivy Journey through the U.S. Department of State and American Councils Alumni Internship Program, contributing to cross-functional projects, student support, and program operations.' }],
    skills: ['Professional Development', 'Program Management', 'Educational Consulting'],
  },
  {
    year: '2022', title: 'Kennedy-Lugar YES Program Completion Certificate', issuer: 'PAX, Program of Academic Exchange', issued: 'Jun 2022', logo: cert('logo-pax'),
    images: [
      { src: cert('yes-completion-state-department'), alt: 'U.S. Department of State YES Program certificate of completion' },
      { src: cert('pax-completion'), alt: 'PAX Academic Exchange certificate of completion' },
    ],
    details: [
      { title: 'U.S. Department of State YES Program Certificate of Completion', text: 'Awarded by the Bureau of Educational and Cultural Affairs for successfully completing the U.S. Department of State Kennedy-Lugar Youth Exchange and Study (YES) program in the United States.' },
      { title: 'PAX Academic Exchange Certificate of Completion', text: 'Awarded by PAX Program of Academic Exchange in recognition of successfully completing the J-1 exchange program in the United States.' },
    ],
    skills: ['Cultural Adaptability', 'International Exchange'],
  },
]

const education = [
  { year: '2026', school: 'UBT – University for Business and Technology', detail: 'Bachelor of Science in Audio Engineering · GPA 4.0 · Top Academic Honors', monogram: 'UBT' },
  { year: '2022', school: 'Kennedy-Lugar Youth Exchange and Study (YES) Program', detail: 'Amherst, NH, USA · Aug 2021 – May 2022 · Merit-based U.S. Department of State Scholar · City Representative · GPA 4.0', logo: cert('logo-yes') },
]

const RETURN_KEY = 'portfolio-return'

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [navFrosted, setNavFrosted] = useState(false)
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [certPreview, setCertPreview] = useState<{ images: CertImage[]; index: number } | null>(null)
  const [expandedCert, setExpandedCert] = useState<string | null>(null)
  const [projectOpen, setProjectOpen] = useState(false)
  const [backToTopOnDark, setBackToTopOnDark] = useState(false)
  const [navOnDark, setNavOnDark] = useState(false)
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

  const certSwipeStart = useRef<number | null>(null)
  const stepCert = (step: number) => setCertPreview((current) => current && { ...current, index: (current.index + step + current.images.length) % current.images.length })

  useEffect(() => {
    if (!certPreview) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCertPreview(null)
      if (event.key === 'ArrowRight') stepCert(1)
      if (event.key === 'ArrowLeft') stepCert(-1)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [certPreview])

  const leaveToCaseStudy = () => {
    origin.fromPortfolio = true
    sessionStorage.setItem(RETURN_KEY, JSON.stringify({ y: window.scrollY, open: projectOpen }))
  }

  useEffect(() => {
    const sections = ['top', 'about', 'experience', 'projects', 'contact']
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 4)

      setNavFrosted(window.scrollY > 4)

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

      <section id="top" className="hero-profile">
        <div className="hero-side">
          <figure className="hero-portrait">
            <img src={portraitUrl} alt="Portrait of Dorela Nuha in a white shirt" />
          </figure>
          <div className="hero-actions">
            <a className="button dark" href="#projects">View my work</a>
            <a className="button light" href="#contact">Get in touch <ArrowUpRight size={13} /></a>
          </div>
        </div>
        <div className="hero-profile-text">
          <p className="hero-eyebrow">Product · Operations · Strategy</p>
          <h1 className="hero-greeting">Hello,<br />I&apos;m Dorela</h1>
          <p className="hero-objective">{objective}</p>
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
            <div className="experience-company">
              <img className="experience-logo" src={`/companies/${item.id}.jpg`} alt="" />
              <div><h3>{item.role}</h3><p>{item.company}</p></div>
            </div>
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
      })}</div>
        <h2 className="section-label cert-label">Education</h2>
        <ul className="cert-list edu-list">
          {education.map((item) => (
            <li key={item.school}>
              <span>{item.year}</span>
              <div className="cert-body">
                {item.logo ? <img className="cert-logo" src={item.logo} alt="" /> : <span className="cert-logo edu-monogram" aria-hidden="true">{item.monogram}</span>}
                <div><h3>{item.school}</h3><p>{item.detail}</p></div>
              </div>
            </li>
          ))}
        </ul>
        <p className="edu-languages"><span>Languages</span>English (Bilingual/Native) · Albanian (Native)</p>
        <h2 className="section-label cert-label">Certifications</h2>
        <ul className="cert-list">
          {certifications.map((item) => {
            const isExpanded = expandedCert === item.title
            return (
              <li key={item.title} className={isExpanded ? 'is-expanded' : ''}>
                <span>{item.year}</span>
                <div className="cert-body">
                  <button type="button" className="cert-toggle" aria-expanded={isExpanded} aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${item.title}`} onClick={() => setExpandedCert(isExpanded ? null : item.title)}>
                    <ChevronDown size={17} />
                  </button>
                  <img className="cert-logo" src={item.logo} alt="" />
                  <div><h3>{item.title}</h3><p>{item.issuer} · {item.images.length ? `Issued ${item.issued}` : item.issued}</p></div>
                </div>
                <div className="cert-actions">
                  {item.images.length > 0 ? (
                    <button type="button" className="cert-view" onClick={() => setCertPreview({ images: item.images, index: 0 })}>
                      {item.images.length > 1 ? `View certificates (${item.images.length})` : 'View certificate'} <ArrowUpRight size={12} />
                    </button>
                  ) : item.course ? (
                    <a className="cert-view" href={item.course} target="_blank" rel="noreferrer">View course <ArrowUpRight size={12} /></a>
                  ) : null}
                </div>
                <div className="cert-details" aria-hidden={!isExpanded}>
                  <div className="cert-details-inner">
                    {item.details.map((detail) => (
                      <div className="cert-detail" key={detail.title}>
                        <h4>{detail.title}</h4>
                        <p>{detail.text}</p>
                      </div>
                    ))}
                    <div className="experience-meta-group">
                      <span className="experience-meta-label">Skills</span>
                      <div className="experience-pills">
                        {item.skills.map((skill) => <span className="experience-pill skill" key={skill}>{skill}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {certPreview && (
          <div
            className={`cert-lightbox${certPreview.images.length > 1 ? ' has-nav' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={certPreview.images[certPreview.index].alt}
            onClick={() => setCertPreview(null)}
            onTouchStart={(event) => { certSwipeStart.current = event.touches[0].clientX }}
            onTouchEnd={(event) => {
              if (certSwipeStart.current === null) return
              const distance = event.changedTouches[0].clientX - certSwipeStart.current
              certSwipeStart.current = null
              if (Math.abs(distance) > 40) stepCert(distance < 0 ? 1 : -1)
            }}
          >
            <button type="button" className="cert-lightbox-close" aria-label="Close"><X size={18} /></button>
            <img key={certPreview.images[certPreview.index].src} src={certPreview.images[certPreview.index].src} alt={certPreview.images[certPreview.index].alt} onClick={(event) => event.stopPropagation()} />
            {certPreview.images.length > 1 && (
              <>
                <button type="button" className="cert-lightbox-arrow is-prev" aria-label="Previous certificate" onClick={(event) => { event.stopPropagation(); stepCert(-1) }}><ChevronLeft size={22} /></button>
                <button type="button" className="cert-lightbox-arrow is-next" aria-label="Next certificate" onClick={(event) => { event.stopPropagation(); stepCert(1) }}><ChevronRight size={22} /></button>
                <div className="cert-lightbox-nav" onClick={(event) => event.stopPropagation()}>
                  <div className="cert-lightbox-pager">
                    {certPreview.images.map((image, index) => (
                      <button key={image.src} type="button" className={index === certPreview.index ? 'is-active' : ''} aria-label={`Show ${image.alt}`} onClick={() => setCertPreview({ ...certPreview, index })} />
                    ))}
                  </div>
                  <p aria-live="polite">{certPreview.index + 1} / {certPreview.images.length} · {certPreview.images[certPreview.index].alt}</p>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <section id="projects" className="white-section project-section">
        <div className={`project-card${projectOpen ? ' is-open' : ''}`}>
          <div className="project-mark">
            <Link href="/case-studies/neja" className="project-mark-surface is-app" aria-label="Open NEJA, the app I’m founding" onClick={leaveToCaseStudy}>
              <img className="project-mark-image" src="/neja/app/app-icon-1024.jpg" alt="The NEJA app icon, a magenta star mascot" />
              <div className="project-mark-content">
                <h2><img className="project-mark-logo" src="/neja/app/logo.svg" alt="NEJA" /></h2>
                <p>The app I’m founding for every event in Kosova, led from user research to launch: strategy and metrics, a design system shared by the app, site and Instagram, and an iOS and Android app in development.</p>
                <span className="project-mark-label">MY PRODUCT · LAUNCHING 2027</span>
              </div>
            </Link>
            <a className="project-mark-site" href="https://neja.app" target="_blank" rel="noreferrer">neja.app <ArrowUpRight size={12} /></a>
            <button type="button" className="project-mark-arrow" aria-expanded={projectOpen} aria-controls="project-info" aria-label={projectOpen ? 'Hide product details' : 'Show product details'} onClick={() => setProjectOpen((open) => !open)}><ArrowRight size={18} /></button>
          </div>
          <div id="project-info" className="project-info">
            <div className="project-info-inner">
              <h3>From Research to Launch, as Founder and Product Lead</h3>
              <div className="project-details">
                <div className="project-points">
                  {chapters.map((chapter, i) => (
                    <Link key={chapter.name} href={`/case-studies/neja#${chapter.ids[0]}`} onClick={leaveToCaseStudy}><span>{i + 1}</span>{chapter.name}<ArrowUpRight size={14} /></Link>
                  ))}
                </div>
                <div className="project-links">
                  <Link href="/case-studies/neja" className="text-link" onClick={leaveToCaseStudy}>Explore the product <ArrowRight size={14} /></Link>
                  <a href="https://neja.app" className="text-link" target="_blank" rel="noreferrer">Visit neja.app <ArrowUpRight size={14} /></a>
                </div>
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
              <a href="/Dorela-Nuha-Resume.pdf" download="Dorela-Nuha-Resume.pdf"><Download size={13} /> Resume</a>
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
