import { useState } from 'react'
import { testimonials } from '../../data/testimonials'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { QuoteIcon } from '@cora/ui'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <section className="bg-cora-light py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="Testimonials"
          subtitle="See what our patients are saying about us."
          className="mb-12"
        />

        <div className="mx-auto max-w-4xl">
          <blockquote className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <QuoteIcon className="mb-4 h-10 w-10 text-cora-teal opacity-60" />
            <p className="text-lg leading-relaxed text-cora-gray sm:text-xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="mt-6 font-semibold text-cora-navy">
              — {current.name}
            </footer>
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? 'w-8 bg-cora-blue' : 'w-2.5 bg-gray-300 hover:bg-cora-teal'
                }`}
                aria-label={`View testimonial from ${t.name}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
