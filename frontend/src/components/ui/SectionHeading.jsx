/**
 * Reusable section heading block.
 * Props:
 *  - id        → forwarded to the <h2> for aria-labelledby wiring
 *  - eyebrow   → small uppercase label above the heading
 *  - title     → heading text (or pass children instead)
 *  - subtitle  → longer description below the heading
 *  - centered  → shorthand for align="center" (default false)
 *  - align     → 'center' | 'left' (default 'center')
 *  - light     → white/teal colour variant for dark backgrounds
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  subtitle,
  centered = false,
  align = centered ? 'center' : 'left',
  light = false,
  className = '',
}) {
  const headingText = title ?? children
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-wider ${light ? 'text-cora-teal' : 'text-cora-blue'}`}
        >
          {eyebrow}
        </p>
      )}
      {headingText && (
        <h2
          id={id}
          className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-cora-navy'}`}
        >
          {headingText}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/90' : 'text-cora-gray'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
