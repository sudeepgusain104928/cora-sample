import { Link } from 'react-router-dom'
import { footerLegal, footerQuickLinks, socialLinks } from '../../data/navigation'
import Button from '../ui/Button'
import Container from '../ui/Container'
import TriangleAccent from '../ui/TriangleAccent'

const PHONE = '1.866.443.2672'

export default function Footer() {
  return (
    <footer className="bg-cora-navy text-white">
      <TriangleAccent flip className="-mt-px [&_polygon]:fill-cora-navy" />

      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-cora-navy">
              C
            </div>
            <a
              href={`tel:${PHONE.replace(/\./g, '')}`}
              className="text-2xl font-bold text-white hover:text-cora-teal"
            >
              {PHONE}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" href="#appointment">
                Book An Appointment
              </Button>
              <Button variant="outline" href="#pay-bill" className="border-white text-white hover:bg-white/10">
                Pay My Bill
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-medium transition-colors hover:bg-cora-teal"
                  aria-label={social.label}
                >
                  {social.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-cora-teal">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-cora-teal">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLegal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-cora-teal">
                Executive Office
              </h3>
              <p className="text-sm text-white/80">
                3745 Shawnee Rd. Ste 103
                <br />
                Lima, OH 45806
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} CORA Health. All Rights Reserved.
        </p>
      </Container>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-gray-200 bg-white shadow-lg lg:hidden">
        <a
          href="#locations"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-cora-blue"
        >
          Find A Location
        </a>
        <a
          href="#appointment"
          className="flex flex-1 items-center justify-center gap-2 bg-cora-orange py-3 text-sm font-semibold text-white"
        >
          Request Appointment
        </a>
      </div>
    </footer>
  )
}
