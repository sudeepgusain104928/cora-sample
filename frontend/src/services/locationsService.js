/**
 * Locations domain — pure async functions, no Redux imports.
 * Delegates to the typed TS layer which returns mock data with simulated latency.
 */
import {
  fetchLocations as _fetchLocations,
  fetchLocationsByIds as _fetchLocationsByIds,
} from '@/services/api/locationsApi'

export async function fetchLocations() {
  return _fetchLocations()
}

/**
 * Demonstrates Promise.allSettled: load multiple locations in parallel
 * where individual failures don't break the whole request.
 */
export async function fetchLocationsByIds(ids) {
  return _fetchLocationsByIds(ids)
}
