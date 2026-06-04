import type { UserRole } from '../../types'

/**
 * Props for the `Badge` component.
 */
export interface BadgeProps {
  /**
   * The user's role. Controls both the colour scheme and the label text.
   *
   * - `'admin'`  → orange — "Administrator"
   * - `'client'` → teal   — "Patient"
   */
  role: UserRole
}

/**
 * Role indicator pill that automatically selects an appropriate colour and
 * label based on the supplied `role`.  Intended for use in navigation headers
 * and dashboard welcome cards.
 */
export default function Badge({ role }: BadgeProps) {
  const isAdmin = role === 'admin'
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        isAdmin ? 'bg-cora-orange/10 text-cora-orange' : 'bg-cora-teal/10 text-cora-teal',
      ].join(' ')}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-cora-orange' : 'bg-cora-teal'}`}
        aria-hidden="true"
      />
      {isAdmin ? 'Administrator' : 'Patient'}
    </span>
  )
}
