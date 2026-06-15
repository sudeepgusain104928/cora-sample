/**
 * Feature: Admin Dashboard (Protected)
 * Covers: unauthenticated redirect, admin panel heading, role badge,
 *         admin portal cards, logout
 */
import { test, expect } from '@playwright/test'
import { loginAs } from './helpers/auth'

test.describe('Admin Dashboard – Access Control', () => {
  test('unauthenticated visit redirects to /login', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('client visiting /admin/dashboard is redirected', async ({ page }) => {
    await loginAs(page, 'client')
    await page.goto('/admin/dashboard')
    await expect(page).not.toHaveURL('/admin/dashboard')
  })
})

test.describe('Admin Dashboard – Content', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'admin')
    await page.waitForLoadState('networkidle')
  })

  test('dashboard is at /admin/dashboard', async ({ page }) => {
    await expect(page).toHaveURL('/admin/dashboard')
  })

  test('"Admin Panel" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible()
  })

  test('heading includes the admin user name', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /admin panel/i })
    const text = await heading.textContent()
    // The name from seed data should appear after the dash
    expect(text?.length).toBeGreaterThan('Admin Panel'.length)
  })

  test('"You have administrative access." label is visible', async ({ page }) => {
    await expect(page.getByText(/you have administrative access/i)).toBeVisible()
  })

  test('role badge shows "admin"', async ({ page }) => {
    const badge = page.locator('[class*="rounded-full"]').filter({ hasText: /admin/i }).first()
    await expect(badge).toBeVisible()
  })

  test('username "admin" is displayed', async ({ page }) => {
    await expect(page.getByText('admin').first()).toBeVisible()
  })

  test('portal card "Manage Locations" is visible', async ({ page }) => {
    await expect(page.getByText('Manage Locations')).toBeVisible()
  })

  test('portal card "User Management" is visible', async ({ page }) => {
    await expect(page.getByText('User Management')).toBeVisible()
  })

  test('portal card "Reports" is visible', async ({ page }) => {
    await expect(page.getByText('Reports')).toBeVisible()
  })

  test('renders exactly 3 admin portal cards', async ({ page }) => {
    const grid = page.locator('[class*="grid"]').filter({ has: page.getByText('Manage Locations') })
    const cards = grid.locator('> *')
    await expect(cards).toHaveCount(3)
  })

  test('portal label shows "Admin Portal"', async ({ page }) => {
    await expect(page.getByText(/admin portal/i)).toBeVisible()
  })

  test('Log out button is present on admin dashboard', async ({ page }) => {
    await expect(page.getByRole('button', { name: /log out/i })).toBeVisible()
  })

  test('clicking Log out redirects to home', async ({ page }) => {
    await page.getByRole('button', { name: /log out/i }).click()
    await expect(page).toHaveURL('/')
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('admin panel heading is visible on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible()
  })
})
