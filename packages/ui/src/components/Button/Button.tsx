import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

const variants = {
  primary: 'bg-cora-orange text-white hover:bg-orange-600 focus-visible:ring-cora-orange',
  secondary: 'bg-cora-blue text-white hover:bg-cora-navy focus-visible:ring-cora-blue',
  outline:
    'border-2 border-cora-blue text-cora-blue bg-transparent hover:bg-cora-sky focus-visible:ring-cora-blue',
  ghost: 'text-cora-navy hover:bg-cora-sky focus-visible:ring-cora-navy',
  white: 'bg-white text-cora-navy hover:bg-cora-sky focus-visible:ring-white',
} as const

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm font-semibold',
  lg: 'px-8 py-3 text-base font-semibold',
} as const

/** Visual style of the button. */
export type ButtonVariant = keyof typeof variants

/** Size preset controlling padding and font size. */
export type ButtonSize = keyof typeof sizes

/**
 * Props for the `Button` component.
 *
 * Accepts all native `<button>` and `<a>` attributes in addition to the
 * component-specific props listed below.
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children?: React.ReactNode
}

/**
 * Multi-purpose action component that renders either a `<button>` or an `<a>`
 * depending on whether `href` is supplied.
 *
 * Supports five visual variants and three size presets.  All native HTML
 * attributes are forwarded to the underlying element.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const cls = [
    'inline-flex items-center justify-center rounded-full transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={cls} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
