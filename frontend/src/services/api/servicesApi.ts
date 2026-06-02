/**
 * Service layer for the /services endpoint.
 * Pure async functions — no Redux imports.
 */

import type { Service } from '@/data/mock/services'
import { mockServices } from '@/data/mock/services'

// Simulate network latency in dev so loading states are visible
const SIMULATED_DELAY_MS = 300

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchServices(): Promise<Service[]> {
  await delay(SIMULATED_DELAY_MS)
  return mockServices
}

export async function fetchServiceBySlug(slug: string): Promise<Service> {
  await delay(SIMULATED_DELAY_MS)
  const found = mockServices.find((s) => s.slug === slug)
  if (!found) throw new Error(`Service "${slug}" not found`)
  return found
}
