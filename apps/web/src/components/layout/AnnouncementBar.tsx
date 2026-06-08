import { topNav } from '../../data/navigation'
import Container from '../ui/Container'
import TopNavDropdown from './TopNavDropdown'
import { XIcon } from '@cora/ui'

interface AnnouncementBarProps {
  message?: string
  linkText?: string
  linkHref?: string
  onClose?: () => void
}

export default function AnnouncementBar({
  message = 'From new grads to seasoned pros, your next move starts here.',
  linkText = 'Explore CORA Careers',
  linkHref = '#careers',
  onClose,
}: AnnouncementBarProps) {
  return (
    <div className="bg-cora-navy text-white">
      <Container className="flex items-center justify-between gap-4 py-2.5 text-sm">
        <p className="text-center sm:text-left">
          {message}{' '}
          <a
            href={linkHref}
            className="font-semibold underline underline-offset-2 hover:text-cora-teal"
          >
            {linkText}
          </a>
        </p>

        {/* Utility links moved up to the top-right corner */}
        <nav aria-label="Utility navigation" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {topNav.map((item) => (
              <TopNavDropdown
                key={item.label}
                label={item.label}
                href={item.href}
                items={item.children}
                highlight={item.highlight}
              />
            ))}
          </ul>
        </nav>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 hover:bg-white/10"
            aria-label="Close announcement"
          >
            <XIcon />
          </button>
        )}
      </Container>
    </div>
  )
}
