import { Component, type ComponentType, type ReactNode } from 'react'

// ------------------------------------------------------------------
// Error boundary class — React requires a class component for this
// ------------------------------------------------------------------

interface BoundaryState {
  hasError: boolean
  error: Error | null
}

interface BoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: { componentStack: string }) => void
}

class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }): void {
    // Log to console; swap for Sentry.captureException in production
    console.error('[ErrorBoundary] Caught error:', error, info)
    this.props.onError?.(error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          role="alert"
          className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center"
        >
          <p className="text-lg font-semibold text-red-700">
            Something went wrong
          </p>
          <p className="text-sm text-red-500">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// ------------------------------------------------------------------
// HOC factory
// ------------------------------------------------------------------

interface WithErrorBoundaryOptions {
  /** Custom fallback UI shown when the boundary catches an error. */
  fallback?: ReactNode
  /** Optional callback, e.g. to report to Sentry. */
  onError?: (error: Error, info: { componentStack: string }) => void
}

/**
 * Wraps a component with an ErrorBoundary so runtime errors render a
 * graceful fallback instead of crashing the entire app.
 *
 * Usage:
 *   export default withErrorBoundary(MyPage, { onError: Sentry.captureException })
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithErrorBoundaryOptions = {},
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'

  function WithErrorBoundaryWrapper(props: P): JSX.Element {
    return (
      <ErrorBoundary fallback={options.fallback} onError={options.onError}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    )
  }

  WithErrorBoundaryWrapper.displayName = `withErrorBoundary(${displayName})`
  return WithErrorBoundaryWrapper
}
