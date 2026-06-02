import { useState, useCallback } from 'react'
import PageLayout from '../components/layout/PageLayout'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  message: '',
  reason: '',
}

const CONTACT_REASONS = [
  'Request an Appointment',
  'Insurance Question',
  'Billing Inquiry',
  'General Question',
  'Physician Referral',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  // useCallback so the handler reference is stable across renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setSubmitStatus('submitting')
      // Simulated submit — swap for a real API call in production
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmitStatus('success')
    },
    [],
  )

  return (
    <PageLayout>
      <PageHero
        title="Contact CORA Physical Therapy"
        subtitle="Whether you want to book an appointment, ask about insurance, or just say hello — we're here."
      />

      <section className="py-16 lg:py-24" aria-labelledby="contact-heading">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact form */}
            <div>
              <SectionHeading id="contact-heading" eyebrow="Send Us a Message" title="Get in Touch" />

              {submitStatus === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-8 rounded-xl bg-green-50 p-8 text-center"
                >
                  <p className="text-2xl">✅</p>
                  <p className="mt-3 font-bold text-green-800">Message sent!</p>
                  <p className="mt-1 text-sm text-green-700">
                    A team member will follow up within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitStatus('idle'); setForm(INITIAL_FORM) }}
                    className="mt-4 text-sm font-medium text-cora-blue underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-cora-blue"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-5"
                  onSubmit={handleSubmit}
                  aria-label="Contact form"
                  noValidate
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                    />
                    <Input
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                    />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                  />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />

                  {/* Reason select */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reason"
                      className="text-sm font-medium text-cora-navy"
                    >
                      Reason for Contact
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-cora-navy focus:outline-none focus:ring-2 focus:ring-cora-blue"
                      aria-label="Reason for contact"
                    >
                      <option value="">Select a reason…</option>
                      {CONTACT_REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-cora-navy"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-cora-navy focus:outline-none focus:ring-2 focus:ring-cora-blue"
                      aria-label="Your message"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={submitStatus === 'submitting'}
                    aria-label="Send message"
                  >
                    {submitStatus === 'submitting' ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <SectionHeading eyebrow="Reach Us Directly" title="Contact Information" />
                <dl className="mt-6 space-y-4">
                  {[
                    { term: 'Phone', detail: '1.866.443.2672', href: 'tel:18664432672' },
                    { term: 'Email', detail: 'info@coraphysicaltherapy.com', href: 'mailto:info@coraphysicaltherapy.com' },
                    { term: 'Executive Office', detail: '3745 Shawnee Rd. Ste 103, Lima, OH 45806', href: null },
                    { term: 'Business Hours', detail: 'Mon–Fri 8am–5pm ET', href: null },
                  ].map(({ term, detail, href }) => (
                    <div key={term} className="flex gap-4">
                      <dt className="w-36 shrink-0 font-semibold text-cora-navy">{term}</dt>
                      <dd className="text-cora-gray">
                        {href ? (
                          <a href={href} className="text-cora-blue hover:underline focus:outline-none focus:ring-1 focus:ring-cora-blue">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Map placeholder — real implementation would lazy-load Google Maps */}
              <div
                className="flex h-64 items-center justify-center rounded-xl bg-cora-sky"
                role="img"
                aria-label="Map placeholder — interactive map would load here"
              >
                <p className="text-center text-cora-gray">
                  🗺️
                  <br />
                  <span className="text-sm">Interactive map</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}
