var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/app',

  entry: {
      app: './app.js',
      vendor: ['angular', 'angular-route']
  },

  output: {
      path: __dirname + '/dist/js',
      filename: 'app.bundle.js'
  },
  module: {
    loaders: 
            [{
                test: /\.scss/,
                loader: 'style-loader'
            },
            {
                test: /\.scss/,
                loader: 'css-loader',
                    options: {
                         minimize: true
                    }
            },
            {
                test: /\.scss/,
                loader: 'sass-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/, // include .js files 
                exclude: /node_modules/, // exclude any and all files in the node_modules folder 
                loader: "jshint-loader",
                        options: { 
                          camelcase: true,
                          emitErrors: false,
                          failOnHint: false
                        }
            }]
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({ compress: true, mangle: false, test: /\.js$/ }),
      new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendor.bundle.js"})
  ],
  watch: true
  
};