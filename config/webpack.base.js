const path = require('path')
const { NamedChunksPlugin } = require('webpack')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
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
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300, // 防抖
    poll: 1000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 提取node_modules
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        // 公共依赖
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 20,
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserWebpackPlugin({
        cache: true, // 文件缓存
        parallel: true, // 多进程压缩
        terserOptions: {
          compress: {
            collapse_vars: true, // 内嵌变量
            reduce_vars: true // 提取常量
          },
          output: {
            comments: false // 是否保留注释
          }
        }
      })
    ]
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
        to: path.resolve(__dirname, '../dist')
      }]
    }),
    new HtmlWebPackPlugin({
      title: 'React Project',
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    })
  ]
}
