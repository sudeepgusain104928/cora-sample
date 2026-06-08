import { http, HttpResponse } from 'msw'

export const defaultHandlers = [
  http.post('http://localhost/api/auth/login', () =>
    HttpResponse.json({
      token: 'fake-token-admin',
      user: { id: '1', username: 'admin', name: 'Admin User', role: 'admin' },
    }),
  ),
  http.get('http://localhost/api/locations', () =>
    HttpResponse.json([
      {
        id: '1',
        city: 'Jacksonville',
        state: 'Florida',
        address: '6100 Kennerly Rd.',
        phone: '(904) 739-9901',
        lat: 30.27,
        lng: -81.5,
      },
      {
        id: '2',
        city: 'Orlando',
        state: 'Florida',
        address: '4100 W. Fairbanks Ave.',
        phone: '(407) 539-2099',
        lat: 28.59,
        lng: -81.4,
      },
      {
        id: '3',
        city: 'Tampa',
        state: 'Florida',
        address: '3802 Gunn Hwy.',
        phone: '(813) 265-3233',
        lat: 28.07,
        lng: -82.5,
      },
    ]),
  ),
]
