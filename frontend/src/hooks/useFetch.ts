import { useState, useEffect, useCallback, useRef } from 'react'

interface FetchState<T> {
  data: T | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => void
}

/**
 * Generic data-fetching hook wrapping any async function.
 * Demonstrates: useState, useEffect, useCallback, useRef.
 *
 * useRef is used to track the "mounted" state so we never call setState
 * after a component has unmounted (avoids React memory-leak warning).
 */
export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseFetchReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    status: 'idle',
    error: null,
  })

  // Tracks whether the component is still mounted
  const mountedRef = useRef(true)

  // A counter used to trigger manual refetches without changing the fetcher ref
  const [refreshToken, setRefreshToken] = useState(0)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    setState((prev) => ({ ...prev, status: 'loading', error: null }))

    fetcher()
      .then((data) => {
        if (!cancelled && mountedRef.current) {
          setState({ data, status: 'succeeded', error: null })
        }
      })
      .catch((err: unknown) => {
        if (!cancelled && mountedRef.current) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          setState({ data: null, status: 'failed', error: message })
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, ...deps])

  // useCallback so callers can safely put refetch in their own dep arrays
  const refetch = useCallback(() => {
    setRefreshToken((n) => n + 1)
  }, [])

  return { ...state, refetch }
}
