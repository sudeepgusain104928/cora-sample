import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import ContactPage from './ContactPage'

describe('ContactPage', () => {
  it('renders the hero title', () => {
    renderWithProviders(<ContactPage />)
    expect(
      screen.getByRole('heading', { name: /contact cora physical therapy/i }),
    ).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    renderWithProviders(<ContactPage />)
    expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('allows typing into form fields', () => {
    renderWithProviders(<ContactPage />)
    const firstName = screen.getByLabelText(/first name/i)
    fireEvent.change(firstName, { target: { value: 'Jane' } })
    expect(firstName).toHaveValue('Jane')
  })

  it('shows success message after form submission', async () => {
    renderWithProviders(<ContactPage />)
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })
  })

  it('shows "Send another message" link after success, which resets the form', async () => {
    renderWithProviders(<ContactPage />)
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => screen.getByText(/message sent/i))
    fireEvent.click(screen.getByText(/send another message/i))
    expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument()
  })

  it('renders contact information', () => {
    renderWithProviders(<ContactPage />)
    // Phone and address appear in header, footer, and contact section — use getAllByText
    expect(screen.getAllByText(/1\.866\.443\.2672/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Lima, OH/).length).toBeGreaterThan(0)
  })
})
