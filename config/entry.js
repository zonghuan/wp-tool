var path=require('path')
var fs=require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var cwd = process.cwd()
var pageDir=path.join(cwd,'./src/page')
var folders=fs.readdirSync(pageDir)
var configs = []

// 需要忽略的页面，比如一些已经下线的页面,还有.DS_Store
var ignore = ['.DS_Store']

for(var i=0;i<folders.length;i++){
  let config = {
    entry:{},
    plugins:[]
  }
  if(ignore.indexOf(folders[i])>-1){
    continue;
  }
  config.entry[folders[i]]=[require.resolve(path.join(pageDir,folders[i]))]
  config.plugins.push(
    new HtmlWebpackPlugin({
      chunks: ['manifest','zzlib',folders[i]],
      template:'./webpack/common/template.html',
      filename:`${folders[i]}.html`
    })
  )
  configs.push(config)
}


module.exports = configs
