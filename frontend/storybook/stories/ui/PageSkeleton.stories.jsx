import PageSkeleton from '@/components/ui/PageSkeleton'

/** @type { import('@storybook/react-vite').Meta<typeof PageSkeleton> } */
export default {
  title: 'UI/PageSkeleton',
  component: PageSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page loading skeleton rendered by the `<Suspense>` fallback while lazy-loaded route chunks are downloading. No props — it is entirely self-contained.',
      },
    },
  },
}

/** Default full-page pulse. */
export const Default = {}

/** Simulate the skeleton inside a constrained viewport so the pulse animation is visible. */
export const Mobile = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}

export const Tablet = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
}
