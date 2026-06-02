import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  it('starts in idle/loading state and resolves to succeeded', async () => {
    const fetcher = vi.fn().mockResolvedValue(['item1'])
    const { result } = renderHook(() => useFetch(fetcher))

    // After mount the effect runs — it'll be loading
    expect(['idle', 'loading']).toContain(result.current.status)

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(result.current.status).toBe('succeeded')
    expect(result.current.data).toEqual(['item1'])
    expect(result.current.error).toBeNull()
  })

  it('transitions to failed on rejection', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('network error'))
    const { result } = renderHook(() => useFetch(fetcher))

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(result.current.status).toBe('failed')
    expect(result.current.error).toBe('network error')
    expect(result.current.data).toBeNull()
  })

  it('refetch triggers a new request', async () => {
    const fetcher = vi.fn().mockResolvedValue('data')
    const { result } = renderHook(() => useFetch(fetcher))

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    expect(fetcher).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
