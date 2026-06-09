import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import adminRouter from './routes/admin.js'
import authRouter from './routes/auth.js'
import clientRouter from './routes/client.js'
import locationsRouter from './routes/locations.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? true,
  }),
)
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

// Routes for authentication, locations, client, and admin
app.use('/api/auth', authRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/client', clientRouter)
app.use('/api/admin', adminRouter)

// Only listen when run directly (not imported by tests)
if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT ?? 5000)
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`)
  })
}

export default app
