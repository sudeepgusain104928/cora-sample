import { useState } from 'react'
import type React from 'react'
import type { ReactNode } from 'react'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import {
  Container,
  IconInput,
  OrDivider,
  Toggle,
  SearchIcon,
  MapPinIcon,
  LocateIcon,
  CreditCardIcon,
  PhysicalTherapyIcon,
  OccupationalTherapyIcon,
  SpeechTherapyIcon,
} from '@cora/ui'

const TEAM_IMAGE =
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=900'

const services = [
  { label: 'Physical Therapy', icon: PhysicalTherapyIcon },
  { label: 'Occupational Therapy', icon: OccupationalTherapyIcon },
  { label: 'Speech Therapy', icon: SpeechTherapyIcon },
]

export default function AppointmentPage() {
  const [seenDoctor, setSeenDoctor] = useState(true)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main id="main">
        <section className="relative overflow-hidden bg-cora-navy py-12 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute right-24 top-10 h-28 w-28 rounded-full bg-white/5" />
            <div className="absolute left-[44%] top-1/2 h-24 w-24 rounded-full bg-cora-teal/20" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rotate-45 rounded-3xl border border-white/5" />
            <div className="absolute right-10 top-1/3 h-80 w-80 rotate-45 rounded-3xl border border-white/5" />
          </div>

          <Container className="relative">
            <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Get On Our Books And Get On With Your Life.
            </h1>

            <div className="grid items-start gap-10 lg:grid-cols-2">
              <div className="rounded-2xl bg-cora-sky p-6 shadow-2xl sm:p-8">
                <h2 className="text-lg font-bold uppercase tracking-wide text-cora-navy">
                  New Patient? Schedule An Appointment Now.
                </h2>
                <p className="mt-2 text-sm text-cora-gray">
                  If you are a current CORA patient, please call your clinic to schedule your
                  complete plan of care.
                </p>

                <form onSubmit={handleSearch} className="mt-6 space-y-4">
                  <IconInput icon={<SearchIcon />} placeholder="Type of Therapy" aria-label="Type of Therapy" />
                  <IconInput
                    icon={<MapPinIcon />}
                    trailing={
                      <button type="button" aria-label="Use my location" className="text-cora-teal hover:text-cora-blue">
                        <LocateIcon />
                      </button>
                    }
                    placeholder="City, State or Zip Code"
                    aria-label="City, State or Zip Code"
                  />
                  <IconInput icon={<CreditCardIcon />} placeholder="Insurance Provider" aria-label="Insurance Provider" />

                  <Toggle
                    checked={seenDoctor}
                    onChange={setSeenDoctor}
                    label="Have you seen a doctor?"
                  />

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 px-6 py-3 font-semibold text-cora-navy transition-colors hover:bg-lime-600"
                  >
                    <SearchIcon />
                    Search Clinic Now
                  </button>

                  <OrDivider />

                  <p className="text-center text-sm text-cora-gray">
                    In case injury is due to an auto accident or a workers&apos; compensation claim,
                  </p>
                  <SecondaryButton>Connect With CORA Team</SecondaryButton>

                  <OrDivider />

                  <SecondaryButton>Book Telehealth Appointment</SecondaryButton>
                </form>
              </div>

              <div className="lg:pt-4">
                <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <img
                    src={TEAM_IMAGE}
                    alt="Care team ready to support your recovery"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <p className="mt-6 text-center text-base leading-relaxed text-white/90">
                  The sooner you make an appointment at a CORA Clinic near you, the sooner
                  you&apos;ll feel better. Let&apos;s do this!
                </p>

                <ul className="mt-6 flex items-start justify-center gap-8 sm:gap-12">
                  {services.map(({ label, icon: Icon }) => (
                    <li key={label} className="flex flex-col items-center gap-2 text-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white">
                        <Icon />
                      </span>
                      <span className="max-w-[6rem] text-xs font-semibold text-white">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

function SecondaryButton({ children }: { children?: ReactNode }) {
  return (
    <button
      type="button"
      className="w-full rounded-md border border-cora-blue bg-white px-6 py-3 font-semibold text-cora-blue transition-colors hover:bg-cora-sky"
    >
      {children}
    </button>
  )
}

