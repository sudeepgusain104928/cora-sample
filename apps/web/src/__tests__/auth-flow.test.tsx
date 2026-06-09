import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { renderWithStore } from '@/test/test-utils'
import LoginPage from '@/pages/LoginPage'

const server = setupServer(
  http.post('http://localhost/api/auth/login', async ({ request }) => {
    const { username } = (await request.json()) as { username: string; password: string }
    if (username === 'admin') {
      return HttpResponse.json({
        token: 'admin-token',
        user: { id: '1', username: 'admin', name: 'Admin User', role: 'admin' },
      })
    }
    if (username === 'client1') {
      return HttpResponse.json({
        token: 'client-token',
        user: { id: '2', username: 'client1', name: 'Jane Doe', role: 'client' },
      })
    }
    return HttpResponse.json({ message: 'Invalid username or password' }, { status: 401 })
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Auth flow — login', () => {
  it('admin login: Redux state has token + role=admin', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<LoginPage />)

    await user.type(screen.getByLabelText(/username/i), 'admin')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(store.getState().auth.token).toBe('admin-token')
      expect(store.getState().auth.user?.role).toBe('admin')
    })
  })

  it('shows error on invalid credentials', async () => {
    const user = userEvent.setup()
    renderWithStore(<LoginPage />)

    await user.type(screen.getByLabelText(/username/i), 'wronguser')
    await user.type(screen.getByLabelText(/password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('client login: Redux state has token + role=client', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<LoginPage />)

    await user.type(screen.getByLabelText(/username/i), 'client1')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(store.getState().auth.token).toBe('client-token')
      expect(store.getState().auth.user?.role).toBe('client')
    })
  })
})
