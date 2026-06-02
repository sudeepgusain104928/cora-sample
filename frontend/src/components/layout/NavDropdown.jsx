import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavDropdown({ label, href, items = [] }) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={href}
        className="flex items-center gap-1 px-3 py-4 text-sm font-medium text-cora-navy transition-colors hover:text-cora-blue"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronIcon open={open} />
      </Link>
      {items.length > 0 && open && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-md border border-gray-100 bg-white py-2 shadow-xl">
          <ul>
            {items.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-cora-sky hover:text-cora-blue"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
