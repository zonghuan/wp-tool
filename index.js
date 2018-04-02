#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .option('-r, --run [mode]','运行环境模式,prod dev')
  .option('-m, --mode [mode]','运行模式,单页或多页,spa multi')
  .option('-e, --env [env]','环境变量设置,prod qa dev')
  .parse(process.argv)

program.run = program.run||'prod'
program.mode = program.mode||'spa'

global.frontEnv = program.env||'production'

// 单页模式
// 线上模式
if(program.run==='prod'&&program.mode==='spa'){
  require('./scripts/build.js')
}
// 开发模式
if(program.run==='dev'&&program.mode==='spa'){
  require('./scripts/start.js')
}

// 多页模式
// 线上模式
if(program.run==='prod'&&program.mode==='multi'){
  require('./scripts/multi-build.js')
}
// 开发模式
if(program.run==='dev'&&program.mode==='multi'){
  require('./scripts/multi-start.js')
}
