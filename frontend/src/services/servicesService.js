/**
 * Services domain — pure async functions, no Redux imports.
 * Delegates to the typed TS layer which returns mock data with simulated latency.
 */
import { fetchServices as _fetchServices } from '@/services/api/servicesApi'

export async function fetchServices() {
  return _fetchServices()
}
