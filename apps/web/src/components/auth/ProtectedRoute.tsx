import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/constants/routes'

interface ProtectedRouteProps {
  requiredRole: 'client' | 'admin'
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { token, user, loading } = useAppSelector((s) => s.auth)
  const location = useLocation()

  if (loading) {
    return (
      <div
        className="grid min-h-screen place-items-center bg-white"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cora-sky border-t-cora-navy" />
          <p className="text-sm text-gray-500">Verifying your session…</p>
        </div>
        <span className="sr-only">Checking authentication…</span>
      </div>
    )
  }

  if (!token || !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (user.role !== requiredRole) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
