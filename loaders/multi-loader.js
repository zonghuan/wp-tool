const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
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
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "less-loader",
            options:{
              globalVars:750/10+"rem"
            }
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    },{
      test:/\.json$/,
      exclude:/node_modules/,
      use:require.resolve('json-loader')
    }, {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      exclude:/node_modules/,
      use: require.resolve('file-loader')
    }
  ]
}