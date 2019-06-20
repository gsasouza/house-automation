module.exports = {
  presets: [
    '@babel/react',
    '@babel/typescript',
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        }
      }
    ]
  ],
  plugins: [
    "relay"
  ]

}
