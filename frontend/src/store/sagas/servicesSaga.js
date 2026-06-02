import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchServicesRequest,
  fetchStarted,
  fetchSucceeded,
  fetchFailed,
} from '../slices/servicesSlice'
import { fetchServices } from '../../services/servicesService'

function* handleServicesFetch() {
  try {
    yield put(fetchStarted())
    const data = yield call(fetchServices)
    yield put(fetchSucceeded(data))
  } catch (error) {
    console.error('[servicesSaga]', error)
    yield put(fetchFailed(error?.message ?? 'Failed to fetch services'))
  }
}

export function* watchServices() {
  yield takeLatest(fetchServicesRequest.type, handleServicesFetch)
}
