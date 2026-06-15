import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { loginThunk, logout, clearError } from './authSlice'
import { defaultHandlers } from '@/test/msw-handlers'

const server = setupServer(...defaultHandlers)
beforeAll(() => server.listen())
beforeEach(() => localStorage.clear())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function makeStore() {
  return configureStore({ reducer: { auth: authReducer } })
}

describe('authSlice', () => {
  it('loginThunk.fulfilled stores token and user', async () => {
    const store = makeStore()
    const result = await store.dispatch(loginThunk({ username: 'admin', password: 'password123' }))
    expect(loginThunk.fulfilled.match(result)).toBe(true)
    expect(store.getState().auth.token).toBe('fake-token-admin')
    expect(store.getState().auth.user?.role).toBe('admin')
    expect(store.getState().auth.loading).toBe(false)
  })

  it('loginThunk.pending sets loading=true', () => {
    const store = makeStore()
    store.dispatch(loginThunk({ username: 'admin', password: 'password123' }))
    expect(store.getState().auth.loading).toBe(true)
  })

  it('loginThunk.rejected sets error', async () => {
    server.use(
      http.post('/api/auth/login', () =>
        HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 }),
      ),
    )
    const store = makeStore()
    await store.dispatch(loginThunk({ username: 'x', password: 'y' }))
    expect(store.getState().auth.error).toBeTruthy()
    expect(store.getState().auth.loading).toBe(false)
    expect(store.getState().auth.token).toBeNull()
  })

  it('logout clears user and token', async () => {
    const store = makeStore()
    await store.dispatch(loginThunk({ username: 'admin', password: 'password123' }))
    store.dispatch(logout())
    expect(store.getState().auth.user).toBeNull()
    expect(store.getState().auth.token).toBeNull()
  })

  it('clearError resets error to null', async () => {
    server.use(
      http.post('/api/auth/login', () =>
        HttpResponse.json({ message: 'Bad' }, { status: 401 }),
      ),
    )
    const store = makeStore()
    await store.dispatch(loginThunk({ username: 'x', password: 'y' }))
    expect(store.getState().auth.error).toBeTruthy()
    store.dispatch(clearError())
    expect(store.getState().auth.error).toBeNull()
  })

  it('initialises with null user when localStorage has corrupt JSON', () => {
    localStorage.setItem('cora_auth_user', 'not-valid-json{{{')
    const store = makeStore()
    expect(store.getState().auth.user).toBeNull()
  })
})
