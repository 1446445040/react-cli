const path = require('path')
const { NamedChunksPlugin } = require('webpack')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const env = require('./env')

const HappyTheadPool = HappyPack.ThreadPool({ size: require('os').cpus().length })

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    // 配合 Hoisting，优先采用es6 module语法，可使用启动参数 --display-optimization-bailout 查看降级处理的代码
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'happypack/loader?id=js'
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=style'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=style',
          'stylus-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=style',
          'less-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=style',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new NamedChunksPlugin(),
    new ModuleConcatenationPlugin(), // 开启 Hoisting
    new CaseSensitivePathsPlugin(), // 区分绝对路径大小写
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `App is running at http://localhost:${env.port}`
        ]
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new HappyPack({
      id: 'style',
      loaders: ['css-loader', 'postcss-loader'],
      threadPool: HappyTheadPool
    }),
    new HappyPack({
      id: 'js',
      loaders: ['cache-loader', 'babel-loader', 'eslint-loader'],
      threadPool: HappyTheadPool
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist'),
        toType: 'dir',
        globOptions: {
          ignore: ['.DS_Store', 'index.html']
        }
      }]
    }),
    new HtmlWebPackPlugin({
      title: 'React Project',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
    })
  ]
}
