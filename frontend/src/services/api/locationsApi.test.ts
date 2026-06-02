import { describe, it, expect } from 'vitest'
import { fetchLocations, fetchLocationById, fetchLocationsByIds } from './locationsApi'

describe('locationsApi', () => {
  it('fetchLocations returns an array', async () => {
    const locs = await fetchLocations()
    expect(Array.isArray(locs)).toBe(true)
    expect(locs.length).toBeGreaterThan(0)
  })

  it('fetchLocations returns objects with required fields', async () => {
    const locs = await fetchLocations()
    const first = locs[0]
    expect(first).toBeDefined()
    expect(first).toHaveProperty('id')
    expect(first).toHaveProperty('city')
    expect(first).toHaveProperty('services')
  })

  it('fetchLocationById returns the matching location', async () => {
    const loc = await fetchLocationById('loc-1')
    expect(loc.id).toBe('loc-1')
  })

  it('fetchLocationById throws for unknown id', async () => {
    await expect(fetchLocationById('xyz-999')).rejects.toThrow(
      'Location "xyz-999" not found',
    )
  })

  it('fetchLocationsByIds returns allSettled results', async () => {
    const results = await fetchLocationsByIds(['loc-1', 'loc-999'])
    expect(results).toHaveLength(2)
    expect(results[0]?.status).toBe('fulfilled')
    expect(results[1]?.status).toBe('rejected')
  })

  it('fetchLocationsByIds all fulfilled for valid ids', async () => {
    const results = await fetchLocationsByIds(['loc-1', 'loc-2'])
    expect(results.every((r) => r.status === 'fulfilled')).toBe(true)
  })
})
