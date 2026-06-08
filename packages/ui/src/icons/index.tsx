export interface IconProps {
  className?: string
}

export interface RunnerIconProps extends IconProps {
  flip?: boolean
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

// ─── Search & Location ────────────────────────────────────────────────────────

export function SearchIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
    </svg>
  )
}

export function LocateIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  )
}

export function MapPinIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.16 7-11a7 7 0 10-14 0c0 4.84 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

// ─── UI Actions ───────────────────────────────────────────────────────────────

export function XIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ─── Content / Decorative ─────────────────────────────────────────────────────

export function QuoteIcon({ className = 'h-10 w-10' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

export function RunnerIcon({ className = '', flip = false }: RunnerIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <circle cx="14" cy="4" r="2" />
      <path d="M13.5 7.5c-.7 0-1.3.4-1.7 1L9.3 13l-3.1 1.2a1 1 0 0 0 .7 1.9l3.6-1.4c.4-.2.7-.5.9-.9l.5-1 1.6 1.7-1.7 4.6a1 1 0 0 0 1.9.7l1.9-5.1a1.2 1.2 0 0 0-.3-1.3l-1.8-1.8.6-2 .9 1.6c.2.3.5.5.9.6l2.4.5a1 1 0 0 0 .4-2l-2-.4-1.5-2.6a2 2 0 0 0-1.7-1z" />
    </svg>
  )
}

// ─── Scheduling / Medical ─────────────────────────────────────────────────────

export function CalendarIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  )
}

export function CirclePlusIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

export function ShieldCheckIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    </svg>
  )
}

export function CreditCardIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" d="M3 10h18" />
    </svg>
  )
}

// ─── Therapy Services ─────────────────────────────────────────────────────────

export function PhysicalTherapyIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="9" cy="5" r="1.6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l3-6 4 1 3-3M8 15l-1-4 5-1 3 3 3-1" />
    </svg>
  )
}

export function OccupationalTherapyIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V6a2 2 0 114 0v5M11 11V5a2 2 0 114 0v6M15 11V7a2 2 0 114 0v6a6 6 0 01-6 6h-1a6 6 0 01-6-6v-2a2 2 0 114 0" />
    </svg>
  )
}

export function SpeechTherapyIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v11H8l-4 4V5z" />
    </svg>
  )
}
