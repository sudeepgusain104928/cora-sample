import { describe, it, expect } from 'vitest'
import { fetchServices, fetchServiceBySlug } from './servicesApi'

describe('servicesApi', () => {
  it('fetchServices returns an array of services', async () => {
    const services = await fetchServices()
    expect(Array.isArray(services)).toBe(true)
    expect(services.length).toBeGreaterThan(0)
  })

  it('fetchServices returns objects with required fields', async () => {
    const services = await fetchServices()
    const first = services[0]
    expect(first).toBeDefined()
    expect(first).toHaveProperty('id')
    expect(first).toHaveProperty('name')
    expect(first).toHaveProperty('slug')
    expect(first).toHaveProperty('conditions')
  })

  it('fetchServiceBySlug returns the matching service', async () => {
    const service = await fetchServiceBySlug('physical-therapy')
    expect(service.slug).toBe('physical-therapy')
    expect(service.name).toBe('Physical Therapy')
  })

  it('fetchServiceBySlug throws for an unknown slug', async () => {
    await expect(fetchServiceBySlug('does-not-exist')).rejects.toThrow(
      'Service "does-not-exist" not found',
    )
  })
})
