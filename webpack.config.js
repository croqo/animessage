const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports = {
  mode: 'development',

  entry: {
    app : { import: './src/app.js', dependOn: 'lib'},
    lib : ['./src/lib.js', './src/style.sass']
  },
  output: {
    path: path.resolve(__dirname, 'www/inc')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ],
    }]
  },


  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'lib',
          chunks: 'async'
        }
      }
    }
  }
}