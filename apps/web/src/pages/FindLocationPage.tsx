import { Suspense, lazy, useMemo, useState } from 'react'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { ClinicCard, Container, SearchIcon, LocateIcon, ChevronRightIcon } from '@cora/ui'
import { clinics, locationStates } from '@/data/locations'

const ClinicMap = lazy(() => import('@/components/ui/ClinicMap'))

export default function FindLocationPage() {
  const [activeState, setActiveState] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const visibleClinics = useMemo(() => {
    return clinics.filter((c) => {
      const matchesState = !activeState || c.state === activeState
      const matchesQuery =
        !query ||
        `${c.city} ${c.state} ${c.address.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return matchesState && matchesQuery
    })
  }, [activeState, query])

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main id="main">
        <section className="relative overflow-hidden bg-white py-12 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 -z-0 h-64 w-64 -translate-x-1/2 rotate-45 rounded-3xl border border-cora-sky"
          />
          <Container className="relative text-center">
            <h1 className="text-3xl font-bold tracking-tight text-cora-navy sm:text-4xl">
              Find a CORA Physical Therapy Near You
            </h1>
            <p className="mt-3 text-lg font-semibold text-cora-navy">
              With 250+ clinics across 10 states, quality care is always nearby.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cora-gray">
              Our scheduling is rapid and our commitment to same-day treatment is unwavering.
              We&apos;re flexible because we know our patients&apos; schedules often are not. And
              we&apos;re always available. Any questions? Just ask!
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setActiveState(null)}
                className="inline-flex items-center gap-2 text-sm font-medium text-cora-blue hover:text-cora-navy"
              >
                <LocateIcon />
                Use my location
              </button>

              <div className="relative w-full max-w-sm">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter location"
                  aria-label="Enter location"
                  className="w-full rounded-md border-b-2 border-lime-500 bg-cora-light px-4 py-2.5 pr-10 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
              </div>

              <button
                type="button"
                onClick={() => { setActiveState(null); setQuery('') }}
                className="inline-flex items-center gap-1 text-sm font-medium text-cora-blue hover:text-cora-navy"
              >
                View All Locations
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </Container>
        </section>

        <section aria-label="Clinic map">
          <Suspense
            fallback={
              <div
                className="h-[320px] w-full animate-pulse bg-cora-sky/30 sm:h-[420px]"
                role="status"
                aria-label="Loading map"
              />
            }
          >
            <ClinicMap clinics={visibleClinics} highlight={Boolean(activeState || query)} />
          </Suspense>
        </section>

        <section className="py-12 lg:py-16">
          <Container className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside>
              <h2 className="text-2xl font-bold text-cora-navy">Filter Locations</h2>
              <ul className="mt-5 space-y-2">
                {locationStates.map((state) => {
                  const isActive = state === activeState
                  return (
                    <li key={state}>
                      <button
                        type="button"
                        onClick={() => setActiveState(isActive ? null : state)}
                        className={`flex w-full items-center gap-2 text-left text-sm transition-colors ${
                          isActive ? 'font-semibold text-cora-orange' : 'text-cora-blue hover:text-cora-navy'
                        }`}
                      >
                        <span className="text-cora-orange">›</span>
                        {state}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </aside>

            <div>
              <p className="mb-4 text-sm text-cora-gray">
                Showing <span className="font-semibold text-cora-navy">{visibleClinics.length}</span>{' '}
                {visibleClinics.length === 1 ? 'clinic' : 'clinics'}
                {activeState ? ` in ${activeState}` : ''}
              </p>

              {visibleClinics.length === 0 ? (
                <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-cora-gray">
                  No clinics match your search.
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleClinics.map((clinic) => (
                    <ClinicCard key={`${clinic.city}-${clinic.phone}`} clinic={clinic} />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
