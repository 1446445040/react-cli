const paths = require('./paths')

module.exports = config => {
  config.module
    .rule('compile')
    .test(/\.js$/)
    .include.add(paths.srcPath).end()
    .use('js').loader('happypack/loader?id=js')

  config.module
    .rule('css')
    .test(/\.css$/)
    .use('css').loader('mini-css-extract-plugin/dist/loader').end()
    .use('happypack-style').loader('happypack/loader?id=style')

  config.module
    .rule('stylus')
    .test(/\.styl(us)?$/)
    .use('mini').loader('mini-css-extract-plugin/dist/loader').end()
    .use('happypack-style').loader('happypack/loader?id=style').end()
    .use('stylus-loader').loader('stylus-loader')

  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')

  config.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader('file-loader')

  config.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')

  config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader('url-loader')
}
