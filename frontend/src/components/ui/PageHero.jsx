import Container from './Container'

/**
 * Reusable page hero banner used by interior pages (About, Services, etc.).
 * Accepts a title, subtitle, and optional CTA.
 */
export default function PageHero({ title, subtitle, cta }) {
  return (
    <section
      className="bg-gradient-to-br from-cora-navy to-cora-blue py-20 text-white"
      aria-labelledby="page-hero-title"
    >
      <Container>
        <div className="max-w-3xl">
          <h1
            id="page-hero-title"
            className="text-4xl font-bold leading-tight lg:text-5xl"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-white/80 lg:text-xl">{subtitle}</p>
          )}
          {cta && (
            <div className="mt-8">
              <a
                href={cta.href}
                className="inline-block rounded-full bg-cora-orange px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-cora-orange focus:ring-offset-2 focus:ring-offset-cora-navy"
              >
                {cta.label}
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
