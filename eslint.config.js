// import { defineConfig, globalIgnores } from 'eslint/config'
// import globals from 'globals'
// import js from '@eslint/js'
// import pluginVue from 'eslint-plugin-vue'
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
// import tsPlugin from '@typescript-eslint/eslint-plugin'

// export default defineConfig([
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{js,mjs,jsx,vue,ts}'],
//   },

//   globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//       },
//     },
//   },

//   js.configs.recommended,
//   ...pluginVue.configs['flat/essential'],
//   skipFormatting,
// ])
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig({
  ignorePatterns: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],

  overrides: [
    {
      files: ['**/*.{js,mjs,jsx,vue,ts}'],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
      ...js.configs.recommended,
      ...pluginVue.configs['flat/essential'],
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {},
    },
  ],

  plugins: ['vue', '@typescript-eslint'],

  globals,
  ignorePatterns: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
})
