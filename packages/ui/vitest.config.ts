import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    coverage: {
      provider: 'v8',
      exclude: ['src/icons/**', '**/*.stories.*'],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
    },
  },
})
