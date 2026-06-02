export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  hours: string
  services: string[]
  lat: number
  lng: number
}

export const mockLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'CORA Physical Therapy – Downtown Orlando',
    address: '123 Orange Ave',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    phone: '407-555-0101',
    hours: 'Mon–Fri 7am–7pm, Sat 8am–2pm',
    services: ['Physical Therapy', 'Dry Needling', 'Sports Performance'],
    lat: 28.5384,
    lng: -81.3789,
  },
  {
    id: 'loc-2',
    name: 'CORA Physical Therapy – Winter Park',
    address: '456 Park Ave N',
    city: 'Winter Park',
    state: 'FL',
    zip: '32789',
    phone: '407-555-0202',
    hours: 'Mon–Fri 8am–6pm',
    services: ['Physical Therapy', 'Pelvic Health', 'TeleHealth'],
    lat: 28.5999,
    lng: -81.3514,
  },
  {
    id: 'loc-3',
    name: 'CORA Physical Therapy – Lake Nona',
    address: '789 Narcoossee Rd',
    city: 'Orlando',
    state: 'FL',
    zip: '32832',
    phone: '407-555-0303',
    hours: 'Mon–Fri 7am–7pm',
    services: ['Physical Therapy', 'Occupational Therapy', 'Sports Performance'],
    lat: 28.3861,
    lng: -81.2522,
  },
  {
    id: 'loc-4',
    name: 'CORA Physical Therapy – Tampa Westshore',
    address: '321 S Dale Mabry Hwy',
    city: 'Tampa',
    state: 'FL',
    zip: '33609',
    phone: '813-555-0404',
    hours: 'Mon–Fri 7am–7pm, Sat 8am–12pm',
    services: ['Physical Therapy', 'Dry Needling', 'Pelvic Health'],
    lat: 27.9506,
    lng: -82.4572,
  },
  {
    id: 'loc-5',
    name: 'CORA Physical Therapy – Gainesville',
    address: '500 NW 8th Ave',
    city: 'Gainesville',
    state: 'FL',
    zip: '32601',
    phone: '352-555-0505',
    hours: 'Mon–Fri 8am–6pm',
    services: ['Physical Therapy', 'TeleHealth', 'Sports Performance'],
    lat: 29.6516,
    lng: -82.3248,
  },
]
