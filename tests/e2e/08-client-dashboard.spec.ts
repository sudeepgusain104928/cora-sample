/**
 * Feature: Client Dashboard (Protected)
 * Covers: unauthenticated redirect, welcome message, role badge,
 *         portal cards, logout from dashboard
 */
import { test, expect } from '@playwright/test'
import { loginAs } from './helpers/auth'

test.describe('Client Dashboard – Access Control', () => {
  test('unauthenticated visit redirects to /login', async ({ page }) => {
    await page.goto('/client/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('admin visiting /client/dashboard is redirected', async ({ page }) => {
    await loginAs(page, 'admin')
    await page.goto('/client/dashboard')
    await expect(page).not.toHaveURL('/client/dashboard')
  })
})

test.describe('Client Dashboard – Content', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'client')
    // Should already be on /client/dashboard after login
    await page.waitForLoadState('networkidle')
  })

  test('dashboard is at /client/dashboard', async ({ page }) => {
    await expect(page).toHaveURL('/client/dashboard')
  })

  test('welcome heading contains user name', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /welcome back/i })
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text?.length).toBeGreaterThan('Welcome back'.length)
  })

  test('role badge shows "client"', async ({ page }) => {
    const badge = page.locator('[class*="rounded-full"]').filter({ hasText: /client/i }).first()
    await expect(badge).toBeVisible()
  })

  test('username is displayed', async ({ page }) => {
    await expect(page.getByText('client1')).toBeVisible()
  })

  test('"You are signed in as:" label is visible', async ({ page }) => {
    await expect(page.getByText(/you are signed in as/i)).toBeVisible()
  })

  test('portal card "My Appointments" is visible', async ({ page }) => {
    await expect(page.getByText('My Appointments')).toBeVisible()
  })

  test('portal card "My Treatment Plan" is visible', async ({ page }) => {
    await expect(page.getByText('My Treatment Plan')).toBeVisible()
  })

  test('portal card "Find a Location" is visible', async ({ page }) => {
    await expect(page.getByText('Find a Location')).toBeVisible()
  })

  test('renders exactly 3 portal cards', async ({ page }) => {
    // Cards are in a grid; count the direct grid children
    const grid = page.locator('[class*="grid"]').filter({ has: page.getByText('My Appointments') })
    const cards = grid.locator('> *')
    await expect(cards).toHaveCount(3)
  })

  test('dashboard header / portal label is visible', async ({ page }) => {
    // DashboardLayout renders a header with the portal label
    const header = page.locator('header').or(page.locator('[class*="dashboard"]')).first()
    await expect(header).toBeVisible()
  })

  test('Log out button is present on client dashboard', async ({ page }) => {
    await expect(page.getByRole('button', { name: /log out/i })).toBeVisible()
  })

  test('clicking Log out redirects to home', async ({ page }) => {
    await page.getByRole('button', { name: /log out/i }).click()
    await expect(page).toHaveURL('/')
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('dashboard welcome is visible on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  })
})
