import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { HEADER_NAV_ITEMS, ROUTES } from '@/constants/routes'

const NAV_ITEMS = HEADER_NAV_ITEMS

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useAppSelector((s) => s.auth)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive
        ? 'text-white border-b-2 border-cora-lime pb-0.5'
        : 'text-white/80 hover:text-white'
    }`

  return (
    <header className="bg-cora-navy" onKeyDown={handleKeyDown}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center" aria-label="Ank Cora Health home">
          <span className="text-xl font-bold text-white">CORA</span>
          <span className="ml-1 text-xl font-light text-white/80">Health</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}

          {token ? (
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="rounded-full bg-cora-orange px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to={ROUTES.LOGIN}
              className="rounded-full bg-cora-orange px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2"
            >
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-2 text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-white/10 bg-cora-navy px-4 pb-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-2 pt-4">
            {NAV_ITEMS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block rounded px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white'
                    }`
                  }
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              {token ? (
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    handleLogout()
                  }}
                  className="block w-full rounded-full bg-cora-orange px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Log out
                </button>
              ) : (
                <NavLink
                  to={ROUTES.LOGIN}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full bg-cora-orange px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export { Header }
