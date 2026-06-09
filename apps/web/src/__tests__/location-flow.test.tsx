import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { renderWithStore } from '@/test/test-utils'
import LocationFinder from '@/components/sections/LocationFinder'

const mockLocations = [
  {
    id: '1',
    city: 'Jacksonville',
    state: 'Florida',
    address: '6100 Kennerly Rd.',
    phone: '(904) 739-9901',
    lat: 30.27,
    lng: -81.5,
  },
  {
    id: '2',
    city: 'Orlando',
    state: 'Florida',
    address: '4100 W. Fairbanks Ave.',
    phone: '(407) 539-2099',
    lat: 28.59,
    lng: -81.4,
  },
  {
    id: '3',
    city: 'Tampa',
    state: 'Florida',
    address: '3802 Gunn Hwy.',
    phone: '(813) 265-3233',
    lat: 28.07,
    lng: -82.5,
  },
]

const server = setupServer(
  http.get('http://localhost/api/locations', () => HttpResponse.json(mockLocations)),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Location flow', () => {
  it('renders 3 location cards after fetch', async () => {
    // Preload the locations into the store (simulating fetchLocations dispatch)
    renderWithStore(<LocationFinder />, {
      preloadedState: {
        locations: {
          locations: mockLocations,
          loading: false,
          error: null,
        },
      },
    })

    await waitFor(() => {
      expect(screen.getByText('Jacksonville, Florida')).toBeInTheDocument()
      expect(screen.getByText('Orlando, Florida')).toBeInTheDocument()
      expect(screen.getByText('Tampa, Florida')).toBeInTheDocument()
    })
  })

  it('renders skeleton cards while loading', () => {
    renderWithStore(<LocationFinder />, {
      preloadedState: {
        locations: { locations: [], loading: true, error: null },
      },
    })
    // SkeletonCard renders animated pulse divs (no text content to query by role)
    const section = document.querySelector('section#locations')
    expect(section).toBeInTheDocument()
    expect(section?.querySelectorAll('.animate-pulse')).toHaveLength(3)
  })

  it('renders error message when API fails', async () => {
    renderWithStore(<LocationFinder />, {
      preloadedState: {
        locations: {
          locations: [],
          loading: false,
          error: 'Unable to load locations',
        },
      },
    })

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(/unable to load locations/i)).toBeInTheDocument()
    })
  })
})
