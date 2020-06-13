const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const HappyPack = require('happypack')

const isDev = process.env.NODE_ENV === 'development'
const HappyTheadPool = HappyPack.ThreadPool({
  size: require('os').cpus().length
})

/**
 * @param{Config} config
 */
module.exports = config => {
  config
    .plugin('copy')
    .use(CopyWebpackPlugin, [{
      patterns: [{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist'),
        toType: 'dir',
        globOptions: {
          ignore: ['.DS_Store', 'index.html']
        }
      }]
    }])

  config
    .plugin('html')
    .use(HtmlWebPackPlugin, [{
      title: 'React Project',
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
    }])

  config
    .plugin('happypack-style')
    .use(HappyPack, [{
      id: 'style',
      threadPool: HappyTheadPool,
      loaders: [
        'css-loader',
        'postcss-loader'
      ]
    }])

  config
    .plugin('happypack-js')
    .use(HappyPack, [{
      id: 'js',
      threadPool: HappyTheadPool,
      loaders: ['cache-loader', 'babel-loader', 'eslint-loader']
    }])

  config
    .plugin('mini-css')
    .use(MiniCssExtractPlugin, [{
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }])

  const { transformer, formatter } = require('./utils/resolveLoaderError')
  config
    .plugin('friendly-errors')
    .use(FriendlyErrorsWebpackPlugin, [{
      compilationSuccessInfo: {
        messages: ['App is running at http://localhost:8080'],
      },
      additionalTransformers: [transformer],
      additionalFormatters: [formatter]
    }])

  config
    .plugin('path')
    .use(CaseSensitivePathsPlugin)
  config
    .plugin('hoisting')
    .use(ModuleConcatenationPlugin)

  config.optimization
    .minimizer('terser')
    .use(TerserPlugin, [{
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
    }])

  // 生产环境插件
  if (!isDev) {
    config
      .plugin('analyzer')
      .use(BundleAnalyzerPlugin)

    config
      .plugin('clean')
      .use(CleanWebpackPlugin)

    config
      .plugin('preload')
      .use(PreloadWebpackPlugin, [{
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }])
    config
      .plugin('preload')
      .use(PreloadWebpackPlugin, [{
        rel: 'prefetch',
        include: 'asyncChunks'
      }])

    config
      .plugin('hash-module-ids')
      .use(HashedModuleIdsPlugin, [{
        hashDigest: 'hex'
      }])
  }
}
