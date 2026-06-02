import { createSlice, createAction } from '@reduxjs/toolkit'

// Trigger action — dispatched by components, watched by saga
// Named "locationsData" to avoid clash with the existing locationSlice (UI search state)
export const fetchLocationsRequest = createAction('locationsData/fetch')

const initialState = {
  data: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const locationsDataSlice = createSlice({
  name: 'locationsData',
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
    resetLocationsData() {
      return initialState
    },
  },
})

export const { fetchStarted, fetchSucceeded, fetchFailed, resetLocationsData } =
  locationsDataSlice.actions

export default locationsDataSlice.reducer

// Selectors — components never reach into raw state path
export const selectLocationsData = (state) => state.locationsData.data
export const selectLocationsStatus = (state) => state.locationsData.status
export const selectLocationsError = (state) => state.locationsData.error
export const selectLocationsIsLoading = (state) => state.locationsData.status === 'loading'
