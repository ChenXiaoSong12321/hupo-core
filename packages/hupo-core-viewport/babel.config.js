module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': 'last 2 versions, > 1%, ie >= 10, Chrome >= 29, Firefox >= 55, Safari >= 9, Android >= 4, iOS >= 8',
          'node': '8'
        },
        'modules': 'commonjs',
        'loose': false
      }
    ]
  ],
  'plugins': [
    [
      '@babel/plugin-transform-runtime',
      {
        'helpers': false,
        'regenerator': false
      }
    ]
  ],
  'env': {
    'test': {
      'plugins': [
        'istanbul'
      ]
    }
  }
}
