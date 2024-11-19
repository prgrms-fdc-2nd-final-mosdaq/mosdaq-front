import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 기본 설정
  {
    ignores: ['dist'],
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 경로 설정
  {
    settings: {
      'import/resolver': {
        alias: {
          map: ['@', './src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  // 기본 플러그인 설정
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // 상세 규칙 설정
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React 관련 규칙
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',

      // React Hooks 관련 규칙
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 일반 규칙
      'no-unexpected-multiline': 'warn',
    },
  },
];
