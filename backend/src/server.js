import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { mockServices, mockLocations } from './mockData.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET ?? 'cora-dev-secret-change-in-prod'
const JWT_EXPIRES_IN = '8h'
const SALT_ROUNDS = 10

// ---------------------------------------------------------------------------
// In-memory user store — seeded at startup
// ---------------------------------------------------------------------------

const users = []

async function seedUsers() {
  const hash = await bcrypt.hash('password123', SALT_ROUNDS)
  users.push(
    { id: 'user-client-01', name: 'John Client',  email: 'client@cora.com', role: 'client', passwordHash: hash },
    { id: 'user-admin-01',  name: 'Sarah Admin',  email: 'admin@cora.com',  role: 'admin',  passwordHash: hash },
  )
  console.log('[seed] Users ready:', users.map((u) => u.email))
}

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email, role: u.role }
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

function requireAuth(req, res, next) {
  const header = req.headers['authorization'] ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing bearer token' })

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' })
    }
    next()
  })
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? true,
  }),
)
app.use(express.json())

// ---------------------------------------------------------------------------
// Auth routes
// ---------------------------------------------------------------------------

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  const user = users.find((u) => u.email === email)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  )

  res.json({ token, user: publicUser(user) })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = users.find((u) => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user: publicUser(user) })
})

// ---------------------------------------------------------------------------
// Application routes
// ---------------------------------------------------------------------------

app.get('/api/services', requireAuth, (req, res) => {
  res.json(mockServices)
})

app.get('/api/services/:slug', requireAuth, (req, res) => {
  const service = mockServices.find((s) => s.slug === req.params.slug)
  if (!service) return res.status(404).json({ error: `Service "${req.params.slug}" not found` })
  res.json(service)
})

app.get('/api/locations', requireAuth, (req, res) => {
  const { city, state, service } = req.query
  let results = mockLocations

  if (city)    results = results.filter((l) => l.city.toLowerCase()  === city.toLowerCase())
  if (state)   results = results.filter((l) => l.state.toLowerCase() === state.toLowerCase())
  if (service) results = results.filter((l) =>
    l.services.some((s) => s.toLowerCase().includes(service.toLowerCase())),
  )

  res.json(results)
})

app.get('/api/locations/:id', requireAuth, (req, res) => {
  const location = mockLocations.find((l) => l.id === req.params.id)
  if (!location) return res.status(404).json({ error: `Location "${req.params.id}" not found` })
  res.json(location)
})

// Admin-only example — list all users
app.get('/api/admin/users', requireAdmin, (_req, res) => {
  res.json(users.map(publicUser))
})

// Health check (unauthenticated)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

const port = Number(process.env.PORT ?? 3001)

seedUsers().then(() => {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`)
  })
})
