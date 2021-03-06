// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const
    path = require('path'),
    Dev = path.resolve(__dirname, 'src'),
    webpack = require('webpack'),
    TerserPlugin = require('terser-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin')
;
module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    index: [ path.join(Dev, '/base.js') ]
  },
  output: {
    path: path.resolve(__dirname,'animessage')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin()
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
      }
    ]
  },

  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}