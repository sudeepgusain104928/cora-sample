import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { configureStore } from '@reduxjs/toolkit'
import locationReducer, { fetchLocations } from './locationSlice'
import { defaultHandlers } from '@/test/msw-handlers'

const server = setupServer(...defaultHandlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function makeStore() {
  return configureStore({ reducer: { locations: locationReducer } })
}

describe('locationSlice', () => {
  it('fetchLocations.pending sets loading=true', () => {
    const store = makeStore()
    store.dispatch(fetchLocations())
    expect(store.getState().locations.loading).toBe(true)
  })

  it('fetchLocations.fulfilled stores locations', async () => {
    const store = makeStore()
    await store.dispatch(fetchLocations())
    expect(store.getState().locations.locations).toHaveLength(3)
    expect(store.getState().locations.locations[0].city).toBe('Jacksonville')
    expect(store.getState().locations.loading).toBe(false)
    expect(store.getState().locations.error).toBeNull()
  })

  it('fetchLocations.rejected sets error', async () => {
    server.use(
      http.get('/api/locations', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 }),
      ),
    )
    const store = makeStore()
    await store.dispatch(fetchLocations())
    expect(store.getState().locations.error).toBeTruthy()
    expect(store.getState().locations.loading).toBe(false)
  })

  it('each location has required fields', async () => {
    const store = makeStore()
    await store.dispatch(fetchLocations())
    const loc = store.getState().locations.locations[0]
    expect(loc).toHaveProperty('id')
    expect(loc).toHaveProperty('city')
    expect(loc).toHaveProperty('state')
    expect(loc).toHaveProperty('address')
    expect(loc).toHaveProperty('phone')
    expect(loc).toHaveProperty('lat')
    expect(loc).toHaveProperty('lng')
  })
})
