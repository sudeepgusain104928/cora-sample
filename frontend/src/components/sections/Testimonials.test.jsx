import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { testimonials } from '../../data/testimonials'
import { renderWithProviders } from '../../test/test-utils'
import Testimonials from './Testimonials'

describe('Testimonials', () => {
  it('shows first testimonial by default', () => {
    renderWithProviders(<Testimonials />)
    expect(screen.getByText(new RegExp(testimonials[0].quote.slice(0, 20)))).toBeInTheDocument()
  })

  it('switches testimonial when dot is clicked', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Testimonials />)
    const secondDot = screen.getAllByRole('button', { name: /View testimonial/i })[1]
    await user.click(secondDot)
    expect(store.getState().testimonials.activeIndex).toBe(1)
    const blockquote = screen.getByRole('blockquote')
    expect(within(blockquote).getByText(/Jay Miller/i)).toBeInTheDocument()
  })
})
