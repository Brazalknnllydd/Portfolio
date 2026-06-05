import {
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { GithubMark, LinkedinMark } from '../components/ui/social-icons'

export type NavItem = {
  id: string
  label: string
}

export type SkillItem = {
  name: string
  accent: 'slate' | 'gold' | 'violet' | 'blue'
}

export type ExperienceProject = {
  name: string
  bullets: string[]
}

export type ExperienceEntry = {
  title: string
  company: string
  period: string
  focus: string
  bullets: string[]
  projects: ExperienceProject[]
}

export type ProjectHighlight = {
  name: string
  description: string
}

export type ContactItem = {
  label: string
  value: string
  href?: string
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
}

export const siteMeta = {
  name: 'Ken Lloyd P. Brazal',
  role: 'Software Engineer',
  contactEmail: 'kenlloydbrazal@gmail.com',
  heroTitle: 'Hi, Welcome to my portfolio',
  heroDescription:
    "I'm Ken Lloyd P. Brazal, a software engineer who builds full-stack web and desktop applications with clean design, reliable functionality, and smart technology.",
  aboutHeading: 'Experience',
  contactHeading: 'My Contact',
  contactDescription:
    'Thank you for visiting my portfolio. If you have any inquiries, professional opportunities, or would like to discuss a project, please feel free to get in touch.',
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const skills: SkillItem[] = [
  { name: 'PostgreSQL', accent: 'slate' },
  { name: 'MySQL', accent: 'blue' },
  { name: 'PHP', accent: 'violet' },
  { name: 'Laravel', accent: 'slate' },
  { name: 'React', accent: 'blue' },
  { name: 'Java', accent: 'gold' },
  { name: 'Python', accent: 'blue' },
  { name: 'Hugging Face', accent: 'gold' },
  { name: 'C#', accent: 'violet' },
]

export const experienceEntries: ExperienceEntry[] = [
  {
    title: 'Software Engineer Intern',
    company: 'Sprobe Inc.',
    period: '2026',
    focus: 'Full-Stack Development',
    bullets: [
      'Worked closely with a project manager and engineers to deliver feature updates and support database validation.',
      'Contributed to ongoing development of core product pages, including client management and engineer directory features.',
    ],
    projects: [
      {
        name: 'OptiFlow - Billability Tracking Management Tool',
        bullets: [
          'Implemented an intelligent Gemini chatbot by integrating the Gemini API for automated user assistance.',
          'Built backend services with Laravel, PHP, and Python to process complex tracking data.',
          'Developed the frontend in React and managed application data through PostgreSQL.',
          'Supported feature execution across frontend, backend, and database layers in a collaborative delivery workflow.',
        ],
      },
    ],
  },
]

export const projectHighlights: ProjectHighlight[] = [
  {
    name: 'ReStyle - AI-Powered Wardrobe System (Academic Project)',
    description:
      'Developed with Laravel, PHP, MySQL, Tailwind, and React, integrating the Hugging Face API to support AI-inspired clothing recommendation logic, virtual wardrobe management, and more accurate outfit matching while contributing in the "Hipster" role focused on UI/UX design and feature structuring.',
  },
]

export const contactItems: ContactItem[] = [
  {
    label: 'Phone',
    value: '+63 976 108 3939',
    href: 'tel:+639761083939',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'kenlloydbrazal@gmail.com',
    href: 'mailto:kenlloydbrazal@gmail.com',
    icon: Mail,
  },
  {
    label: 'Location',
    value: 'Lapu-Lapu City, La Aldea Buena Mactan',
    icon: MapPin,
  },
  {
    label: 'GitHub',
    value: 'Github',
    href: 'https://github.com/Brazalknnllydd',
    icon: GithubMark,
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ken-lloyd-brazal-580026212/',
    icon: LinkedinMark,
  },
]

export const sectionMotion = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.65, ease: 'easeOut' as const },
}
