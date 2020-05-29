const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  NamedChunksPlugin
} = require('webpack')
const merge = require('webpack-merge')
const env = require('./env')
const commonConfig = require('./common')

const devConfig = {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: env.port,
    quiet: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new NamedChunksPlugin(),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
