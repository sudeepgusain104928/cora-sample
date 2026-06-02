import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('does not update immediately on value change', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'a' },
    })
    rerender({ val: 'b' })
    // still old value because timer hasn't fired
    expect(result.current).toBe('a')
  })

  it('updates after the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'a' },
    })
    rerender({ val: 'b' })
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('b')
  })

  it('only reflects the last value when called rapidly', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'a' },
    })
    rerender({ val: 'b' })
    rerender({ val: 'c' })
    rerender({ val: 'd' })
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('d')
  })

  it('uses 300ms default delay', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val), {
      initialProps: { val: 'x' },
    })
    rerender({ val: 'y' })
    act(() => vi.advanceTimersByTime(299))
    expect(result.current).toBe('x')
    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('y')
  })
})
