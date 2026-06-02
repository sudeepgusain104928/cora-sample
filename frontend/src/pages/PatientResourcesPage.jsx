import { fetchAllSettled } from '../services/api/client'
import { useFetch } from '../hooks/useFetch'
import PageLayout from '../components/layout/PageLayout'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'

// Static resource data — no API needed for these
const RESOURCES = [
  {
    category: 'Getting Started',
    icon: '📋',
    items: [
      { title: 'What to Expect at Your First Visit', href: '#' },
      { title: 'Direct Patient Access (No Referral Needed)', href: '#' },
      { title: 'Insurance & Coverage FAQ', href: '#' },
      { title: 'How Physical Therapy Works', href: '#' },
    ],
  },
  {
    category: 'Patient Forms',
    icon: '📝',
    items: [
      { title: 'New Patient Intake Form', href: '#' },
      { title: 'Medical History Form', href: '#' },
      { title: 'Insurance Authorization', href: '#' },
      { title: 'HIPAA Consent Form', href: '#' },
    ],
  },
  {
    category: 'Pay Your Bill',
    icon: '💳',
    items: [
      { title: 'Pay Online', href: '#' },
      { title: 'Understand Your Statement', href: '#' },
      { title: 'Financial Assistance Options', href: '#' },
      { title: 'Contact Billing', href: '#' },
    ],
  },
  {
    category: 'Education & Blog',
    icon: '📚',
    items: [
      { title: 'Patient Education Articles', href: '#' },
      { title: 'Exercise Video Library', href: '#' },
      { title: 'CORA Health Blog', href: '#' },
      { title: 'Podcast: Move Better, Live Better', href: '#' },
    ],
  },
]

const FAQ = [
  {
    question: 'Do I need a doctor referral to see a physical therapist?',
    answer:
      'In most states where CORA operates, you can access physical therapy directly without a referral. Contact your nearest clinic to confirm the rules in your state.',
  },
  {
    question: 'How long is a typical PT session?',
    answer:
      'Initial evaluations are usually 45–60 minutes. Follow-up visits are typically 30–45 minutes. Your therapist will outline a personalised plan at your first visit.',
  },
  {
    question: 'Does CORA accept my insurance?',
    answer:
      'We accept most major insurance plans including Medicare, Medicaid, and many commercial plans. Call your clinic or use our online verification tool to confirm your coverage.',
  },
  {
    question: 'Can I do telehealth sessions?',
    answer:
      'Yes! CORA TeleHealth is available in select states. Ask your clinic about availability and how to schedule a video appointment.',
  },
]

/**
 * Demonstrates Promise.allSettled via useFetch:
 * we load multiple resource "bundles" in parallel; if one fails the page still renders.
 */
function usePageData() {
  return useFetch(
    () =>
      fetchAllSettled([
        // In a real app these would be separate endpoints; using resolved mocks here
        Promise.resolve(RESOURCES),
        Promise.resolve(FAQ),
      ]),
    [],
  )
}

export default function PatientResourcesPage() {
  const { status } = usePageData()
  // Data is static above so we just use the constants — this demonstrates the pattern
  const isLoading = status === 'loading'

  return (
    <PageLayout>
      <PageHero
        title="Patient Resources"
        subtitle="Everything you need before, during, and after your physical therapy journey."
        cta={{ label: 'Find a Clinic', href: '/locations' }}
      />

      {/* Resource grid */}
      <section className="py-16 lg:py-24" aria-labelledby="resources-heading">
        <Container>
          <SectionHeading id="resources-heading" eyebrow="Helpful Links" title="Resources for Every Step" centered />

          {isLoading ? (
            <div className="mt-12 grid animate-pulse gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading resources">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {RESOURCES.map(({ category, icon, items }) => (
                <div key={category} className="rounded-xl bg-cora-sky p-6">
                  <span className="text-3xl" role="img" aria-label={category}>
                    {icon}
                  </span>
                  <h3 className="mt-3 font-bold text-cora-navy">{category}</h3>
                  <ul className="mt-4 space-y-2">
                    {items.map(({ title, href }) => (
                      <li key={title}>
                        <a
                          href={href}
                          className="text-sm text-cora-blue underline-offset-2 hover:underline focus:outline-none focus:ring-1 focus:ring-cora-blue"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cora-sky py-16 lg:py-24" aria-labelledby="faq-heading">
        <Container>
          <SectionHeading id="faq-heading" eyebrow="Frequently Asked Questions" title="Patient FAQ" centered />
          <dl className="mx-auto mt-12 max-w-3xl space-y-6">
            {FAQ.map(({ question, answer }) => (
              <div key={question} className="rounded-xl bg-white p-6 shadow-sm">
                <dt className="font-bold text-cora-navy">{question}</dt>
                <dd className="mt-2 text-sm text-cora-gray">{answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </PageLayout>
  )
}
