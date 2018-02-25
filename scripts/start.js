#!/usr/bin/env node

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var cwd = process.cwd()

var webpackConfig = {
  entry:{
    index:path.resolve(cwd,'src','index.js')
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
  }
}



var compiler = webpack(webpackConfig,(err,status)=>{
  //console.log(err)
  //console.log(status)
})
var devServer = new WebpackDevServer(compiler,{
  hot:true
})
devServer.listen(9008,'0.0.0.0',err=>{
  console.log(err)
})
