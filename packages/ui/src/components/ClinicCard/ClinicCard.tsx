import type { Clinic } from '../../types'
import { ChevronRightIcon } from '../../icons'

/**
 * Props for the `ClinicCard` component.
 */
export interface ClinicCardProps {
  /** Clinic data to display. */
  clinic: Clinic
}

/**
 * Location card for a single CORA clinic.
 *
 * Shows the city name, full address (each line is a link), and a prominent
 * click-to-call phone button.  A navy top-border accent bar identifies the
 * card as a CORA location.
 */
export default function ClinicCard({ clinic }: ClinicCardProps) {
  const tel = `tel:${clinic.phone.replace(/[^\d]/g, '')}`

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="h-2 bg-cora-navy" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-cora-navy">CORA {clinic.city}</h3>
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cora-sky text-xs font-bold text-cora-blue"
            aria-hidden="true"
          >
            C
          </span>
        </div>

        <address className="mt-3 not-italic">
          {clinic.address.map((line: string) => (
            <a
              key={line}
              href="#"
              className="block text-sm text-cora-blue underline underline-offset-2 hover:text-cora-navy"
            >
              {line}
            </a>
          ))}
        </address>

        <a
          href={tel}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-cora-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cora-blue"
        >
          {clinic.phone}
          <ChevronRightIcon className="h-4 w-4" />
        </a>
      </div>
    </article>
  )
}
