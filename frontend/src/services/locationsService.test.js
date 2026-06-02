import { describe, it, expect } from 'vitest'
import { fetchLocations, fetchLocationsByIds } from './locationsService'

describe('locationsService', () => {
  it('fetchLocations returns a list', async () => {
    const locs = await fetchLocations()
    expect(Array.isArray(locs)).toBe(true)
    expect(locs.length).toBeGreaterThan(0)
  })

  it('fetchLocationsByIds returns allSettled array', async () => {
    const results = await fetchLocationsByIds(['loc-1', 'bad-id'])
    expect(results).toHaveLength(2)
    expect(results[0]?.status).toBe('fulfilled')
    expect(results[1]?.status).toBe('rejected')
  })
})
