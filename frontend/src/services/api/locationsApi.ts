/**
 * Service layer for the /locations endpoint.
 * Pure async functions — no Redux imports.
 */

import type { Location } from '@/data/mock/locations'
import { mockLocations } from '@/data/mock/locations'

const SIMULATED_DELAY_MS = 300

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchLocations(): Promise<Location[]> {
  await delay(SIMULATED_DELAY_MS)
  return mockLocations
}

export async function fetchLocationById(id: string): Promise<Location> {
  await delay(SIMULATED_DELAY_MS)
  const found = mockLocations.find((l) => l.id === id)
  if (!found) throw new Error(`Location "${id}" not found`)
  return found
}

/**
 * Demonstrates Promise.allSettled: load several locations in parallel where
 * individual failures don't break the whole page.
 */
export async function fetchLocationsByIds(
  ids: string[],
): Promise<Array<PromiseSettledResult<Location>>> {
  return Promise.allSettled(ids.map((id) => fetchLocationById(id)))
}
