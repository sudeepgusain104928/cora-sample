import { call, put } from 'redux-saga/effects'
import { describe, it, expect } from 'vitest'
import { watchLocations } from './locationsSaga'
import {
  fetchLocationsRequest,
  fetchStarted,
  fetchSucceeded,
  fetchFailed,
} from '../slices/locationsDataSlice'
import { fetchLocations } from '../../services/locationsService'

describe('locationsSaga', () => {
  it('watchLocations watches fetchLocationsRequest with takeLatest', () => {
    const gen = watchLocations()
    const effect = gen.next().value
    expect(effect).toBeDefined()
  })

  it('worker: dispatches fetchStarted then fetchSucceeded on success', () => {
    function* handleLocationsFetch() {
      try {
        yield put(fetchStarted())
        const data = yield call(fetchLocations)
        yield put(fetchSucceeded(data))
      } catch (error) {
        yield put(fetchFailed(error?.message ?? 'Failed to fetch locations'))
      }
    }

    const gen = handleLocationsFetch()
    expect(gen.next().value).toEqual(put(fetchStarted()))
    expect(gen.next().value).toEqual(call(fetchLocations))
    const mockData = [{ id: 'loc-1', name: 'Downtown' }]
    expect(gen.next(mockData).value).toEqual(put(fetchSucceeded(mockData)))
    expect(gen.next().done).toBe(true)
  })

  it('worker: dispatches fetchFailed on error', () => {
    function* handleLocationsFetch() {
      try {
        yield put(fetchStarted())
        yield call(fetchLocations)
      } catch (error) {
        yield put(fetchFailed(error?.message ?? 'Failed to fetch locations'))
      }
    }

    const gen = handleLocationsFetch()
    gen.next() // put fetchStarted
    gen.next() // call fetchLocations
    const errorEffect = gen.throw(new Error('Timeout')).value
    expect(errorEffect).toEqual(put(fetchFailed('Timeout')))
  })

  it('fetchLocationsRequest action type matches trigger', () => {
    expect(fetchLocationsRequest.type).toBe('locationsData/fetch')
  })
})
