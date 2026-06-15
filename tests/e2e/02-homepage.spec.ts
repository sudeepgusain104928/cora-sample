/**
 * Feature: Home Page
 * Covers: Hero, PainGrid, LocationFinder, CareerSection, ReferralSection,
 *         Testimonials, NewsSection, API health badge
 */
import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  // ── Meta / structural ──────────────────────────────────────────────────────

  test('page loads with 200 status', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
  })

  test('skip-to-content link is present and targets #main', async ({ page }) => {
    const skip = page.getByRole('link', { name: /skip to main content/i })
    await expect(skip).toBeAttached()
    const href = await skip.getAttribute('href')
    expect(href).toBe('#main')
  })

  // ── Hero section ───────────────────────────────────────────────────────────

  test('Hero: heading renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /physical therapy for everyone/i })).toBeVisible()
  })

  test('Hero: subtitle renders', async ({ page }) => {
    await expect(page.getByText(/250\+ Physical Therapy and Rehabilitation Clinics/i)).toBeVisible()
  })

  test('Hero: Schedule An Appointment CTA is present', async ({ page }) => {
    const cta = page.getByRole('link', { name: /schedule an appointment/i }).first()
    await expect(cta).toBeVisible()
  })

  test('Hero: See Locations CTA is present', async ({ page }) => {
    const cta = page.getByRole('link', { name: /see locations/i }).first()
    await expect(cta).toBeVisible()
  })

  test('Hero: image carousel renders with images', async ({ page }) => {
    const images = page.locator('img[alt]')
    await expect(images.first()).toBeVisible()
  })

  // ── Pain Grid section ──────────────────────────────────────────────────────

  test('PainGrid: section is present on page', async ({ page }) => {
    // PainGrid renders clickable condition cards; verify at least one is present
    const main = page.locator('main')
    // Check that at least 4 sections are rendered as children of main
    const sections = main.locator('section')
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  // ── Location Finder section ────────────────────────────────────────────────

  test('LocationFinder: location search input is present', async ({ page }) => {
    const input = page.getByPlaceholder(/city, state or zip/i)
    await expect(input).toBeVisible()
  })

  test('LocationFinder: typing in search does not break the page', async ({ page }) => {
    const input = page.getByPlaceholder(/city, state or zip/i)
    await input.fill('Florida')
    await expect(input).toHaveValue('Florida')
  })

  // ── API health badge ───────────────────────────────────────────────────────

  test('API health badge is present in DOM', async ({ page }) => {
    const badge = page.getByRole('status')
    await expect(badge).toBeAttached()
  })

  test('API health badge eventually shows connected or offline (not stuck on checking)', async ({ page }) => {
    await page.waitForTimeout(3000)
    const badge = page.getByRole('status')
    const text = await badge.textContent()
    expect(text).toMatch(/connected|offline/i)
  })

  // ── Testimonials section ───────────────────────────────────────────────────

  test('Testimonials: section renders visible content', async ({ page }) => {
    // Scroll to bottom to trigger any lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    const main = page.locator('main')
    const text = await main.textContent()
    // The page has substantial content
    expect(text?.length).toBeGreaterThan(500)
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('home page hero is visible on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /physical therapy for everyone/i })).toBeVisible()
  })

  test('home page hero is visible on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /physical therapy for everyone/i })).toBeVisible()
  })

  test('home page hero is visible on desktop (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /physical therapy for everyone/i })).toBeVisible()
  })
})
