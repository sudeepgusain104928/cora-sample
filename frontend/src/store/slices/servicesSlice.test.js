import { describe, it, expect } from 'vitest'
import reducer, {
  fetchServicesRequest,
  fetchStarted,
  fetchSucceeded,
  fetchFailed,
  resetServices,
  selectServices,
  selectServicesStatus,
  selectServicesError,
  selectServicesIsLoading,
} from './servicesSlice'

const initialState = { data: [], status: 'idle', error: null }

describe('servicesSlice', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('fetchStarted sets status to loading and clears error', () => {
    const state = reducer({ ...initialState, status: 'failed', error: 'oops' }, fetchStarted())
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  it('fetchSucceeded sets data and status to succeeded', () => {
    const services = [{ id: '1', name: 'PT' }]
    const state = reducer({ ...initialState, status: 'loading' }, fetchSucceeded(services))
    expect(state.status).toBe('succeeded')
    expect(state.data).toEqual(services)
  })

  it('fetchFailed sets status to failed and stores error message', () => {
    const state = reducer({ ...initialState, status: 'loading' }, fetchFailed('Network error'))
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Network error')
  })

  it('resetServices returns to initial state', () => {
    const dirty = { data: [{ id: '1' }], status: 'succeeded', error: null }
    expect(reducer(dirty, resetServices())).toEqual(initialState)
  })

  it('fetchServicesRequest is a trigger action (does not change state)', () => {
    const state = reducer(initialState, fetchServicesRequest())
    expect(state).toEqual(initialState)
  })

  describe('selectors', () => {
    const storeState = {
      services: { data: [{ id: '1' }], status: 'loading', error: 'err' },
    }
    it('selectServices', () => expect(selectServices(storeState)).toEqual([{ id: '1' }]))
    it('selectServicesStatus', () => expect(selectServicesStatus(storeState)).toBe('loading'))
    it('selectServicesError', () => expect(selectServicesError(storeState)).toBe('err'))
    it('selectServicesIsLoading true when loading', () => expect(selectServicesIsLoading(storeState)).toBe(true))
    it('selectServicesIsLoading false otherwise', () => {
      expect(selectServicesIsLoading({ services: { ...storeState.services, status: 'succeeded' } })).toBe(false)
    })
  })
})
