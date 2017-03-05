var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.*\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'ruby-sass?sourceMap']
        })
      }
    ],
    loaders:[
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.(jpe?g|gif|png)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false&name=/[name].[ext]'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?|#[#?a-z]+)?(\?|#[#?0-9]+)?(#[a-z]+)?(#[0-9]+)?/,
        loader: 'file-loader?name=/[name].[ext]'
      },
      {
        test: /.*\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap!ruby-sass?sourceMap'),
        fallbackLoader: 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap!ruby-sass?sourceMap'
      }
    ]
  },
  postcss: function() {
    return [
      require('autoprefixer')
    ];
  },
  plugins: [
    new ExtractTextPlugin("../css/styles.main.css")
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}
