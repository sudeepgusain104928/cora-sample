import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('persists value to localStorage on set', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''))
    act(() => result.current[1]('saved'))
    expect(localStorage.getItem('test-key')).toBe('"saved"')
    expect(result.current[0]).toBe('saved')
  })

  it('reads existing localStorage value on mount', () => {
    localStorage.setItem('test-key', JSON.stringify('pre-existing'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    expect(result.current[0]).toBe('pre-existing')
  })

  it('supports functional updater', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => result.current[1]((n) => n + 1))
    expect(result.current[0]).toBe(1)
  })

  it('removes value and resets to initial on removeValue', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    act(() => result.current[1]('changed'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('default')
    expect(localStorage.getItem('test-key')).toBeNull()
  })

  it('works with object values', () => {
    const initial = { a: 1, b: 'x' }
    const { result } = renderHook(() => useLocalStorage('obj', initial))
    act(() => result.current[1]({ a: 2, b: 'y' }))
    expect(result.current[0]).toEqual({ a: 2, b: 'y' })
  })
})
