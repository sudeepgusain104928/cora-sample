import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchLocationsRequest,
  fetchStarted,
  fetchSucceeded,
  fetchFailed,
} from '../slices/locationsDataSlice'
import { fetchLocations } from '../../services/locationsService'

function* handleLocationsFetch() {
  try {
    yield put(fetchStarted())
    const data = yield call(fetchLocations)
    yield put(fetchSucceeded(data))
  } catch (error) {
    console.error('[locationsSaga]', error)
    yield put(fetchFailed(error?.message ?? 'Failed to fetch locations'))
  }
}

export function* watchLocations() {
  yield takeLatest(fetchLocationsRequest.type, handleLocationsFetch)
}
