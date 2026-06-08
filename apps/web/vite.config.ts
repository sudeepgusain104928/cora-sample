import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cora/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    env: {
      VITE_API_URL: 'http://localhost/api',
    },
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/data/**',
        '**/*.stories.*',
        'src/context/**',
        'src/components/ProtectedRoute.tsx',
        'src/components/PublicRoute.tsx',
        'src/pages/DashboardPage.tsx',
        'src/services/authService.ts',
      ],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
    },
  },
})
