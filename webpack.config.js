// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const
    fs = require('fs'),
    path = require('path'),
    src = path.resolve(__dirname, 'src'),
    webpack = require('webpack'),
    TerserPlugin = require('terser-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin')
;
module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    // app : ['./src/app.js'],
    base: [
      path.join(src, '/base.js'),
      path.join(src, '/base.json')
    ]
  },
  output: {
    path: path.resolve(__dirname,'animessage/inc')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
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
      }
    ]
  },

  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      // include: /\/src/,
      // parallel:true
    })]
  }
}
