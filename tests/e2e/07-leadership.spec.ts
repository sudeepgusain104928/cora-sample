/**
 * Feature: Leadership Page
 * Covers: heading, grid of leader cards, card content (name, title, image),
 *         hover effects, responsive viewports
 */
import { test, expect } from '@playwright/test'

test.describe('Leadership Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/leadership')
    await page.waitForLoadState('networkidle')
  })

  // ── Page structure ─────────────────────────────────────────────────────────

  test('page loads at /leadership', async ({ page }) => {
    await expect(page).toHaveURL('/leadership')
  })

  test('"Meet Our Leadership Team" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /meet our leadership team/i })).toBeVisible()
  })

  test('header and footer are present', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  // ── Leader cards ───────────────────────────────────────────────────────────

  test('leadership grid renders at least one card', async ({ page }) => {
    const cards = page.locator('ul').first().locator('li')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('each leader card displays a name', async ({ page }) => {
    const firstCard = page.locator('li.group').first()
    const name = firstCard.locator('h2')
    await expect(name).toBeVisible()
    const text = await name.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })

  test('each leader card displays a title', async ({ page }) => {
    const firstCard = page.locator('li.group').first()
    const title = firstCard.locator('p')
    await expect(title).toBeVisible()
  })

  test('leader card images have alt text', async ({ page }) => {
    const images = page.locator('li.group img')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
    const alt = await images.first().getAttribute('alt')
    expect(alt?.trim().length).toBeGreaterThan(0)
  })

  test('leader card images use aspect-ratio class', async ({ page }) => {
    const imgContainer = page.locator('li.group').first().locator('div').first()
    const classes = await imgContainer.getAttribute('class')
    expect(classes).toContain('aspect')
  })

  test('leader card has hover scale class on image', async ({ page }) => {
    const firstImg = page.locator('li.group img').first()
    const cls = await firstImg.getAttribute('class')
    expect(cls).toContain('group-hover:scale-105')
  })

  test('hovering on a card does not cause layout shift', async ({ page }) => {
    const card = page.locator('li.group').first()
    const box1 = await card.boundingBox()
    await card.hover()
    await page.waitForTimeout(400)
    const box2 = await card.boundingBox()
    expect(box1?.x).toBeCloseTo(box2?.x ?? 0, 0)
    expect(box1?.y).toBeCloseTo(box2?.y ?? 0, 0)
  })

  // ── Responsive layout ──────────────────────────────────────────────────────

  test('renders heading on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.getByRole('heading', { name: /meet our leadership team/i })).toBeVisible()
  })

  test('renders heading on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: /meet our leadership team/i })).toBeVisible()
  })

  test('renders heading on desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.getByRole('heading', { name: /meet our leadership team/i })).toBeVisible()
  })

  // ── Design system spacing ──────────────────────────────────────────────────

  test('section has vertical padding (design system spacing)', async ({ page }) => {
    const section = page.locator('main section').first()
    const classes = await section.getAttribute('class')
    expect(classes).toMatch(/py-/)
  })
})
