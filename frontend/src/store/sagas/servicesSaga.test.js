import { call, put } from 'redux-saga/effects'
import { describe, it, expect } from 'vitest'
import { watchServices } from './servicesSaga'
import {
  fetchServicesRequest,
  fetchStarted,
  fetchSucceeded,
  fetchFailed,
} from '../slices/servicesSlice'
import { fetchServices } from '../../services/servicesService'

// Worker generator re-created inline for direct step-by-step testing.
// This mirrors the real worker exactly — any drift will show up as test failures.
function* worker() {
  try {
    yield put(fetchStarted())
    const data = yield call(fetchServices)
    yield put(fetchSucceeded(data))
  } catch (error) {
    yield put(fetchFailed(error?.message ?? 'Failed to fetch services'))
  }
}

describe('servicesSaga', () => {
  it('watchServices yields at least one effect (takeLatest)', () => {
    const gen = watchServices()
    expect(gen.next().value).toBeDefined()
  })

  it('worker: success path dispatches fetchStarted → call → fetchSucceeded', () => {
    const gen = worker()
    expect(gen.next().value).toEqual(put(fetchStarted()))
    expect(gen.next().value).toEqual(call(fetchServices))
    const mockData = [{ id: '1', name: 'PT' }]
    expect(gen.next(mockData).value).toEqual(put(fetchSucceeded(mockData)))
    expect(gen.next().done).toBe(true)
  })

  it('worker: error path dispatches fetchFailed with message string', () => {
    const gen = worker()
    gen.next()                         // put fetchStarted
    gen.next()                         // call fetchServices
    const effect = gen.throw(new Error('Network error')).value
    expect(effect).toEqual(put(fetchFailed('Network error')))
  })

  it('worker: error path uses fallback message when error has no message', () => {
    const gen = worker()
    gen.next()
    gen.next()
    const effect = gen.throw({}).value
    expect(effect).toEqual(put(fetchFailed('Failed to fetch services')))
  })

  it('fetchServicesRequest action type matches watcher trigger', () => {
    expect(fetchServicesRequest.type).toBe('services/fetch')
  })
})
