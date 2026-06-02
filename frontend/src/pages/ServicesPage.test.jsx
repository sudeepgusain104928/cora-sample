import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import ServicesPage from './ServicesPage'

describe('ServicesPage', () => {
  it('renders the hero title', () => {
    renderWithProviders(<ServicesPage />)
    expect(
      screen.getByRole('heading', { name: /our services/i }),
    ).toBeInTheDocument()
  })

  it('shows a loading skeleton initially', () => {
    renderWithProviders(<ServicesPage />)
    expect(screen.getByLabelText('Loading services')).toBeInTheDocument()
  })

  it('shows service cards after saga resolves', async () => {
    renderWithProviders(<ServicesPage />)
    // Wait for saga async to complete (300ms simulated delay + microtasks)
    await waitFor(
      () => expect(screen.getByText('Physical Therapy')).toBeInTheDocument(),
      { timeout: 2000 },
    )
    expect(screen.getByText('Dry Needling')).toBeInTheDocument()
  })

  it('renders the CTA band', async () => {
    renderWithProviders(<ServicesPage />)
    expect(
      screen.getByRole('heading', { name: /ready to start your recovery/i }),
    ).toBeInTheDocument()
  })

  it('renders the pre-loaded state when services are already in the store', () => {
    const preloadedState = {
      services: {
        data: [{ id: '1', name: 'Mock PT', description: 'desc', icon: '🦴', slug: 'mock-pt', conditions: ['a'] }],
        status: 'succeeded',
        error: null,
      },
    }
    renderWithProviders(<ServicesPage />, { preloadedState })
    expect(screen.getByText('Mock PT')).toBeInTheDocument()
  })

  it('shows error message when services failed to load', () => {
    const preloadedState = {
      services: { data: [], status: 'failed', error: 'Server error' },
    }
    renderWithProviders(<ServicesPage />, { preloadedState })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/server error/i)).toBeInTheDocument()
  })
})
