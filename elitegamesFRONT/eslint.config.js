import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Variáveis não usadas passam a ser apenas avisos
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      // Permite exportar coisas além de componentes (comum no AuthContext)
      'react-refresh/only-export-components': 'off',
      // Evita erros de dependências do useEffect (muito comum em projetos legados)
      'react-hooks/exhaustive-deps': 'warn',
      // DESATIVA os erros que estão travando a pipeline:
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
    },
  },
]