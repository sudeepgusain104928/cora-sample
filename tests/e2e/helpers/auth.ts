import { type Page } from '@playwright/test'

export const CREDENTIALS = {
  client: { username: 'client1', password: 'password123' },
  admin: { username: 'admin', password: 'password123' },
  invalid: { username: 'nobody', password: 'wrong' },
}

export async function loginAs(page: Page, role: 'client' | 'admin') {
  const { username, password } = CREDENTIALS[role]
  await page.goto('/login')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /sign in/i }).click()
  // Wait for redirect away from login
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 10_000 })
}

export async function logout(page: Page) {
  const logoutBtn = page.getByRole('button', { name: /log out/i })
  if (await logoutBtn.isVisible()) {
    await logoutBtn.click()
  }
}
