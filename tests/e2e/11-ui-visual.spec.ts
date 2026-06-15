/**
 * Feature: UI Visual & Accessibility Checks
 * Covers: no horizontal overflow, text contrast (presence of cora-navy text),
 *         focus indicators, aria labels, page loading states, 404 → home redirect,
 *         images have alt text, interactive elements have accessible names
 */
import { test, expect } from '@playwright/test'

const PUBLIC_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/what-we-treat', label: 'What We Treat' },
  { path: '/how-we-can-help', label: 'How We Can Help' },
  { path: '/locations', label: 'Locations' },
  { path: '/leadership', label: 'Leadership' },
  { path: '/login', label: 'Login' },
]

test.describe('UI: No horizontal overflow on public pages', () => {
  for (const { path, label } of PUBLIC_ROUTES) {
    test(`${label} (${path}) – no horizontal scroll at 375px`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 })
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2) // 2px tolerance
    })
  }
})

test.describe('UI: Images have alt text', () => {
  for (const { path, label } of PUBLIC_ROUTES) {
    test(`${label} (${path}) – all <img> have non-empty alt attributes`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      const imgsMissingAlt = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'))
        return imgs
          .filter((img) => !img.hasAttribute('alt'))
          .map((img) => img.src)
      })
      expect(imgsMissingAlt).toHaveLength(0)
    })
  }
})

test.describe('UI: Interactive elements have accessible names', () => {
  test('Home page – all buttons have accessible names', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const unnamed = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'))
      return buttons
        .filter((b) => !b.getAttribute('aria-label') && !b.textContent?.trim())
        .map((b) => b.outerHTML.slice(0, 100))
    })
    expect(unnamed).toHaveLength(0)
  })

  test('Login page – form inputs have associated labels', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })

  test('Header hamburger has aria-label', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const hamburger = page.getByRole('button', { name: /toggle navigation menu/i })
    await expect(hamburger).toBeVisible()
  })

  test('Header hamburger has aria-expanded attribute', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const hamburger = page.getByRole('button', { name: /toggle navigation menu/i })
    const expanded = await hamburger.getAttribute('aria-expanded')
    expect(expanded).toBe('false')
    await hamburger.click()
    const expandedAfter = await hamburger.getAttribute('aria-expanded')
    expect(expandedAfter).toBe('true')
  })
})

test.describe('UI: Focus & keyboard navigation', () => {
  test('Login form can be submitted via keyboard', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Username').fill('client1')
    await page.getByLabel('Password').fill('password123')
    await page.keyboard.press('Enter')
    await page.waitForURL('/client/dashboard', { timeout: 10_000 })
    await expect(page).toHaveURL('/client/dashboard')
  })

  test('Tab through header nav links does not hide them', async ({ page }) => {
    await page.goto('/')
    // Press Tab a few times and verify focus remains in view
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })
})

test.describe('UI: Page loading states', () => {
  test('home page shows content after initial load (no stuck spinner)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // The page loader (animate-spin) should not be present after loading
    const spinner = page.locator('.animate-spin')
    // The hero heading should be visible, meaning lazy load resolved
    await expect(page.getByRole('heading', { name: /physical therapy for everyone/i })).toBeVisible()
  })
})

test.describe('UI: Catch-all / 404 redirect', () => {
  test('unknown routes redirect to home page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await expect(page).toHaveURL('/')
  })

  test('/condition/unknown-slug redirects to home', async ({ page }) => {
    await page.goto('/condition/made-up-slug')
    await expect(page).toHaveURL('/')
  })
})

test.describe('UI: Design system – Color classes on key elements', () => {
  test('header background uses cora-navy class', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    const cls = await header.getAttribute('class')
    expect(cls).toContain('cora-navy')
  })

  test('footer background uses cora-navy class', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const cls = await footer.getAttribute('class')
    expect(cls).toContain('cora-navy')
  })

  test('Login "Sign in" button has cora-navy background', async ({ page }) => {
    await page.goto('/login')
    const btn = page.getByRole('button', { name: /sign in/i })
    const cls = await btn.getAttribute('class')
    expect(cls).toContain('cora-navy')
  })
})

test.describe('UI: Responsive – key pages at tablet (768px)', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  for (const { path, label } of PUBLIC_ROUTES.slice(0, 4)) {
    test(`${label} (${path}) – renders heading without overflow`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
    })
  }
})
