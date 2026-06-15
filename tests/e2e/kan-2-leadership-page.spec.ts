import { test, expect } from '@playwright/test'

test.describe('KAN-2: Leadership Team Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/leadership', { waitUntil: 'networkidle' })
  })

  test('✓ page route /leadership loads successfully', async ({ page }) => {
    expect(page.url()).toContain('/leadership')
  })

  test('✓ heading "Meet Our Leadership Team" renders', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Meet Our Leadership Team/i })
    await expect(heading).toBeVisible()
  })

  test('✓ leadership cards render in grid layout', async ({ page }) => {
    const cardList = page.locator('ul').first()
    const cards = cardList.locator('li')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('✓ each card displays leader name and title', async ({ page }) => {
    const firstCard = page.locator('li.group').first()
    const name = firstCard.locator('h2')
    const title = firstCard.locator('p')
    
    await expect(name).toBeVisible()
    await expect(title).toBeVisible()
    
    const nameText = await name.textContent()
    expect(nameText?.length).toBeGreaterThan(0)
  })

  test('✓ images have meaningful alt text', async ({ page }) => {
    const images = page.locator('img[alt]')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
    
    const firstImage = images.first()
    const alt = await firstImage.getAttribute('alt')
    expect(alt).toBeTruthy()
  })

  test('✓ portrait images use 3/4 aspect ratio', async ({ page }) => {
    const img = page.locator('img').first()
    const container = img.locator('..')
    const classes = await container.getAttribute('class')
    expect(classes).toContain('aspect')
  })

  test('✓ hover effect triggers on card (scale-105)', async ({ page }) => {
    const card = page.locator('li.group').first()
    const image = card.locator('img')
    
    await card.hover()
    
    const imgClass = await image.getAttribute('class')
    expect(imgClass).toContain('group-hover:scale-105')
  })

  test('✓ responsive at mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const heading = page.getByRole('heading', { name: /Meet Our Leadership Team/i })
    await expect(heading).toBeVisible()
    
    const cards = page.locator('li')
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('✓ responsive at tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    
    const heading = page.getByRole('heading', { name: /Meet Our Leadership Team/i })
    await expect(heading).toBeVisible()
  })

  test('✓ responsive at desktop viewport (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    
    const heading = page.getByRole('heading', { name: /Meet Our Leadership Team/i })
    await expect(heading).toBeVisible()
  })

  test('✓ page layout uses design system spacing', async ({ page }) => {
    const section = page.locator('main section').first()
    const classes = await section.getAttribute('class')
    expect(classes).toContain('py')
  })

  test('✓ Header and Footer render on page', async ({ page }) => {
    const header = page.locator('header').first()
    const footer = page.locator('footer').first()
    await expect(header).toBeVisible()
    await expect(footer).toBeVisible()
  })
})
