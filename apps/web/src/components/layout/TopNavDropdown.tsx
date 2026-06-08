import { useState } from 'react'
import type { NavChild } from '../../data/navigation'
import { ChevronDownIcon, ChevronRightIcon } from '@cora/ui'

interface TopNavDropdownProps {
  label: string
  href: string
  items?: NavChild[]
  highlight?: boolean
}

/**
 * A single top-bar (navy) nav item. Renders a plain link when it has no
 * children, or an attractive hover dropdown panel when `items` are provided.
 *
 * Styled for the dark navy AnnouncementBar.
 */
export default function TopNavDropdown({
  label,
  href,
  items = [],
  highlight = false,
}: TopNavDropdownProps) {
  const [open, setOpen] = useState(false)
  const hasMenu = items.length > 0

  const triggerClass = highlight
    ? 'text-cora-orange hover:text-orange-400'
    : 'text-white/90 hover:text-cora-teal'

  if (!hasMenu) {
    return (
      <li>
        <a href={href} className={`font-medium transition-colors ${triggerClass}`}>
          {label}
        </a>
      </li>
    )
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        className={`flex items-center gap-1 font-medium transition-colors ${triggerClass}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </a>

      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          {/* little pointer */}
          <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm bg-white shadow-sm" />
          <div className="w-64 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
            <div className="h-1 bg-gradient-to-r from-cora-blue via-cora-teal to-cora-orange" />
            <ul className="p-2">
              {items.map((item) => {
                const label = typeof item === 'string' ? item : item.label
                const itemHref = typeof item === 'string' ? '#' : item.href
                return (
                <li key={label}>
                  <a
                    href={itemHref}
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-cora-navy transition-colors hover:bg-cora-sky hover:text-cora-blue"
                  >
                    {label}
                    <ChevronRightIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}

