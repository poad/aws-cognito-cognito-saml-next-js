import { defineConfig, includeIgnoreFile } from 'eslint/config';
import { configs, parser } from 'typescript-eslint';
// import { FlatCompat } from '@eslint/eslintrc'

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
      '**/*.js',
      'src/tsconfig.json',
      'src/next-env.d.ts',
      'src/stories',
      'node_modules/**/*',
      './.next/*',
      'api/lambda/graphql/types/generated/graphql.ts',
    ],
  },
  ...configs.strict,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: '19.2',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
    rules: {
      'no-html-link-for-pages': 'off',
    },
  },
);
