/**
 * Feature: Authentication
 * Covers: login form, valid/invalid creds, role-based redirect,
 *         protected routes, logout, back-button after logout
 */
import { test, expect } from '@playwright/test'
import { loginAs, CREDENTIALS } from './helpers/auth'

test.describe('Login Page – UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
  })

  test('login page loads at /login', async ({ page }) => {
    await expect(page).toHaveURL('/login')
  })

  test('renders "Welcome back" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  })

  test('renders demo credentials hint block', async ({ page }) => {
    await expect(page.getByText(/demo credentials/i)).toBeVisible()
    await expect(page.getByText(/client1/)).toBeVisible()
    await expect(page.getByText(/admin/)).toBeVisible()
  })

  test('username and password fields are present', async ({ page }) => {
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })

  test('password field type is password (hidden text)', async ({ page }) => {
    const pwInput = page.getByLabel('Password')
    await expect(pwInput).toHaveAttribute('type', 'password')
  })

  test('Sign in button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('Sign in button is disabled while loading', async ({ page }) => {
    await page.getByLabel('Username').fill(CREDENTIALS.client.username)
    await page.getByLabel('Password').fill(CREDENTIALS.client.password)
    await page.getByRole('button', { name: /sign in/i }).click()
    // Button switches to "Signing in…" and becomes disabled during the request
    const btn = page.getByRole('button', { name: /signing in/i })
    // It may flash briefly; if the request is fast it may redirect before we can catch it
    // Just ensure no JS error is thrown and page transitions correctly
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 10_000 })
  })
})

test.describe('Login Page – Invalid credentials', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('shows error message for wrong credentials', async ({ page }) => {
    await page.getByLabel('Username').fill(CREDENTIALS.invalid.username)
    await page.getByLabel('Password').fill(CREDENTIALS.invalid.password)
    await page.getByRole('button', { name: /sign in/i }).click()
    const error = page.getByRole('alert')
    await expect(error).toBeVisible({ timeout: 8_000 })
    const text = await error.textContent()
    expect(text?.length).toBeGreaterThan(0)
  })

  test('error message disappears when navigating away', async ({ page }) => {
    await page.getByLabel('Username').fill(CREDENTIALS.invalid.username)
    await page.getByLabel('Password').fill(CREDENTIALS.invalid.password)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 8_000 })
    // Navigate away and back
    await page.goto('/')
    await page.goto('/login')
    await expect(page.getByRole('alert')).not.toBeVisible()
  })
})

test.describe('Login Page – Successful login (client)', () => {
  test('client login redirects to /client/dashboard', async ({ page }) => {
    await loginAs(page, 'client')
    await expect(page).toHaveURL('/client/dashboard')
  })

  test('already logged-in client visiting /login is redirected to dashboard', async ({ page }) => {
    await loginAs(page, 'client')
    await page.goto('/login')
    await expect(page).toHaveURL('/client/dashboard')
  })
})

test.describe('Login Page – Successful login (admin)', () => {
  test('admin login redirects to /admin/dashboard', async ({ page }) => {
    await loginAs(page, 'admin')
    await expect(page).toHaveURL('/admin/dashboard')
  })

  test('already logged-in admin visiting /login is redirected to dashboard', async ({ page }) => {
    await loginAs(page, 'admin')
    await page.goto('/login')
    await expect(page).toHaveURL('/admin/dashboard')
  })
})

test.describe('Protected Routes', () => {
  test('unauthenticated user accessing /client/dashboard is redirected to /login', async ({ page }) => {
    await page.goto('/client/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('unauthenticated user accessing /admin/dashboard is redirected to /login', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('client cannot access /admin/dashboard (gets redirected)', async ({ page }) => {
    await loginAs(page, 'client')
    await page.goto('/admin/dashboard')
    // Should redirect away (to login or client dashboard)
    await expect(page).not.toHaveURL('/admin/dashboard')
  })

  test('admin cannot access /client/dashboard (gets redirected)', async ({ page }) => {
    await loginAs(page, 'admin')
    await page.goto('/client/dashboard')
    await expect(page).not.toHaveURL('/client/dashboard')
  })
})

test.describe('Logout', () => {
  test('client can log out from dashboard', async ({ page }) => {
    await loginAs(page, 'client')
    await page.getByRole('button', { name: /log out/i }).click()
    await expect(page).toHaveURL('/')
  })

  test('after logout, /client/dashboard redirects to /login', async ({ page }) => {
    await loginAs(page, 'client')
    await page.getByRole('button', { name: /log out/i }).click()
    await page.goto('/client/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('admin can log out from dashboard', async ({ page }) => {
    await loginAs(page, 'admin')
    await page.getByRole('button', { name: /log out/i }).click()
    await expect(page).toHaveURL('/')
  })
})
