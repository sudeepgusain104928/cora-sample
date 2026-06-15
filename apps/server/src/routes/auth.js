import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import { addUser, findUserById, findUserByUsername, userExists } from '../data/seed.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '8h'

function signToken(user) {
  const payload = { id: user.id, username: user.username, role: user.role }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

function safeUser(user) {
  return { id: user.id, username: user.username, name: user.name, role: user.role }
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const user = findUserByUsername(username)

  // Constant-time comparison regardless of whether the user exists
  const passwordMatch = user ? await bcrypt.compare(password, user.passwordHash) : false

  if (!user || !passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  return res.json({ token: signToken(user), user: safeUser(user) })
})

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  if (userExists(username)) {
    return res.status(409).json({ message: 'Username already taken' })
  }

  const newUser = await addUser({ username, password, name })
  return res.status(201).json({ token: signToken(newUser), user: safeUser(newUser) })
})

// GET /api/auth/me  (protected — requires valid JWT)
router.get('/me', authenticateToken, (req, res) => {
  const user = findUserById(req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  return res.json(safeUser(user))
})

export default router
