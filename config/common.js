const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const env = require('./env')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 20,
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader', 'thread-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(), // 区分绝对路径大小写
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `App is running at http://localhost:${env.port}`
        ]
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist')
        }
      ]
    }),
    new HtmlWebPackPlugin({
      title: 'React Project',
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}
