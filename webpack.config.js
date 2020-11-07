const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


let config = {
  mode: 'development',
  // mode: 'production',
  entry: {
    app : ['./src/app.js'],
    base: ['./src/base.js']
  },
  output: {
    path: path.resolve(__dirname,'animessage/inc')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin({
      percentBy: 'entries'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json5-loader',
        type: 'javascript/auto'
      }
    ]
  },

  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },

  optimization: {
    minimizer: [new TerserPlugin()]
  }
}

module.exports = config;

