import { createSlice, createAction } from '@reduxjs/toolkit'

// Trigger action — dispatched by components, watched by saga
export const fetchServicesRequest = createAction('services/fetch')

const initialState = {
  data: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetchStarted(state) {
      state.status = 'loading'
      state.error = null
    },
    fetchSucceeded(state, action) {
      state.status = 'succeeded'
      state.data = action.payload
    },
    fetchFailed(state, action) {
      state.status = 'failed'
      state.error = action.payload  // string only — never an Error object
    },
    resetServices() {
      return initialState
    },
  },
})

export const { fetchStarted, fetchSucceeded, fetchFailed, resetServices } =
  servicesSlice.actions

export default servicesSlice.reducer

// Selectors — components never reach into raw state path
export const selectServices = (state) => state.services.data
export const selectServicesStatus = (state) => state.services.status
export const selectServicesError = (state) => state.services.error
export const selectServicesIsLoading = (state) => state.services.status === 'loading'
