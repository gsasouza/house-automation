module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/typescript',
      {
        allExtensions: true
      }
    ],
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
}
