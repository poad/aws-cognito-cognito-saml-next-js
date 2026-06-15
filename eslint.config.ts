import { defineConfig, includeIgnoreFile } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import { importX, createNodeResolver } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import pluginPromise from 'eslint-plugin-promise';
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
  ...configs.stylistic,
  // @ts-ignore
  pluginPromise.configs['flat/recommended'],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
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
      'import/internal-regex': '^~/',
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
        createNodeResolver(),
      ],
    },
    plugins: {
      'import-x': importX,
      '@stylistic': stylistic,
    },
    rules: {
      'no-html-link-for-pages': 'off',
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
    },
  },
);
