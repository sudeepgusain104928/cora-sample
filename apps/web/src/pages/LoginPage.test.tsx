import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { renderWithStore } from '@/test/test-utils'
import LoginPage from './LoginPage'
import { defaultHandlers } from '@/test/msw-handlers'

const server = setupServer(...defaultHandlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('LoginPage', () => {
  it('renders username and password fields', () => {
    renderWithStore(<LoginPage />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('dispatches loginThunk and stores token on success', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<LoginPage />)

    await user.type(screen.getByLabelText(/username/i), 'admin')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(store.getState().auth.token).toBe('fake-token-admin')
      expect(store.getState().auth.user?.role).toBe('admin')
    })
  })

  it('shows error message on invalid credentials', async () => {
    server.use(
      http.post('http://localhost/api/auth/login', () =>
        HttpResponse.json({ message: 'Invalid username or password' }, { status: 401 }),
      ),
    )
    const user = userEvent.setup()
    renderWithStore(<LoginPage />)

    await user.type(screen.getByLabelText(/username/i), 'wronguser')
    await user.type(screen.getByLabelText(/password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('shows "Signing in…" text while loading', async () => {
    const user = userEvent.setup()
    renderWithStore(<LoginPage />)

    await user.type(screen.getByLabelText(/username/i), 'admin')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    // Click but don't await — check loading state immediately
    user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/signing in/i)).toBeInTheDocument()
    })
  })
})
