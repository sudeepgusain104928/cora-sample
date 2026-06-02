import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withErrorBoundary } from './withErrorBoundary'

// Suppress expected console.error output from boundary
const originalError = console.error

function GoodComponent(): JSX.Element {
  return <p>All good</p>
}

function BadComponent(): JSX.Element {
  throw new Error('Test crash')
}

describe('withErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn()
  })
  afterEach(() => {
    console.error = originalError
  })

  it('renders the wrapped component when there is no error', () => {
    const Safe = withErrorBoundary(GoodComponent)
    render(<Safe />)
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('renders the default fallback UI when a component throws', () => {
    const Safe = withErrorBoundary(BadComponent)
    render(<Safe />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test crash')).toBeInTheDocument()
  })

  it('renders a custom fallback when provided', () => {
    const Safe = withErrorBoundary(BadComponent, {
      fallback: <p>Custom fallback</p>,
    })
    render(<Safe />)
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
  })

  it('calls onError callback when a component throws', () => {
    const onError = vi.fn()
    const Safe = withErrorBoundary(BadComponent, { onError })
    render(<Safe />)
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) }),
    )
  })

  it('resets after clicking Try again', () => {
    // Use a mutable flag rather than call-count so React 19's extra renders
    // before the boundary catches don't skip the throw.
    let shouldThrow = true
    function ConditionalError(): JSX.Element {
      if (shouldThrow) throw new Error('conditional error')
      return <p>Recovered</p>
    }
    const Safe = withErrorBoundary(ConditionalError)
    render(<Safe />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    // Stop throwing before reset so the next render succeeds
    shouldThrow = false
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(screen.getByText('Recovered')).toBeInTheDocument()
  })

  it('sets a meaningful displayName', () => {
    const Safe = withErrorBoundary(GoodComponent)
    expect(Safe.displayName).toBe('withErrorBoundary(GoodComponent)')
  })
})
