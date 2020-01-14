// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': 0,
    'no-unused-vars': 0,
    'no-debugger': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
