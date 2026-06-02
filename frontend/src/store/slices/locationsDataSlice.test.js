import { describe, it, expect } from 'vitest'
import reducer, {
  fetchLocationsRequest,
  fetchStarted,
  fetchSucceeded,
  fetchFailed,
  resetLocationsData,
  selectLocationsData,
  selectLocationsStatus,
  selectLocationsError,
  selectLocationsIsLoading,
} from './locationsDataSlice'

const initialState = { data: [], status: 'idle', error: null }

describe('locationsDataSlice', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('fetchStarted sets status to loading', () => {
    const state = reducer({ ...initialState, status: 'failed', error: 'err' }, fetchStarted())
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  it('fetchSucceeded populates data', () => {
    const locs = [{ id: 'loc-1', name: 'Downtown' }]
    const state = reducer({ ...initialState, status: 'loading' }, fetchSucceeded(locs))
    expect(state.status).toBe('succeeded')
    expect(state.data).toEqual(locs)
  })

  it('fetchFailed records error string', () => {
    const state = reducer({ ...initialState, status: 'loading' }, fetchFailed('Timeout'))
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Timeout')
  })

  it('resetLocationsData returns to initial state', () => {
    const dirty = { data: [{ id: 'x' }], status: 'succeeded', error: null }
    expect(reducer(dirty, resetLocationsData())).toEqual(initialState)
  })

  it('fetchLocationsRequest does not mutate state', () => {
    expect(reducer(initialState, fetchLocationsRequest())).toEqual(initialState)
  })

  describe('selectors', () => {
    const storeState = {
      locationsData: { data: [{ id: 'loc-1' }], status: 'succeeded', error: null },
    }
    it('selectLocationsData', () => expect(selectLocationsData(storeState)).toEqual([{ id: 'loc-1' }]))
    it('selectLocationsStatus', () => expect(selectLocationsStatus(storeState)).toBe('succeeded'))
    it('selectLocationsError', () => expect(selectLocationsError(storeState)).toBeNull())
    it('selectLocationsIsLoading false when succeeded', () => {
      expect(selectLocationsIsLoading(storeState)).toBe(false)
    })
    it('selectLocationsIsLoading true when loading', () => {
      expect(selectLocationsIsLoading({ locationsData: { ...storeState.locationsData, status: 'loading' } })).toBe(true)
    })
  })
})
