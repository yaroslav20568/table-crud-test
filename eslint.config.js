import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import simpleImportSort from 'eslint-plugin-simple-import-sort';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores([
    'dist',
    '.next',
    'out',
    'build',
    'node_modules',
    'next-env.d.ts'
  ]),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'no-relative-import-paths': noRelativeImportPaths,
      prettier: prettierPlugin
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none'
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@/app'],
            ['^@/pages'],
            ['^@/widgets'],
            ['^@/features'],
            ['^@/entities'],
            ['^@/shared'],
            ['^@/'],
            ['^\\../', '^\\./'],
            ['^@/styles', '^@/modules/.+\\.s?css$', '\\.s?css$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/.*\\.(ts|tsx)$/]',
          message: 'Remove .ts/.tsx file extension from import.'
        },
        {
          selector: 'ExportAllDeclaration[source.value=/.*\\.(ts|tsx)$/]',
          message: 'Remove .ts/.tsx file extension from export.'
        },
        {
          selector: 'ExportNamedDeclaration[source.value=/.*\\.(ts|tsx)$/]',
          message: 'Remove .ts/.tsx file extension from export.'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/index'],
              message: "Remove '/index' from import path."
            }
          ]
        }
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
          prefix: '@',
          rootDir: 'src'
        }
      ],
      'prettier/prettier': 'error'
    }
  },
  prettierConfig
]);
