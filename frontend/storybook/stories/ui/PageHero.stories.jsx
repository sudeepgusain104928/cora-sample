import PageHero from '@/components/ui/PageHero'

/** @type { import('@storybook/react-vite').Meta<typeof PageHero> } */
export default {
  title: 'UI/PageHero',
  component: PageHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interior-page hero banner. Accepts a `title`, optional `subtitle`, and an optional `cta` object `{ label, href }` that renders a call-to-action button.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Main heading text' },
    subtitle: { control: 'text', description: 'Subheading / supporting copy (optional)' },
    cta: { control: 'object', description: 'CTA button — pass `{ label, href }` or omit' },
  },
  args: {
    title: 'About CORA Physical Therapy',
  },
}

/** Title only — minimal use-case. */
export const TitleOnly = {
  args: {
    title: 'About CORA Physical Therapy',
  },
}

/** Title + subtitle paragraph. */
export const WithSubtitle = {
  args: {
    title: 'Our Services',
    subtitle:
      'Expert, evidence-based physical therapy tailored to your needs — from post-surgical rehab to sports performance.',
  },
}

/** Full hero with title, subtitle, and a CTA button. */
export const WithCTA = {
  args: {
    title: 'Find a CORA Clinic Near You',
    subtitle:
      'With 250+ locations across Florida, Georgia, and beyond — expert therapy is always close to home.',
    cta: { label: 'Find a Location', href: '/locations' },
  },
}

/** Long title wraps gracefully on smaller viewports. */
export const LongTitle = {
  args: {
    title: 'Patient Resources: Everything You Need Before, During, and After Your Physical Therapy Journey',
    cta: { label: 'Get Started', href: '/contact' },
  },
}

/** Mobile viewport — ensures the gradient background and text scale correctly. */
export const Mobile = {
  args: { ...WithCTA.args },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}

/** Playground — all controls wired for interactive exploration. */
export const Playground = {
  args: {
    title: 'Page Title Here',
    subtitle: 'Optional supporting text goes here.',
    cta: { label: 'Call to Action', href: '#' },
  },
}
