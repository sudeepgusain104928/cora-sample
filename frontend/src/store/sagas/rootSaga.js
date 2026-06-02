import { all } from 'redux-saga/effects'
import { watchServices } from './servicesSaga'
import { watchLocations } from './locationsSaga'

export default function* rootSaga() {
  yield all([
    watchServices(),
    watchLocations(),
  ])
}
