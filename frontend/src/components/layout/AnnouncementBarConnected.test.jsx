import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/test-utils'
import AnnouncementBarConnected from './AnnouncementBarConnected'

describe('AnnouncementBarConnected', () => {
  it('renders when visible in store', () => {
    renderWithProviders(<AnnouncementBarConnected />)
    expect(screen.getByText(/Explore CORA Careers/i)).toBeInTheDocument()
  })

  it('hides after dismiss', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<AnnouncementBarConnected />)
    await user.click(screen.getByRole('button', { name: /Close announcement/i }))
    expect(store.getState().ui.announcementVisible).toBe(false)
    expect(screen.queryByText(/Explore CORA Careers/i)).not.toBeInTheDocument()
  })

  it('does not render when already dismissed', () => {
    renderWithProviders(<AnnouncementBarConnected />, {
      preloadedState: { ui: { announcementVisible: false } },
    })
    expect(screen.queryByText(/Explore CORA Careers/i)).not.toBeInTheDocument()
  })
})
