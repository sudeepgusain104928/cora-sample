// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      // Register withErrorBoundary so react-refresh allows HOC default exports
      {
        ...reactRefresh.configs.vite,
        rules: {
          ...reactRefresh.configs.vite.rules,
          'react-refresh/only-export-components': [
            'warn',
            { extraHOCs: ['withErrorBoundary'] },
          ],
        },
      },
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  ...storybook.configs['flat/recommended'],
  // Storybook decorators are called as render functions, not as React components,
  // so react-hooks/rules-of-hooks gives false positives for useMemo inside them.
  {
    files: ['storybook/**/*.{js,jsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
])
