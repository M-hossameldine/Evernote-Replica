module.exports = {
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  plugins: ['react'],
  env: {
    node: true,
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  rules: {
    // Add your own rules here to override ones from the extended configs.
    'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
    '@typescript-eslint/consistent-type-imports': [
      2,
      { fixStyle: 'separate-type-imports' },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/forbid-dom-props': [2, { forbid: ['style'] }],
    'react/forbid-component-props': [2, { forbid: ['style'] }],
    'react/jsx-no-useless-fragment': [
      2,
      {
        allowExpressions: false,
        allowEmpty: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
