import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/test-utils'
import LocationFinder from './LocationFinder'

describe('LocationFinder', () => {
  it('renders search form', () => {
    renderWithProviders(<LocationFinder />)
    expect(screen.getByLabelText(/ZIP or City/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search Locations/i })).toBeInTheDocument()
  })

  it('updates query in redux on input', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<LocationFinder />)
    await user.type(screen.getByLabelText(/ZIP or City/i), '45806')
    expect(store.getState().location.query).toBe('45806')
  })

  it('marks search complete on submit', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<LocationFinder />)
    await user.click(screen.getByRole('button', { name: /Search Locations/i }))
    expect(store.getState().location.hasSearched).toBe(true)
    expect(store.getState().location.isSearching).toBe(false)
  })
})
