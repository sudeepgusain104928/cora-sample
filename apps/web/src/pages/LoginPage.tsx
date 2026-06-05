import { useEffect, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginThunk, clearError } from '@/store/slices/authSlice'

interface LocationState {
  from?: { pathname: string }
}

const ROLE_REDIRECT: Record<string, string> = {
  client: '/client/dashboard',
  admin: '/admin/dashboard',
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, user, token } = useAppSelector((s) => s.auth)

  // If already logged in (e.g. back button after login), redirect immediately
  useEffect(() => {
    if (token && user) {
      navigate(ROLE_REDIRECT[user.role] ?? '/', { replace: true })
    }
  }, [token, user, navigate])

  // Clear stale error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const from = (location.state as LocationState)?.from?.pathname

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const username = (data.get('username') as string).trim()
    const password = data.get('password') as string

    const result = await dispatch(loginThunk({ username, password }))

    if (loginThunk.fulfilled.match(result)) {
      const role = result.payload.user.role
      navigate(from ?? ROLE_REDIRECT[role] ?? '/', { replace: true })
    }
    // On rejection: authSlice sets state.auth.error — no try/catch needed
  }

  return (
    <div className="bg-white">
      <div className="grid min-h-[calc(100vh-200px)] place-items-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500">Sign in to your patient portal</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h1 className="mb-6 text-xl font-semibold text-cora-navy">Welcome back</h1>

            {/* Demo credentials hint */}
            <div className="mb-6 rounded-lg bg-cora-sky/10 p-3 text-xs text-cora-navy">
              <strong>Demo credentials</strong>
              <br />
              Patient: <code>client1</code> / <code>password123</code>
              <br />
              Admin: <code>admin</code> / <code>password123</code>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-cora-navy"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  aria-describedby={error ? 'login-error' : undefined}
                  placeholder="e.g. client1"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-cora-sky focus:ring-2 focus:ring-cora-sky/20 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-cora-navy"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  aria-describedby={error ? 'login-error' : undefined}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-cora-sky focus:ring-2 focus:ring-cora-sky/20 disabled:opacity-50"
                />
              </div>

              {error && (
                <p
                  id="login-error"
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-cora-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cora-navy/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
