import { describe, it, expect, beforeAll } from 'vitest'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import app from '../server.js'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret'

function makeClientToken(payload) {
  return jwt.sign({ role: 'client', ...payload }, JWT_SECRET, { expiresIn: '1h' })
}

let clientToken, adminToken

beforeAll(async () => {
  const adminRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'admin', password: 'password123' })
  adminToken = adminRes.body.token

  const clientRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'client1', password: 'password123' })
  clientToken = clientRes.body.token
})

describe('GET /api/client/me', () => {
  it('returns 200 with client profile for valid client token', async () => {
    const res = await request(app)
      .get('/api/client/me')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(res.status).toBe(200)
    expect(res.body.role).toBe('client')
    expect(res.body).toHaveProperty('username')
    expect(res.body).not.toHaveProperty('passwordHash')
  })

  it('returns 401 when no token provided', async () => {
    const res = await request(app).get('/api/client/me')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Access token required')
  })

  it('returns 403 when admin token used on client route', async () => {
    const res = await request(app)
      .get('/api/client/me')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(403)
  })

  it('returns 404 when client user in token does not exist', async () => {
    const ghostToken = makeClientToken({ id: 'nonexistent-id', username: 'ghost' })
    const res = await request(app)
      .get('/api/client/me')
      .set('Authorization', `Bearer ${ghostToken}`)
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('User not found')
  })
})
