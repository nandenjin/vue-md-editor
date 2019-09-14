module.exports = {
  parser:  'vue-eslint-parser',
  extends:  [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': false
      }
    ]
  }
}
