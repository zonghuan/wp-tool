var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var webpack = require('webpack')
var fs = require('fs')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cwd = process.cwd()

var config = {
  devtool: 'inline-source-map',
  entry:{
    index:[
      // hot-replace
      require.resolve('webpack-dev-server/client') + '?/',
      require.resolve('webpack/hot/dev-server'),
      // 入口文件
      path.resolve(cwd,'src','index.js')
    ]
  },
  output:{
    path:path.resolve(cwd,'dist'),
    filename:'[name]-[hash:8].js'
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:[
          {
            loader:require.resolve('babel-loader'),
            options:{
              presets: [
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-react')
              ],
              babelrc: false
            }
          }
        ]
      },{
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:require.resolve('style-loader'),
          use:require.resolve('css-loader')
        })
      },{
        test:/\.json$/,
        exclude:/node_modules/,
        use:require.resolve('json-loader')
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        exclude:/node_modules/,
        use: require.resolve('file-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name]-[hash:8].css"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title:'tool',
      template:path.resolve(fs.realpathSync(cwd),'public','index.html'),
      inject:'body'
    })
  ]
}

// 检查项目中是否定义了lib
var lib = require('./util.js').getLib()
if(lib){
  config.entry.lib = lib
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
       names: ['lib', 'manifest']
    })
  )
}

module.exports = config
