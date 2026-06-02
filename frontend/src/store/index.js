import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import locationReducer from './slices/locationSlice'
import testimonialsReducer from './slices/testimonialsSlice'
import uiReducer from './slices/uiSlice'
import servicesReducer from './slices/servicesSlice'
import locationsDataReducer from './slices/locationsDataSlice'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export function createAppStore(preloadedState) {
  const store = configureStore({
    reducer: {
      location: locationReducer,       // search UI state (query, radius, etc.)
      testimonials: testimonialsReducer,
      ui: uiReducer,
      services: servicesReducer,       // fetched services list
      locationsData: locationsDataReducer, // fetched locations list
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    preloadedState,
  })

  sagaMiddleware.run(rootSaga)
  return store
}

export const store = createAppStore()
