import { useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchServicesRequest,
  selectServices,
  selectServicesStatus,
  selectServicesError,
} from '../store/slices/servicesSlice'

function ServiceCard({ service }) {
  return (
    <article
      className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      aria-label={service.name}
    >
      <span className="text-4xl" role="img" aria-label={service.name}>
        {service.icon}
      </span>
      <h3 className="mt-4 text-lg font-bold text-cora-navy">{service.name}</h3>
      <p className="mt-2 grow text-sm text-cora-gray">{service.description}</p>
      <ul className="mt-4 space-y-1" aria-label="Conditions treated">
        {service.conditions.map((c) => (
          <li key={c} className="flex items-center gap-2 text-sm text-cora-gray">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cora-blue" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
      <a
        href={`/services/${service.slug}`}
        className="mt-6 inline-block rounded-full border border-cora-blue px-5 py-2 text-sm font-semibold text-cora-blue transition-colors hover:bg-cora-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-cora-blue"
      >
        Learn More
      </a>
    </article>
  )
}

export default function ServicesPage() {
  const dispatch = useAppDispatch()
  const services = useAppSelector(selectServices)
  const status = useAppSelector(selectServicesStatus)
  const error = useAppSelector(selectServicesError)

  // Only fetch when idle — avoids overwriting pre-loaded or already-fetched state
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchServicesRequest())
    }
  }, [dispatch, status])

  return (
    <PageLayout>
      <PageHero
        title="Our Services"
        subtitle="Expert, evidence-based physical therapy tailored to your needs — from post-surgical rehab to sports performance."
        cta={{ label: 'Find a Location', href: '/locations' }}
      />

      <section className="py-16 lg:py-24" aria-labelledby="services-heading">
        <Container>
          <SectionHeading id="services-heading" eyebrow="What We Offer" title="Comprehensive Physical Therapy Services" centered />

          {status === 'idle' || status === 'loading' ? (
            // Inline skeleton — separate from the full-page one so only this section pulses
            <div className="mt-12 grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading services">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : status === 'failed' ? (
            <p role="alert" className="mt-12 text-center text-red-600">
              {error ?? 'Failed to load services. Please try again.'}
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA band */}
      <section className="bg-cora-navy py-16 text-white" aria-labelledby="services-cta">
        <Container className="text-center">
          <h2 id="services-cta" className="text-3xl font-bold">
            Ready to start your recovery?
          </h2>
          <p className="mt-4 text-white/80">
            Most insurance plans accepted. No referral needed in most states.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cora-orange px-10 py-3 font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-cora-orange focus:ring-offset-2 focus:ring-offset-cora-navy"
          >
            Request an Appointment
          </a>
        </Container>
      </section>
    </PageLayout>
  )
}
