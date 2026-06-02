import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  it('renders the hero title', () => {
    renderWithProviders(<AboutPage />)
    expect(
      screen.getByRole('heading', { name: /about cora physical therapy/i }),
    ).toBeInTheDocument()
  })

  it('renders mission section', () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText(/30 Years of Healing/i)).toBeInTheDocument()
  })

  it('renders stats', () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText('250+')).toBeInTheDocument()
    expect(screen.getByText('Clinics')).toBeInTheDocument()
  })

  it('renders all four values', () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText('Patient First')).toBeInTheDocument()
    expect(screen.getByText('Evidence-Based')).toBeInTheDocument()
    expect(screen.getByText('Inclusive Care')).toBeInTheDocument()
    expect(screen.getByText('Continuous Growth')).toBeInTheDocument()
  })

  it('renders leadership team section', () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText(/leadership team/i)).toBeInTheDocument()
    expect(screen.getByText('Dr. Sarah Mitchell, PT, DPT')).toBeInTheDocument()
  })
})
