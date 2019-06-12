module.exports = {
  presets: [
    '@babel/react',
    '@babel/typescript',
    '@zeit/next-typescript/babel',
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
