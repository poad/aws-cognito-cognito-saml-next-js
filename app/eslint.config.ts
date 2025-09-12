import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import reactRefresh from "eslint-plugin-react-refresh";
import { configs, parser } from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

 import { includeIgnoreFile } from '@eslint/compat';
 import path from "node:path";
 import { fileURLToPath } from "node:url";

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 const gitignorePath = path.resolve(__dirname, "./.gitignore");

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

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
  ...compat.config({
    extends: ['next'],
    settings: {
      next: {
        rootDir: 'front/',
      },
    },
  }),
  ...configs.strict,
  ...configs.stylistic,
  reactRefresh.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
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
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
    },
  },
);
