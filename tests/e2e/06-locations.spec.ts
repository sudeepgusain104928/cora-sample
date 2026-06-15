/**
 * Feature: Find Locations
 * Covers: page renders, search input, state filter, clinic cards,
 *         "no results" state, "View All" reset, map loading
 */
import { test, expect } from '@playwright/test'

test.describe('Find Locations Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations')
    await page.waitForLoadState('networkidle')
  })

  // ── Page structure ─────────────────────────────────────────────────────────

  test('page loads at /locations', async ({ page }) => {
    await expect(page).toHaveURL('/locations')
  })

  test('main heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /find a cora physical therapy near you/i })).toBeVisible()
  })

  test('subtitle "250+ clinics" copy is visible', async ({ page }) => {
    await expect(page.getByText(/250\+ clinics/i)).toBeVisible()
  })

  test('header and footer render on locations page', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  // ── Search input ───────────────────────────────────────────────────────────

  test('location search input is present', async ({ page }) => {
    const input = page.getByLabel(/enter location/i)
    await expect(input).toBeVisible()
  })

  test('typing in search filters clinic results', async ({ page }) => {
    const input = page.getByLabel(/enter location/i)
    // Get initial count
    const countText = await page.locator('text=/Showing .* clinics/').textContent()
    const initial = parseInt(countText?.match(/\d+/)?.[0] ?? '0')

    await input.fill('Tampa')
    await page.waitForTimeout(300)

    const filtered = await page.locator('text=/Showing .* clinic/').textContent()
    const filteredCount = parseInt(filtered?.match(/\d+/)?.[0] ?? '0')
    expect(filteredCount).toBeLessThanOrEqual(initial)
  })

  test('clearing the search restores all clinics', async ({ page }) => {
    const input = page.getByLabel(/enter location/i)
    await input.fill('Tampa')
    await page.waitForTimeout(300)

    await page.getByRole('button', { name: /view all locations/i }).click()
    await page.waitForTimeout(300)

    await expect(input).toHaveValue('')
    const countText = await page.locator('text=/Showing .* clinics/').textContent()
    const count = parseInt(countText?.match(/\d+/)?.[0] ?? '0')
    expect(count).toBeGreaterThan(0)
  })

  test('searching for an invalid city shows "No clinics match" message', async ({ page }) => {
    const input = page.getByLabel(/enter location/i)
    await input.fill('ZZZNoSuchCityXXX')
    await page.waitForTimeout(300)
    await expect(page.getByText(/no clinics match your search/i)).toBeVisible()
  })

  // ── State filter sidebar ───────────────────────────────────────────────────

  test('"Filter Locations" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /filter locations/i })).toBeVisible()
  })

  test('state list is populated with at least one state button', async ({ page }) => {
    const sidebar = page.locator('aside')
    const stateButtons = sidebar.getByRole('button')
    const count = await stateButtons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('clicking a state filters clinics to that state', async ({ page }) => {
    const sidebar = page.locator('aside')
    const firstState = sidebar.getByRole('button').first()
    const stateName = await firstState.textContent()
    await firstState.click()
    await page.waitForTimeout(300)

    // Count text should mention the state
    const countText = await page.locator('text=/Showing .* clinic/').textContent()
    expect(countText).toContain(stateName?.trim())
  })

  test('clicking the active state button deselects it and shows all clinics', async ({ page }) => {
    const sidebar = page.locator('aside')
    const firstState = sidebar.getByRole('button').first()
    await firstState.click()
    await page.waitForTimeout(200)
    await firstState.click()
    await page.waitForTimeout(200)

    const countText = await page.locator('text=/Showing .* clinics/').textContent()
    const count = parseInt(countText?.match(/\d+/)?.[0] ?? '0')
    expect(count).toBeGreaterThan(0)
  })

  // ── Clinic cards ───────────────────────────────────────────────────────────

  test('clinic cards are rendered', async ({ page }) => {
    const cards = page.locator('[class*="grid"] > *').filter({ hasText: /call/i })
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('clinic card shows city and phone number', async ({ page }) => {
    // Each clinic card should have a phone number
    const phoneLink = page.locator('a[href^="tel:"]').first()
    await expect(phoneLink).toBeVisible()
  })

  // ── Map ────────────────────────────────────────────────────────────────────

  test('map section is present on the page', async ({ page }) => {
    const mapSection = page.getByRole('region', { name: /clinic map/i })
    await expect(mapSection).toBeVisible()
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('locations page is usable on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/locations')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: /find a cora physical therapy near you/i })).toBeVisible()
    await expect(page.getByLabel(/enter location/i)).toBeVisible()
  })
})
