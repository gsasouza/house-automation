const path = require('path');

const Dotenv = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || '7002';
const cwd = process.cwd();

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: 'src/index.html',
  inject: true,
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  context: cwd,
  devServer: {
    host: 'localhost',
    port: PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    path: path.join(cwd, '/build'),
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [new Dotenv({ systemvars: true }), HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [new Dotenv({ systemvars: true }), HTMLWebpackPluginConfig, DefinePluginConfig],
  node: {
    '*': 'empty',
  },
};
