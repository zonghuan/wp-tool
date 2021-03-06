var path=require('path')
var fs=require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var cwd = process.cwd()
var pageDir=path.join(cwd,'./src/page')
var folders=fs.readdirSync(pageDir)
var entry={}
var htmlConfig=[]
var util = require('./util.js')


// 需要忽略的页面，比如一些已经下线的页面,还有.DS_Store
var ignore = ['.DS_Store']

for(var i=0;i<folders.length;i++){
  if(ignore.indexOf(folders[i])>-1){
    continue;
  }
  entry[folders[i]]=[require.resolve(path.join(pageDir,folders[i]))]
  htmlConfig.push(
    new HtmlWebpackPlugin({
      chunks: ['manifest','zzzlib',folders[i]],
      template:util.getConf().template,
      filename:`${folders[i]}.html`
    })
  )
}

module.exports={
  entry,
  htmlConfig
}
