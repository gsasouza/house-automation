const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const cwd = process.cwd();

module.exports = {
  context: path.resolve(cwd, './'),
  entry: ['./src/index.tsx'],
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(cwd, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.join(cwd, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ts|\.tsx|\.js|\.jsx$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: ['babel-loader', 'awesome-typescript-loader'],
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunksSortMode: 'none',
    }),
  ]
}
