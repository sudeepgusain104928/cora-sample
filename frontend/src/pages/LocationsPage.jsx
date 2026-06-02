import { useEffect, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Input from '../components/ui/Input'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchLocationsRequest,
  selectLocationsData,
  selectLocationsStatus,
  selectLocationsError,
} from '../store/slices/locationsDataSlice'
import { useDebounce } from '../hooks/useDebounce'

function LocationCard({ location }) {
  return (
    <article
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      aria-label={location.name}
    >
      <h3 className="font-bold text-cora-navy">{location.name}</h3>
      <address className="mt-2 not-italic text-sm text-cora-gray">
        {location.address}, {location.city}, {location.state} {location.zip}
      </address>
      <p className="mt-1 text-sm text-cora-gray">
        <span className="font-medium">Phone:</span>{' '}
        <a
          href={`tel:${location.phone}`}
          className="text-cora-blue hover:underline focus:outline-none focus:ring-1 focus:ring-cora-blue"
        >
          {location.phone}
        </a>
      </p>
      <p className="mt-1 text-sm text-cora-gray">
        <span className="font-medium">Hours:</span> {location.hours}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Services available">
        {location.services.map((s) => (
          <li
            key={s}
            className="rounded-full bg-cora-sky px-3 py-0.5 text-xs font-medium text-cora-navy"
          >
            {s}
          </li>
        ))}
      </ul>
      <a
        href={`/contact?location=${location.id}`}
        className="mt-4 inline-block rounded-full bg-cora-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-cora-blue"
      >
        Book Appointment
      </a>
    </article>
  )
}

export default function LocationsPage() {
  const dispatch = useAppDispatch()
  const locations = useAppSelector(selectLocationsData)
  const status = useAppSelector(selectLocationsStatus)
  const error = useAppSelector(selectLocationsError)

  const [query, setQuery] = useState('')
  // useDebounce prevents filtering on every keystroke
  const debouncedQuery = useDebounce(query, 250)

  // Only fetch when idle — avoids overwriting pre-loaded or already-fetched state
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocationsRequest())
    }
  }, [dispatch, status])

  const filtered = debouncedQuery
    ? locations.filter(
        (loc) =>
          loc.city.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          loc.state.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          loc.zip.includes(debouncedQuery),
      )
    : locations

  return (
    <PageLayout>
      <PageHero
        title="Find a CORA Clinic Near You"
        subtitle="With 250+ locations across Florida, Georgia, and beyond — expert therapy is always close to home."
      />

      <section className="py-16 lg:py-24" aria-labelledby="locations-heading">
        <Container>
          <SectionHeading id="locations-heading" eyebrow="Our Clinics" title="CORA Physical Therapy Locations" centered />

          {/* Search input */}
          <div className="mx-auto mt-8 max-w-md">
            <Input
              id="location-search"
              label="Search by city, state, or ZIP"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Orlando, FL, 32801"
            />
          </div>

          {status === 'idle' || status === 'loading' ? (
            <div className="mt-12 grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading locations">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-56 rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : status === 'failed' ? (
            <p role="alert" className="mt-12 text-center text-red-600">
              {error ?? 'Failed to load locations. Please try again.'}
            </p>
          ) : filtered.length === 0 ? (
            <p className="mt-12 text-center text-cora-gray">
              No locations match &quot;{debouncedQuery}&quot;. Try a different city or ZIP.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </PageLayout>
  )
}
