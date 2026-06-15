/**
 * Feature: Navigation (Header + Footer)
 * Covers: logo, nav links, login button, mobile hamburger menu, footer links
 */
import { test, expect } from '@playwright/test'
import { loginAs, logout } from './helpers/auth'

test.describe('Navigation – Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('logo links back to home', async ({ page }) => {
    await page.goto('/what-we-treat')
    await page.getByRole('link', { name: /ank cora health home/i }).click()
    await expect(page).toHaveURL('/')
  })

  test('nav: Home link is active on /', async ({ page }) => {
    const homeLink = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /^Home$/i })
    await expect(homeLink).toHaveClass(/border-cora-lime/)
  })

  test('nav: What We Treat navigates correctly', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /what we treat/i }).click()
    await expect(page).toHaveURL('/what-we-treat')
    await expect(page.getByRole('heading', { name: /what we treat/i })).toBeVisible()
  })

  test('nav: How We Can Help navigates correctly', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /how we can help/i }).click()
    await expect(page).toHaveURL('/how-we-can-help')
    await expect(page.getByRole('heading', { name: /how we can help/i })).toBeVisible()
  })

  test('nav: Locations navigates correctly', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /^Locations$/i }).click()
    await expect(page).toHaveURL('/locations')
  })

  test('nav: Login button shows when unauthenticated', async ({ page }) => {
    const loginLink = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /login/i })
    await expect(loginLink).toBeVisible()
  })

  test('nav: Log out button shows when authenticated', async ({ page }) => {
    await loginAs(page, 'client')
    await page.goto('/')
    const logoutBtn = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: /log out/i })
    await expect(logoutBtn).toBeVisible()
    await logout(page)
  })

  test('nav: Log out clears session and returns to home', async ({ page }) => {
    await loginAs(page, 'client')
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: /log out/i }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /login/i })).toBeVisible()
  })
})

test.describe('Navigation – Mobile hamburger menu', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('hamburger button is visible on mobile', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /toggle navigation menu/i })
    await expect(hamburger).toBeVisible()
  })

  test('desktop nav is hidden on mobile', async ({ page }) => {
    const desktopNav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(desktopNav).toBeHidden()
  })

  test('mobile menu opens on hamburger click', async ({ page }) => {
    await page.getByRole('button', { name: /toggle navigation menu/i }).click()
    const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileMenu).toBeVisible()
  })

  test('mobile menu closes on nav link click', async ({ page }) => {
    await page.getByRole('button', { name: /toggle navigation menu/i }).click()
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /what we treat/i }).click()
    await expect(page).toHaveURL('/what-we-treat')
    const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileMenu).toBeHidden()
  })

  test('mobile menu closes on Escape key', async ({ page }) => {
    await page.getByRole('button', { name: /toggle navigation menu/i }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  })
})

test.describe('Navigation – Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('footer renders on the home page', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('footer shows phone number', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText(/1\.866\.443\.2672/)).toBeVisible()
  })

  test('footer Quick Links section is present', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText(/quick links/i)).toBeVisible()
  })

  test('footer Legal section is present', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText(/legal/i)).toBeVisible()
  })

  test('footer shows copyright', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText(/CORA Health\. All Rights Reserved\./)).toBeVisible()
  })

  test('mobile sticky CTA bar visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    // The sticky bar is inside footer and only shown on mobile (lg:hidden)
    const stickyBar = page.locator('footer').locator('div.fixed')
    await expect(stickyBar).toBeVisible()
  })
})
