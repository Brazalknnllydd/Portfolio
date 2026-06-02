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
  aboutHeading: 'About Me',
  contactHeading: 'My Contact',
  contactDescription:
    'Thank you for visiting my portfolio. If you have any inquiries, professional opportunities, or would like to discuss a project, please feel free to get in touch.',
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
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

export const aboutParagraphs = [
  'I am a Software Developer with hands-on experience in building full-stack web applications, desktop systems, and database-driven solutions. My technical background includes React, Laravel, PHP, C#, WinForms, PostgreSQL, MySQL, Python, and API integration, with practical experience in designing interfaces, structuring databases, developing backend services, and implementing AI-powered features using Gemini API and Hugging Face API.',
  'At Sprobe Inc, I worked as a Software Engineer Intern on OptiFlow, a billability tracking management tool where I contributed to frontend development, backend services, database validation, and intelligent chatbot integration.',
  'I also worked on ReStyle, our college capstone project, an AI-powered wardrobe and clothing recommendation web system that helps users organize their wardrobe and receive personalized outfit suggestions. This project strengthened my experience in full-stack development, database design, AI-based recommendation logic, and building practical features focused on user needs.',
  'I approach development with a strong focus on clean implementation, practical problem-solving, and continuous improvement. I enjoy building reliable, user-centered software solutions and collaborating with teams to turn ideas into functional systems.',
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
