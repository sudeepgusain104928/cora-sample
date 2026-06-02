import { useState, useEffect } from 'react'

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * of no changes. Useful for search inputs to avoid hammering the API on
 * every keystroke.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel previous timer whenever value or delay changes
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
