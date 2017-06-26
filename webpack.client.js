const webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

const vendorModules = ['jquery', 'lodash'];

const dirname = path.resolve('./');

function createConfig(isDebug) {
  const devTool = isDebug ? 'eval-source-map' : 'source-map';

  const plugins = [new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
  })];

  const cssLoader = {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },

    sassLoader = {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    };

  const appEntry = ['./src/client/application.js'];

  if(!isDebug) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(new ExtractTextPlugin('[name].css'));

    cssLoader.loader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    });

    sassLoader.loader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!sass-loader'
    });
  }

  return {
    context: dirname,

    devtool: devTool,
    entry: {
      application: appEntry,
      vendor: vendorModules
    },
    output: {
      libraryTarget: 'umd',
      path: path.join(dirname, 'public', 'build'),
      filename: '[name].js',
      publicPath: '/build/'
    },

    resolve: {
      alias: {
        shared: path.join(dirname, 'src', 'shared')
      }
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }, {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)/,
          loader: 'url-loader?limit=1024'
        },
        cssLoader,
        sassLoader
      ]
    },

    plugins: plugins
  };
}

module.exports = createConfig(true);
module.exports.create = createConfig;