import { useState } from 'react'
import { Link } from 'react-router-dom'
import { primaryNav, utilityNav } from '../../data/navigation'
import Button from '../ui/Button'
import Container from '../ui/Container'
import NavDropdown from './NavDropdown'

const PHONE = '1.866.443.2672'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3 lg:py-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <CoraLogo />
            <span className="hidden text-xl font-bold text-cora-navy sm:inline">
              CORA Physical Therapy
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${PHONE.replace(/\./g, '')}`}
              className="text-sm font-semibold text-cora-blue hover:underline"
            >
              {PHONE}
            </a>
            <Button variant="secondary" size="sm" href="/contact">
              Contact
            </Button>
          </div>

          <button
            type="button"
            className="rounded p-2 text-cora-navy lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      <nav
        className="hidden border-t border-gray-100 bg-white lg:block"
        aria-label="Main navigation"
      >
        <Container>
          <ul className="flex flex-wrap items-center">
            {primaryNav.map((item) => (
              <NavDropdown
                key={item.label}
                label={item.label}
                href={item.href}
                items={item.children}
              />
            ))}
            {utilityNav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`block px-3 py-4 text-sm font-medium transition-colors ${
                    item.highlight
                      ? 'text-cora-orange hover:text-orange-600'
                      : 'text-cora-navy hover:text-cora-blue'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {mobileOpen && (
        <MobileNav onClose={() => setMobileOpen(false)} />
      )}
    </header>
  )
}

function MobileNav({ onClose }) {
  return (
    <nav
      className="border-t border-gray-100 bg-white lg:hidden"
      aria-label="Mobile navigation"
    >
      <Container className="max-h-[70vh] overflow-y-auto py-4">
        <ul className="space-y-1">
          {[...primaryNav, ...utilityNav].map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                onClick={onClose}
                className="block rounded-md px-3 py-2.5 text-cora-navy hover:bg-cora-sky"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
          <a href={`tel:${PHONE.replace(/\./g, '')}`} className="block font-semibold text-cora-blue">
            {PHONE}
          </a>
          <Button variant="secondary" href="/contact" className="w-full">
            Contact
          </Button>
        </div>
      </Container>
    </nav>
  )
}

function CoraLogo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cora-blue text-lg font-bold text-white">
      C
    </div>
  )
}
