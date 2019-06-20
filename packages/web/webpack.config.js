const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const cwd = process.cwd();

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  inject: true,
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  context: cwd,
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  entry: ['react-hot-loader/patch', './src/App.tsx'],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.join(cwd, '/build'),
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [HTMLWebpackPluginConfig, DefinePluginConfig],
};
