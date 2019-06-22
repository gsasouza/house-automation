const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const dev = process.env.NODE_ENV !== 'production';

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
    : [new Dotenv({ systemvars: true }), HTMLWebpackPluginConfig, DefinePluginConfig, ],
  node: {
    '*': 'empty'
  }
};
