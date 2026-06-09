import { describe, it, expect, beforeAll } from 'vitest'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import app from '../server.js'

// Must match the secret loaded from .env by the server
const JWT_SECRET = process.env.JWT_SECRET

function makeToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

describe('POST /api/auth/login', () => {
  it('returns 200 with token for valid admin credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password123' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user.role).toBe('admin')
    expect(res.body.user.username).toBe('admin')
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('returns 200 with token for valid client credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'client1', password: 'password123' })
    expect(res.status).toBe(200)
    expect(res.body.user.role).toBe('client')
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'wrongpassword' })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid username or password')
  })

  it('returns 401 for unknown username', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'password123' })
    expect(res.status).toBe(401)
  })

  it('returns 400 when username is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ password: 'password123' })
    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/required/)
  })

  it('returns 400 when password is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin' })
    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/register', () => {
  it('creates a new client user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: `testuser_${Date.now()}`, password: 'pass123', name: 'Test User' })
    expect(res.status).toBe(201)
    expect(res.body.user.role).toBe('client')
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('returns 409 for duplicate username', async () => {
    const username = `dupuser_${Date.now()}`
    await request(app)
      .post('/api/auth/register')
      .send({ username, password: 'pass123' })
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username, password: 'pass123' })
    expect(res.status).toBe(409)
    expect(res.body.message).toBe('Username already taken')
  })

  it('returns 400 when fields missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'onlyuser' })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/auth/me', () => {
  let adminToken

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password123' })
    adminToken = res.body.token
  })

  it('returns 200 with user profile for valid token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('username', 'admin')
    expect(res.body).toHaveProperty('role', 'admin')
    expect(res.body).not.toHaveProperty('passwordHash')
  })

  it('returns 401 with no token', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  it('returns 404 when user in token does not exist', async () => {
    const ghostToken = makeToken({ id: 'nonexistent-id', username: 'ghost', role: 'client' })
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${ghostToken}`)
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('User not found')
  })
})
