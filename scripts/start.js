#!/usr/bin/env node

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs')

const cwd = process.cwd()

var webpackConfig = {
  devtool: 'inline-source-map',
  entry:{
    index:[
      require.resolve('webpack-dev-server/client') + '?/',
      require.resolve('webpack/hot/dev-server'),
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
        use:require.resolve('css-loader')
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title:'tool',
      template:path.resolve(fs.realpathSync(cwd),'public','index.html'),
      inject:'body'
    })
  ]
}

var compiler = webpack(webpackConfig,(err,status)=>{
  //console.log(err)
  //console.log(status)
})
var devServer = new WebpackDevServer(compiler,{
  hot:true
})
devServer.listen(9008,'127.0.0.1',err=>{
  //console.log(err)
})
