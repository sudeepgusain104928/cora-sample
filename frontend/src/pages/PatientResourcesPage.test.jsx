import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import PatientResourcesPage from './PatientResourcesPage'

describe('PatientResourcesPage', () => {
  it('renders the hero title', () => {
    renderWithProviders(<PatientResourcesPage />)
    expect(
      screen.getByRole('heading', { name: /patient resources/i }),
    ).toBeInTheDocument()
  })

  it('renders all resource categories', async () => {
    renderWithProviders(<PatientResourcesPage />)
    await waitFor(() => {
      // "Patient Forms" also appears in footer nav — look for the section heading <h3>
      expect(screen.getByText('Getting Started')).toBeInTheDocument()
      expect(screen.getByText('Pay Your Bill')).toBeInTheDocument()
      expect(screen.getByText('Education & Blog')).toBeInTheDocument()
      // At least one h3 with "Patient Forms" text
      const headings = screen.getAllByText('Patient Forms')
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  it('renders FAQ section', () => {
    renderWithProviders(<PatientResourcesPage />)
    expect(screen.getByText(/do i need a doctor referral/i)).toBeInTheDocument()
    expect(screen.getByText(/how long is a typical pt session/i)).toBeInTheDocument()
  })

  it('renders Find a Clinic CTA', () => {
    renderWithProviders(<PatientResourcesPage />)
    expect(screen.getByRole('link', { name: /find a clinic/i })).toBeInTheDocument()
  })
})
