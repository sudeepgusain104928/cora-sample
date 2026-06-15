/**
 * Feature: What We Treat
 * Covers: page hero, 6 condition category cards, card content, links to condition detail
 */
import { test, expect } from '@playwright/test'

const EXPECTED_CONDITIONS = [
  { name: 'Neck Pain & Injuries', slug: 'neck-pain' },
  { name: 'Shoulder Pain & Injuries', slug: 'shoulder-pain' },
  { name: 'Back Pain & Spine Conditions', slug: 'back-pain' },
  { name: 'Knee Pain & Injuries', slug: 'knee-pain' },
  { name: 'Ankle & Foot Conditions', slug: 'ankle-foot' },
  { name: 'Hip Pain & Injuries', slug: 'hip-pain' },
]

test.describe('What We Treat Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/what-we-treat')
    await page.waitForLoadState('networkidle')
  })

  // ── Page hero ──────────────────────────────────────────────────────────────

  test('page loads at /what-we-treat', async ({ page }) => {
    await expect(page).toHaveURL('/what-we-treat')
  })

  test('hero heading "What We Treat" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /what we treat/i }).first()).toBeVisible()
  })

  test('hero subtitle is visible', async ({ page }) => {
    await expect(page.getByText(/musculoskeletal conditions/i)).toBeVisible()
  })

  // ── Condition category cards ───────────────────────────────────────────────

  test('renders exactly 6 condition categories', async ({ page }) => {
    const section = page.getByRole('region', { name: /condition categories/i })
    const cards = section.locator('[class*="grid"] > *')
    await expect(cards).toHaveCount(6)
  })

  for (const { name, slug } of EXPECTED_CONDITIONS) {
    test(`category card "${name}" is visible`, async ({ page }) => {
      await expect(page.getByText(name)).toBeVisible()
    })

    test(`category card "${name}" links to /condition/${slug}`, async ({ page }) => {
      const link = page.getByRole('link', { name: new RegExp(`learn more.*${name}`, 'i') })
        .or(page.locator(`a[href="/condition/${slug}"]`)).first()
      await expect(link).toBeAttached()
      const href = await link.getAttribute('href')
      expect(href).toContain(slug)
    })
  }

  test('each category card shows an intro description', async ({ page }) => {
    // First card intro text
    await expect(page.getByText(/specialize in treating a range of neck conditions/i)).toBeVisible()
  })

  test('each category card lists treated conditions', async ({ page }) => {
    await expect(page.getByText(/cervical disc disease/i)).toBeVisible()
    await expect(page.getByText(/rotator cuff tears/i)).toBeVisible()
  })

  // ── Navigation to condition detail ────────────────────────────────────────

  test('clicking neck-pain card navigates to /condition/neck-pain', async ({ page }) => {
    const link = page.locator('a[href="/condition/neck-pain"]').first()
    await link.click()
    await expect(page).toHaveURL('/condition/neck-pain')
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('renders correctly on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.getByRole('heading', { name: /what we treat/i }).first()).toBeVisible()
    const section = page.getByRole('region', { name: /condition categories/i })
    const cards = section.locator('[class*="grid"] > *')
    await expect(cards).toHaveCount(6)
  })

  test('renders correctly on desktop (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await expect(page.getByRole('heading', { name: /what we treat/i }).first()).toBeVisible()
  })

  // ── UI checks ─────────────────────────────────────────────────────────────

  test('header and footer are present on the page', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})
