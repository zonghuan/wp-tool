#!/usr/bin/env node


var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var webpackConfig = require('../config/webpack-prod.js')

var compiler = webpack(webpackConfig)

compiler.apply(new webpack.ProgressPlugin());

compiler.run((err,stats)=>{

  if(err){
    return console.error(err)
  }
  console.log(stats.toString({
    chunks:false,
    colors:true
  }))

})
