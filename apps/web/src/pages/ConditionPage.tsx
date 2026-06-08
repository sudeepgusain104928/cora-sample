import React from 'react'
import { useParams } from 'react-router-dom'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { getCondition } from '../data/conditions'
import type { Condition } from '../data/conditions'
import {
  CheckIcon,
  RunnerIcon,
  CalendarIcon,
  CirclePlusIcon,
  ShieldCheckIcon,
} from '@cora/ui'
import type { IconProps } from '@cora/ui'

export default function ConditionPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const condition = getCondition(slug)

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      {condition ? <ConditionContent condition={condition} /> : <NotFound slug={slug} />}
      <Footer />
    </div>
  )
}

function ConditionContent({ condition }: { condition: Condition }) {
  const {
    name,
    heroImage,
    title,
    intro,
    subheading,
    body,
    symptoms,
    conditionsTreated,
    treatments,
  } = condition

  return (
    <main id="main">
      {/* ---- Hero banner ---- */}
      <section className="bg-gradient-to-b from-cora-sky/60 to-white pt-8 lg:pt-12">
        <Container>
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={`${heroImage}&w=960`}
              srcSet={`${heroImage}&w=480 480w, ${heroImage}&w=960 960w, ${heroImage}&w=1400 1400w`}
              sizes="(min-width: 1024px) calc(100vw - 4rem), 100vw"
              alt={`${name} physical therapy`}
              width={960}
              height={384}
              className="h-56 w-full object-cover sm:h-72 lg:h-96"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cora-navy/40 to-transparent" />
          </div>
        </Container>
      </section>

      {/* ---- Intro + symptoms ---- */}
      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          {/* left: narrative */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-cora-navy sm:text-4xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cora-gray">{intro}</p>

            <MovementIcons />

            <h2 className="mt-10 text-2xl font-bold tracking-tight text-cora-navy">
              {subheading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cora-gray">{body}</p>
          </div>

          {/* right: symptoms card */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-cora-sky bg-cora-light p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="border-l-4 border-cora-teal pl-3 text-lg font-bold text-cora-blue">
                {name} Symptoms
              </h3>
              <ul className="mt-4 space-y-2.5">
                {symptoms.map((symptom) => (
                  <li key={symptom} className="flex gap-2.5 text-sm text-cora-navy">
                    <Dot />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                href="#appointment"
                className="mt-6 w-full gap-2"
              >
                <CheckIcon />
                Schedule a Free Screening
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {/* ---- Conditions + treatments split band ---- */}
      <section className="relative">
        {/* full-bleed split background on large screens */}
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
          <div className="grid h-full grid-cols-2">
            <div className="bg-cora-teal" />
            <div className="bg-cora-blue" />
          </div>
        </div>

        <Container className="relative grid gap-px lg:grid-cols-2">
          <ListBlock
            className="bg-cora-teal p-8 lg:bg-transparent lg:pr-12"
            heading={`${name} Conditions CORA Treats:`}
            items={conditionsTreated}
          />
          <ListBlock
            className="bg-cora-blue p-8 lg:bg-transparent lg:pl-12"
            heading={`Treatments CORA Offers for ${name}`}
            items={treatments}
          />
        </Container>
      </section>

      {/* ---- Bottom CTA cards ---- */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {ctaCards.map((card) => (
              <CtaCard key={card.title} {...card} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}

function ListBlock({
  heading,
  items,
  className = '',
}: {
  heading: string
  items: string[]
  className?: string
}) {
  return (
    <div className={className}>
      <h2 className="text-lg font-bold text-white">{heading}</h2>
      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-white/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ctaCards = [
  {
    title: 'Schedule an\nAppointment',
    subtitle: '',
    href: '#appointment',
    icon: CalendarIcon,
  },
  {
    title: 'No Referral?',
    subtitle: 'No Worries. Start therapy now.',
    href: '#appointment',
    icon: CirclePlusIcon,
  },
  {
    title: 'Schedule a Free\nScreening',
    subtitle: '',
    href: '#appointment',
    icon: ShieldCheckIcon,
  },
]

interface CtaCardData {
  title: string
  subtitle: string
  href: string
  icon: React.ComponentType<IconProps>
}

function CtaCard({ title, subtitle, href, icon: Icon }: CtaCardData) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-2 rounded-xl bg-lime-100 px-5 py-7 text-center shadow-sm ring-1 ring-lime-200 transition-all hover:-translate-y-1 hover:bg-lime-200 hover:shadow-md"
    >
      <span className="text-cora-teal transition-colors group-hover:text-cora-blue">
        <Icon />
      </span>
      <span className="whitespace-pre-line font-semibold leading-snug text-cora-navy">
        {title}
      </span>
      {subtitle && <span className="text-xs text-cora-gray">{subtitle}</span>}
    </a>
  )
}

function MovementIcons() {
  const colors = ['text-lime-500', 'text-cora-teal', 'text-cora-blue', 'text-cora-navy']
  return (
    <div className="mt-6 flex gap-5" aria-hidden="true">
      {colors.map((color, i) => (
        <RunnerIcon key={color} className={`h-9 w-9 ${color}`} flip={i % 2 === 1} />
      ))}
    </div>
  )
}

function NotFound({ slug }: { slug: string }) {
  return (
    <main id="main" className="py-24">
      <Container className="text-center">
        <h1 className="text-3xl font-bold text-cora-navy">Condition not found</h1>
        <p className="mt-3 text-cora-gray">
          We couldn’t find a page for “{slug}”.
        </p>
        <Button variant="secondary" href="#" className="mt-6">
          Back to Home
        </Button>
      </Container>
    </main>
  )
}

function Dot() {
  return <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cora-teal" />
}
