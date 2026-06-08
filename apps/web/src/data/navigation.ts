import { treatMenu } from './conditions'
import { createConditionRoute, ROUTES } from '@/constants/routes'

export interface NavLink {
  label: string
  href: string
  highlight?: boolean
}

// A dropdown child is either a plain label (href defaults to '#') or a full link.
export type NavChild = string | NavLink

export interface NavItem {
  label: string
  href: string
  highlight?: boolean
  children?: NavChild[]
}

export const primaryNav: NavItem[] = [
  {
    label: 'What We Treat',
    href: '#treat',
    // Built from the conditions data so menu + routing stay in sync.
    children: treatMenu.map((t) => ({ label: t.label, href: createConditionRoute(t.slug) })),
  },
  {
    label: 'How We Can Help',
    href: '#help',
    children: [
      'Physical Therapy',
      'Occupational Therapy',
      'Pelvic Health',
      'Sports Performance',
      'TeleHealth',
      'Manual Therapy',
      'Dry Needling',
      'Vestibular Rehabilitation',
    ],
  },
  {
    label: 'Patients',
    href: '#patients',
    children: [
      'What To Expect',
      'Direct Patient Access',
      'Patient Forms',
      'Share Your Story',
      'Pay Bill',
    ],
  },
]

// Shown in the navy top bar (top-right corner).
export const topNav: NavItem[] = [
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'Leadership Team', href: '/leadership' },
      'Mission + Values',
      'Experience the Difference',
      'Physicians',
      'Partnerships',
      "MSA's",
      'Acquisition Opportunities',
    ],
  },
  {
    label: 'Resources',
    href: '#resources',
    children: ['Blogs', 'News', 'Podcast', 'Orthopaedic Residency'],
  },
  {
    label: 'Careers',
    href: '#careers',
    children: [
      'Search Careers',
      'Build a Flexible Work Schedule',
      'Community Referral Program',
      'Student Services',
    ],
  },
  { label: 'Locations', href: '/locations' },
  { label: 'Pay Bill', href: '#pay-bill' },
  { label: 'Apply Now', href: ROUTES.LOGIN, highlight: true },
]

export const footerQuickLinks: NavLink[] = [
  { label: 'Contact Us', href: '#' },
  { label: 'Physicians', href: '#' },
  { label: 'Telehealth', href: '#' },
  { label: 'Patients', href: '#' },
  { label: 'Patient Forms', href: '#' },
  { label: 'Careers', href: '#careers' },
  { label: 'Partners', href: '#' },
  { label: 'Student Resources', href: '#' },
]

export const footerLegal: NavLink[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'HIPAA Notice', href: '#' },
  { label: 'Opt-Out Policy', href: '#' },
]

export const socialLinks: NavLink[] = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
]
