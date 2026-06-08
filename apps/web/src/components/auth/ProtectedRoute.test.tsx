import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { renderWithStore } from '@/test/test-utils'
import { ROUTES } from '@/constants/routes'
import { ProtectedRoute } from './ProtectedRoute'

const authenticatedClient = {
  auth: {
    token: 'fake-token',
    user: { id: '2', username: 'client1', name: 'Jane Doe', role: 'client' as const },
    loading: false,
    error: null,
  },
}

const authenticatedAdmin = {
  auth: {
    token: 'fake-token',
    user: { id: '1', username: 'admin', name: 'Admin User', role: 'admin' as const },
    loading: false,
    error: null,
  },
}

const unauthenticated = {
  auth: { token: null, user: null, loading: false, error: null },
}

function withRoutes(requiredRole: 'client' | 'admin') {
  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRole={requiredRole} />}>
        <Route path="/protected" element={<div>Protected content</div>} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<div>Login page</div>} />
    </Routes>
  )
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to /login', () => {
    renderWithStore(withRoutes('client'), {
      preloadedState: unauthenticated,
      initialEntries: ['/protected'],
    })
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('renders outlet for correct role (client)', () => {
    renderWithStore(withRoutes('client'), {
      preloadedState: authenticatedClient,
      initialEntries: ['/protected'],
    })
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('renders outlet for correct role (admin)', () => {
    renderWithStore(withRoutes('admin'), {
      preloadedState: authenticatedAdmin,
      initialEntries: ['/protected'],
    })
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('redirects client to /login when admin role required', () => {
    renderWithStore(withRoutes('admin'), {
      preloadedState: authenticatedClient,
      initialEntries: ['/protected'],
    })
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })
})
