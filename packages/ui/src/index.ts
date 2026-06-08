// ─── UI atoms & molecules ────────────────────────────────────────────────────
export { default as Badge, type BadgeProps } from './components/Badge'

export { default as Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button'

export { default as Card, type CardProps } from './components/Card'

export { default as CardGrid } from './components/CardGrid'

export { default as CategoryCard, type CategoryCardProps, type BodyAreaCategory } from './components/CategoryCard'

export { default as ClinicCard, type ClinicCardProps } from './components/ClinicCard'

export { default as Container, type ContainerProps } from './components/Container'

export { default as IconInput, type IconInputProps } from './components/IconInput'

export { default as ImageCarousel, type ImageCarouselProps, type CarouselImage } from './components/ImageCarousel'

export { default as Input, type InputProps } from './components/Input'

export { default as LeaderCard, type LeaderCardProps } from './components/LeaderCard'

export { default as OrDivider } from './components/OrDivider'

export { default as PageHero, type PageHeroProps } from './components/PageHero'

export { default as SectionHeading, type SectionHeadingProps } from './components/SectionHeading'

export { default as Select, type SelectProps, type SelectOption } from './components/Select'

export { default as ServiceCard, type ServiceCardProps, type Service, type ServiceCategory } from './components/ServiceCard'

export { default as Toggle, type ToggleProps } from './components/Toggle'

export { default as TriangleAccent, type TriangleAccentProps } from './components/TriangleAccent'

// ─── Dashboard components ─────────────────────────────────────────────────────
export { default as DashboardCard, type DashboardCardProps } from './components/DashboardCard'

export { default as DashboardLayout, type DashboardLayoutProps } from './components/DashboardLayout'

export { default as PortalCard, type PortalCardProps } from './components/PortalCard'

// ─── Icons ────────────────────────────────────────────────────────────────────
export {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SearchIcon,
  LocateIcon,
  MapPinIcon,
  XIcon,
  CheckIcon,
  QuoteIcon,
  RunnerIcon,
  CalendarIcon,
  CirclePlusIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PhysicalTherapyIcon,
  OccupationalTherapyIcon,
  SpeechTherapyIcon,
} from './icons'
export type { IconProps, RunnerIconProps } from './icons'

// ─── Shared types ─────────────────────────────────────────────────────────────
export type { Clinic, Leader, UserRole } from './types'
