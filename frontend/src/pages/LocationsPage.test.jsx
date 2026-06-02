import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import LocationsPage from './LocationsPage'

describe('LocationsPage', () => {
  it('renders the hero title', () => {
    renderWithProviders(<LocationsPage />)
    expect(screen.getByRole('heading', { name: /find a cora clinic/i })).toBeInTheDocument()
  })

  it('shows loading skeleton initially', () => {
    renderWithProviders(<LocationsPage />)
    expect(screen.getByLabelText('Loading locations')).toBeInTheDocument()
  })

  it('shows location cards after saga resolves', async () => {
    renderWithProviders(<LocationsPage />)
    await waitFor(
      () => expect(screen.getByText(/Downtown Orlando/i)).toBeInTheDocument(),
      { timeout: 2000 },
    )
  })

  it('filters locations by search query', async () => {
    const preloadedState = {
      locationsData: {
        data: [
          { id: 'loc-1', name: 'CORA – Orlando', address: '1 Main St', city: 'Orlando', state: 'FL', zip: '32801', phone: '407-555-0001', hours: 'Mon–Fri', services: ['PT'] },
          { id: 'loc-2', name: 'CORA – Tampa', address: '2 Bay Dr', city: 'Tampa', state: 'FL', zip: '33609', phone: '813-555-0002', hours: 'Mon–Fri', services: ['PT'] },
        ],
        status: 'succeeded',
        error: null,
      },
    }
    renderWithProviders(<LocationsPage />, { preloadedState })
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Orlando' } })
    // After debounce (250ms) the Tampa location should disappear
    await waitFor(() => {
      expect(screen.queryByText('CORA – Tampa')).not.toBeInTheDocument()
      expect(screen.getByText('CORA – Orlando')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('shows empty state when no locations match', async () => {
    const preloadedState = {
      locationsData: {
        data: [{ id: 'loc-1', name: 'CORA – Orlando', address: '', city: 'Orlando', state: 'FL', zip: '32801', phone: '', hours: '', services: [] }],
        status: 'succeeded',
        error: null,
      },
    }
    renderWithProviders(<LocationsPage />, { preloadedState })
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'XYZ99999' } })
    await waitFor(() => {
      expect(screen.getByText(/no locations match/i)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('shows error when locations failed to load', () => {
    const preloadedState = {
      locationsData: { data: [], status: 'failed', error: 'Timeout' },
    }
    renderWithProviders(<LocationsPage />, { preloadedState })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/timeout/i)).toBeInTheDocument()
  })
})
