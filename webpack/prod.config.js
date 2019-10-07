const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./base.config.js');
const CopyPlugin = require('copy-webpack-plugin');

const buildPath = path.join(process.cwd(), 'build');

module.exports = merge(baseConfig, {
  output: {
    path: buildPath,
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
    ],
  },

  plugins: [
    new CopyPlugin([
      { from: './src/sw.js', to: buildPath },
      { from: './src/manifest.json', to: buildPath },
      { from: './src/crypto.js', to: buildPath },
      { from: './src/noveo.ico', to: buildPath },
      { from: './src/noveo.png', to: buildPath },
    ]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['main.js', 'style.css', 'index.html'],
    }),
    new ExtractTextPlugin({ filename: 'style.css' }),
  ],
});
