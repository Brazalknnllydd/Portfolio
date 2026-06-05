import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { toast } from 'sonner'
import heroArtwork from '../assets/1-8r e.jpg'
import heroArtworkHover from '../assets/1-11r.jpg'
import { Button } from '../components/ui/button'
import { Toaster } from '../components/ui/sonner'
import { ThemeToggle, type Theme } from '../components/ui/theme-toggle'
import { TypewriterText } from '../components/ui/typewriter-text'
import {
  contactItems,
  experienceEntries,
  navItems,
  projectHighlights,
  sectionMotion,
  siteMeta,
  skills,
} from '../content/portfolioContent'

export function PortfolioApp() {
  const prefersReducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [showAltPortrait, setShowAltPortrait] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    subject: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState<{
    type: 'idle' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const successToastStyle = {
    background: '#052e16',
    border: '1px solid #10b981',
    color: '#d1fae5',
  }
  const errorToastStyle = {
    background: '#450a0a',
    border: '1px solid #ef4444',
    color: '#fee2e2',
  }

  const heroImageMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: 'easeOut' as const },
      }
    : {
        initial: { opacity: 0, y: 18 },
        animate: {
          opacity: 1,
          y: 0,
        },
        transition: {
          type: 'spring' as const,
          stiffness: 130,
          damping: 20,
          mass: 0.9,
        },
      }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-18% 0px -45% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    const updateTouchMode = () => setIsTouchDevice(mediaQuery.matches)

    updateTouchMode()
    mediaQuery.addEventListener('change', updateTouchMode)

    return () => mediaQuery.removeEventListener('change', updateTouchMode)
  }, [])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
      return
    }

    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!contactModalOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSendingMessage) {
        setContactModalOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [contactModalOpen, isSendingMessage])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (!section) {
      return
    }

    section.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    setActiveSection(sectionId)
    setMenuOpen(false)
  }

  const mobileMenu = (
    <motion.div
      key="mobile-menu"
      id="mobile-navigation"
      className="mobile-menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`mobile-menu__link ${activeSection === item.id ? 'is-active' : ''}`}
          onClick={() => scrollToSection(item.id)}
        >
          {item.label}
        </button>
      ))}
    </motion.div>
  )

  const handlePortraitToggle = () => {
    if (!isTouchDevice) {
      return
    }

    setShowAltPortrait((current) => !current)
  }

  const handlePortraitMouseEnter = () => {
    if (isTouchDevice) {
      return
    }

    setShowAltPortrait(true)
  }

  const handlePortraitMouseLeave = () => {
    if (isTouchDevice) {
      return
    }

    setShowAltPortrait(false)
  }

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const openContactModal = () => {
    setContactStatus({ type: 'idle', message: '' })
    setContactModalOpen(true)
  }

  const closeContactModal = () => {
    if (isSendingMessage) {
      return
    }

    setContactModalOpen(false)
  }

  const handleContactFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendContactMessage()
  }

  const sendContactMessage = async () => {
    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      toast.error('EmailJS is not configured yet.', {
        description: 'Add your EmailJS service ID, template ID, and public key in Vite env variables.',
        style: errorToastStyle,
      })
      setContactStatus({
        type: 'error',
        message:
          'EmailJS is not configured yet. Add your EmailJS service ID, template ID, and public key in Vite env variables.',
      })
      return
    }

    setIsSendingMessage(true)
    setContactStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            from_name: contactForm.name.trim(),
            subject: contactForm.subject.trim(),
            message: contactForm.message.trim(),
            reply_to: siteMeta.contactEmail,
            to_email: siteMeta.contactEmail,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      setContactStatus({ type: 'idle', message: '' })
      toast.success('Message sent successfully.', {
        style: successToastStyle,
      })
      setContactForm({
        name: '',
        subject: '',
        message: '',
      })
      setContactModalOpen(false)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown EmailJS error'

      toast.error('Sending failed.', {
        description: errorMessage,
        style: errorToastStyle,
      })
      setContactStatus({
        type: 'error',
        message: `Sending failed. ${errorMessage}`,
      })
    } finally {
      setIsSendingMessage(false)
    }
  }

  return (
    <div className="portfolio-app">
      <header className="site-header">
        <div className="site-header__inner">
          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`site-nav__link ${activeSection === item.id ? 'is-active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="site-header__actions">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>{menuOpen ? mobileMenu : null}</AnimatePresence>
      </header>

      <main>
        <section className="page-section hero-section" id="home">
          <div className="section-shell hero-grid">
            <motion.div
              className="hero-media"
              data-show-alt={showAltPortrait ? 'true' : 'false'}
              {...sectionMotion}
            >
              <div className="hero-media__backdrop" />
              <motion.div className="hero-media__frame" {...heroImageMotion}>
                <button
                  type="button"
                  className={`hero-media__portrait ${isTouchDevice ? 'is-touch' : ''}`}
                  onClick={handlePortraitToggle}
                  onMouseEnter={handlePortraitMouseEnter}
                  onMouseLeave={handlePortraitMouseLeave}
                  aria-label={
                    isTouchDevice
                      ? 'Tap to switch portrait image'
                      : 'Portrait image'
                  }
                >
                  <img
                    src={showAltPortrait ? heroArtworkHover : heroArtwork}
                    alt="Portrait of Ken Lloyd P. Brazal"
                    className="hero-media__image"
                  />
                </button>
              </motion.div>
              <div className="hero-media__glow" />
            </motion.div>

            <motion.div className="hero-copy" {...sectionMotion}>
              <span className="section-kicker">{siteMeta.role}</span>
              <div className="hero-heading">
                <h1>
                  <TypewriterText text={siteMeta.heroTitle} />
                </h1>
              </div>
              <p className="hero-copy__lead">{siteMeta.heroDescription}</p>
            </motion.div>
          </div>
        </section>

        <motion.section className="page-section about-section" id="about" {...sectionMotion}>
          <div className="section-shell">
            <div className="about-grid">
              <div className="about-heading">
                <h2>{siteMeta.aboutHeading}</h2>
                <span className="section-rule" />
                <p className="about-heading__lead">
                  Full-stack experience across web applications, backend services, data-driven
                  systems, and AI-assisted product features.
                </p>
                <div className="about-skill-list" aria-label="Technology stack">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`about-skill about-skill--${skill.accent}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="about-body">
                <div className="experience-timeline">
                  {experienceEntries.map((entry) => (
                    <article key={`${entry.company}-${entry.title}`} className="experience-entry">
                      <div className="experience-entry__marker" aria-hidden="true" />
                      <div className="experience-entry__content">
                        <div className="experience-entry__header">
                          <h3>{entry.title}</h3>
                          <p>
                            {entry.company} • {entry.period}
                          </p>
                          <span>{entry.focus}</span>
                        </div>

                        <ul className="experience-entry__bullets">
                          {entry.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>

                        <div className="experience-projects">
                          {entry.projects.map((project) => (
                            <section key={project.name} className="experience-project">
                              <h4>{project.name}</h4>
                              <ul>
                                {project.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            </section>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <article className="experience-secondary">
                  <div className="experience-secondary__marker" aria-hidden="true" />
                  <div className="experience-secondary__content">
                    <h3>Technical Project</h3>
                    <div className="project-highlight-list">
                      {projectHighlights.map((project) => (
                        <section key={project.name} className="project-highlight">
                          <h4>{project.name}</h4>
                          <p>{project.description}</p>
                        </section>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="page-section contact-section" id="contact" {...sectionMotion}>
          <div className="section-shell contact-grid">
            <div className="contact-copy">
              <h2>{siteMeta.contactHeading}</h2>
              <span className="section-rule" />
              <p>{siteMeta.contactDescription}</p>

              <div className="contact-actions">
                <Button
                  type="button"
                  variant="ghost"
                  className="contact-cta"
                  onClick={openContactModal}
                >
                  <span>Connect Now</span>
                  <ArrowUpRight size={18} />
                </Button>
              </div>

              <div className="contact-list">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <>
                      <span className="contact-item__icon">
                        <Icon width={18} height={18} />
                      </span>
                      <span className="contact-item__text">{item.value}</span>
                    </>
                  )

                  return item.href ? (
                    <a
                      key={item.label}
                      className={`contact-item ${
                        item.label === 'GitHub' || item.label === 'LinkedIn'
                          ? 'contact-item--social'
                          : ''
                      }`}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className="contact-item">
                      {content}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {contactModalOpen ? (
          <motion.div
            className="contact-modal-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="contact-modal__backdrop"
              aria-label="Close contact form"
              onClick={closeContactModal}
            />

            <motion.div
              className="contact-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              aria-describedby="contact-modal-description"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
              style={{
                background:
                  'linear-gradient(180deg, var(--color-menu-bg-start), var(--color-menu-bg-end))',
              }}
            >
              <div className="contact-modal__header">
                <div>
                  <p className="contact-modal__eyebrow">Direct Message</p>
                  <h3 id="contact-modal-title">Connect With Me</h3>
                  <p
                    id="contact-modal-description"
                    className="contact-modal__description"
                  >
                    Send a direct message about opportunities, collaborations, or project work.
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="contact-modal__close"
                  aria-label="Close contact form"
                  disabled={isSendingMessage}
                  onClick={closeContactModal}
                >
                  <X size={18} />
                </Button>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <label className="contact-form__field">
                  <span>Name</span>
                  <input
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFieldChange}
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="contact-form__field">
                  <span>Subject</span>
                  <input
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFieldChange}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </label>

                <label className="contact-form__field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFieldChange}
                    placeholder="Write your message here"
                    rows={6}
                    required
                  />
                </label>

                <div className="contact-form__actions">
                  <Button
                    type="button"
                    variant="ghost"
                    className="contact-form__secondary"
                    disabled={isSendingMessage}
                    onClick={closeContactModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="contact-form__primary"
                    disabled={isSendingMessage}
                  >
                    {isSendingMessage ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>

                {contactStatus.type !== 'idle' ? (
                  <p className={`contact-form__status contact-form__status--${contactStatus.type}`}>
                    {contactStatus.message}
                  </p>
                ) : null}
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Toaster theme={theme} />
    </div>
  )
}
