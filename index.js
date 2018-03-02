#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .option('-r, --run [mode]','运行环境参数')
  .option('-m, --mode [mode]','运行模式,单页或多页')
  .parse(process.argv)

program.run = program.run||'prod'
program.mode = program.mode||'spa'

// 单页模式
if(program.run==='prod'&&program.mode==='spa'){
  require('./scripts/build.js')
}
if(program.run==='dev'&&program.mode==='spa'){
  require('./scripts/start.js')
}

// 多页模式
if(program.run==='prod'&&program.mode==='multi'){
  require('./script/multi-build.js')
}
