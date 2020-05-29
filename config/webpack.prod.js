const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const commonConfig = require('./common')

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new BundleAnalyzerPlugin(),
    new HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    // 环境变量定义
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 使用hash值作为模块id
    new HashedModuleIdsPlugin({
      hashDigest: 'hex'
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
