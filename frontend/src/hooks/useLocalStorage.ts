import { useState, useCallback } from 'react'

/**
 * Persists a value to localStorage and keeps state in sync.
 * Gracefully falls back to in-memory state when localStorage is unavailable
 * (e.g. SSR or private-browsing restrictions).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Read once on mount — avoid calling localStorage on every render
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // Quota exceeded or private mode — silently continue with in-memory state
        }
        return next
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
