module.exports = {
  extends: ['airbnb-base'],
  env: {
    es6: true,
    browser: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 'error'
  }
};
