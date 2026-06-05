import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { PublicLayout } from './components/layout/Layout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// All pages are lazy-loaded — each route gets its own JS chunk
const HomePage        = React.lazy(() => import('./pages/HomePage'))
const ConditionPage   = React.lazy(() => import('./pages/ConditionPage'))
const WhatWeTreat     = React.lazy(() => import('./pages/WhatWeTreat'))
const HowWeCanHelp    = React.lazy(() => import('./pages/HowWeCanHelp'))
const LoginPage       = React.lazy(() => import('./pages/LoginPage'))
const ClientDashboard = React.lazy(() => import('./pages/client/Dashboard'))
const AdminDashboard  = React.lazy(() => import('./pages/admin/Dashboard'))

function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center">
      <span
        className="h-8 w-8 animate-spin rounded-full border-4 border-cora-sky border-t-transparent"
        aria-label="Loading"
      />
    </div>
  )
}

const router = createBrowserRouter([
  // ── Public routes (Header + Footer) ────────────────────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/condition/:slug', element: <ConditionPage /> },
      { path: '/what-we-treat', element: <WhatWeTreat /> },
      { path: '/how-we-can-help', element: <HowWeCanHelp /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },

  // ── Protected: client role ──────────────────────────────────────────────────
  {
    element: <ProtectedRoute requiredRole="client" />,
    children: [
      { path: '/client/dashboard', element: <ClientDashboard /> },
    ],
  },

  // ── Protected: admin role ───────────────────────────────────────────────────
  {
    element: <ProtectedRoute requiredRole="admin" />,
    children: [
      { path: '/admin/dashboard', element: <AdminDashboard /> },
    ],
  },

  // ── Catch-all ───────────────────────────────────────────────────────────────
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
