/**
 * Feature: How We Can Help
 * Covers: page hero, 8 service cards, CTA section, "Find a Location" link
 */
import { test, expect } from '@playwright/test'

const EXPECTED_SERVICES = [
  'Physical Therapy',
  'Occupational Therapy',
  'Telehealth',
  'Sports Medicine',
  'Work Conditioning',
  'Orthopedic Rehabilitation',
  'Balance & Vestibular',
  "Women's Health",
]

test.describe('How We Can Help Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/how-we-can-help')
    await page.waitForLoadState('networkidle')
  })

  // ── Page hero ──────────────────────────────────────────────────────────────

  test('page loads at /how-we-can-help', async ({ page }) => {
    await expect(page).toHaveURL('/how-we-can-help')
  })

  test('hero heading "How We Can Help" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /how we can help/i }).first()).toBeVisible()
  })

  test('hero subtitle is visible', async ({ page }) => {
    await expect(page.getByText(/comprehensive physical therapy and rehabilitation/i)).toBeVisible()
  })

  // ── Service cards ──────────────────────────────────────────────────────────

  test('renders exactly 8 service cards', async ({ page }) => {
    const section = page.getByRole('region', { name: /our services/i })
    const cards = section.locator('[class*="grid"] > *')
    await expect(cards).toHaveCount(8)
  })

  for (const serviceName of EXPECTED_SERVICES) {
    test(`service card "${serviceName}" is visible`, async ({ page }) => {
      await expect(page.getByText(serviceName).first()).toBeVisible()
    })
  }

  test('each service card shows a description', async ({ page }) => {
    await expect(page.getByText(/evidence-based treatment to restore movement/i)).toBeVisible()
  })

  // ── CTA section ───────────────────────────────────────────────────────────

  test('CTA "Ready to Start Your Recovery?" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /ready to start your recovery/i })).toBeVisible()
  })

  test('CTA "Find a Location" link is present and points to /#locations', async ({ page }) => {
    const link = page.getByRole('link', { name: /find a location/i }).first()
    await expect(link).toBeVisible()
    const href = await link.getAttribute('href')
    expect(href).toContain('locations')
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('renders correctly on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.getByRole('heading', { name: /how we can help/i }).first()).toBeVisible()
    const section = page.getByRole('region', { name: /our services/i })
    const cards = section.locator('[class*="grid"] > *')
    await expect(cards).toHaveCount(8)
  })

  test('renders correctly on desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.getByRole('heading', { name: /how we can help/i }).first()).toBeVisible()
  })

  // ── UI checks ─────────────────────────────────────────────────────────────

  test('header and footer are present on the page', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})
