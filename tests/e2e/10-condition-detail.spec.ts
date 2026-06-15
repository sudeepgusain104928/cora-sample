/**
 * Feature: Condition Detail Page (/condition/:slug)
 * Covers: valid slugs render content, unknown slug catch-all redirect,
 *         back navigation, header/footer presence
 */
import { test, expect } from '@playwright/test'

const VALID_SLUGS = [
  'neck-pain',
  'shoulder-pain',
  'back-pain',
  'knee-pain',
  'ankle-foot',
  'hip-pain',
]

test.describe('Condition Detail Page', () => {
  for (const slug of VALID_SLUGS) {
    test(`/condition/${slug} loads without error`, async ({ page }) => {
      const response = await page.goto(`/condition/${slug}`)
      // Should not 404 — the SPA handles routing, so we get 200 HTML
      expect(response?.status()).toBe(200)
      await page.waitForLoadState('networkidle')
    })

    test(`/condition/${slug} renders main content area`, async ({ page }) => {
      await page.goto(`/condition/${slug}`)
      await page.waitForLoadState('networkidle')
      const main = page.locator('main')
      await expect(main).toBeVisible()
      const text = await main.textContent()
      expect(text?.trim().length).toBeGreaterThan(20)
    })
  }

  test('unknown condition slug redirects to home (catch-all)', async ({ page }) => {
    await page.goto('/condition/this-does-not-exist-xyz')
    // The router catch-all redirects to /
    await expect(page).toHaveURL('/')
  })

  test('header and footer present on condition detail page', async ({ page }) => {
    await page.goto('/condition/neck-pain')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('can navigate from What We Treat to a condition detail and back', async ({ page }) => {
    await page.goto('/what-we-treat')
    await page.waitForLoadState('networkidle')
    const link = page.locator('a[href="/condition/neck-pain"]').first()
    await link.click()
    await expect(page).toHaveURL('/condition/neck-pain')
    await page.goBack()
    await expect(page).toHaveURL('/what-we-treat')
  })
})
