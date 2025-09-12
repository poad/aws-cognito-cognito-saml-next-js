import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import reactRefresh from "eslint-plugin-react-refresh";
import { configs, parser } from 'typescript-eslint';
// import { FlatCompat } from '@eslint/eslintrc'
 
 import { includeIgnoreFile } from '@eslint/compat';
 import path from "node:path";
 import { fileURLToPath } from "node:url";
 
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 const gitignorePath = path.resolve(__dirname, "./.gitignore");
 
// const compat = new FlatCompat({
//   // import.meta.dirname is available after Node.js v20.11.0
//   baseDirectory: import.meta.dirname,
// });

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'src/tsconfig.json',
      'src/next-env.d.ts',
      'src/stories',
      'node_modules/**/*',
      './.next/*',
      'api/lambda/graphql/types/generated/graphql.ts',
    ],
  },
  // ...compat.config({
  //   extends: ['next'],
  //   settings: {
  //     next: {
  //       rootDir: 'front/',
  //     },
  //   },
  // }),
  ...configs.strict,
  ...configs.stylistic,
  // @ts-ignore
  pluginPromise.configs['flat/recommended'],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    plugins: {
      react,
      '@stylistic': stylistic,
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      'no-html-link-for-pages': 'off',
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
    },
  },
);
