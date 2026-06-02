import { withErrorBoundary } from '../hocs/withErrorBoundary'
import PageLayout from '../components/layout/PageLayout'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'

const LEADERSHIP = [
  {
    name: 'Dr. Sarah Mitchell, PT, DPT',
    role: 'Chief Executive Officer',
    bio: 'Dr. Mitchell brings 20+ years of clinical and operational leadership to CORA, championing patient-centred care across all markets.',
  },
  {
    name: 'James Okafor, PT, MBA',
    role: 'Chief Clinical Officer',
    bio: 'James oversees clinical standards, therapist development, and evidence-based practice adoption across 250+ clinics.',
  },
  {
    name: 'Dr. Priya Venkatesh, OT, PhD',
    role: 'VP Occupational Therapy',
    bio: 'A leading voice in occupational rehabilitation research, Dr. Venkatesh leads CORA\'s OT programming and university partnerships.',
  },
  {
    name: 'Marcus Lee, CFO',
    role: 'Chief Financial Officer',
    bio: 'Marcus has guided CORA\'s fiscal strategy through rapid expansion, ensuring operational excellence while investing in patient outcomes.',
  },
]

const VALUES = [
  {
    icon: '❤️',
    title: 'Patient First',
    description: 'Every decision begins with the question: does this improve patient outcomes?',
  },
  {
    icon: '🔬',
    title: 'Evidence-Based',
    description: 'We practise the latest clinically-proven treatments, not trends.',
  },
  {
    icon: '🤝',
    title: 'Inclusive Care',
    description: 'We welcome every body, background, and ability with dignity and respect.',
  },
  {
    icon: '🌱',
    title: 'Continuous Growth',
    description: 'Our therapists pursue lifelong learning so patients always receive the best.',
  },
]

function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        title="About CORA Physical Therapy"
        subtitle="Built on a belief that everyone deserves access to exceptional, compassionate physical therapy — close to home."
      />

      {/* Mission */}
      <section className="py-16 lg:py-24" aria-labelledby="mission-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading id="mission-heading" eyebrow="Our Story" title="30 Years of Healing Communities" />
              <p className="mt-4 text-cora-gray">
                Founded in 1994, CORA Physical Therapy began with a single clinic and a single
                conviction: physical therapy changes lives. Today, with more than 250 clinics
                across the Southeast and Midwest, we carry that same mission into every
                patient interaction.
              </p>
              <p className="mt-4 text-cora-gray">
                We partner with leading physicians, hospitals, and health systems so that
                when a patient needs therapy, they get a seamless, coordinated experience
                — not a runaround.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-cora-sky p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { stat: '250+', label: 'Clinics' },
                  { stat: '30+', label: 'Years' },
                  { stat: '1M+', label: 'Patients Treated' },
                  { stat: '98%', label: 'Patient Satisfaction' },
                ].map(({ stat, label }) => (
                  <div key={label}>
                    <p className="text-4xl font-bold text-cora-blue">{stat}</p>
                    <p className="mt-1 text-sm font-medium text-cora-navy">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cora-sky py-16 lg:py-24" aria-labelledby="values-heading">
        <Container>
          <SectionHeading id="values-heading" eyebrow="What We Stand For" title="Mission &amp; Values" centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-4xl" role="img" aria-label={title}>
                  {icon}
                </span>
                <h3 className="mt-4 font-bold text-cora-navy">{title}</h3>
                <p className="mt-2 text-sm text-cora-gray">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24" aria-labelledby="leadership-heading">
        <Container>
          <SectionHeading id="leadership-heading" eyebrow="Meet the Team" title="Leadership Team" centered />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map(({ name, role, bio }) => (
              <div key={name} className="group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cora-blue text-2xl font-bold text-white">
                  {name.charAt(0)}
                </div>
                <h3 className="mt-4 font-bold text-cora-navy">{name}</h3>
                <p className="text-sm font-semibold text-cora-orange">{role}</p>
                <p className="mt-2 text-sm text-cora-gray">{bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

// withErrorBoundary HOC — wraps the page so runtime errors show a graceful fallback
export default withErrorBoundary(AboutPage)
