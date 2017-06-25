const webpack = require('webpack'),
  path = require('path');

function createConfig(isDebug) {
  let plugins = [];

  if (!isDebug) {
    let uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: false,
        warnings: false
      },
      sourceMap: true
    });

    plugins.push(uglifyJSPlugin);
  }

  return {
    context: __dirname,
    target: 'node',
    devtool: 'source-map', // https://webpack.js.org/configuration/devtool/
    entry: './src/server/server.js',
    output: {
      libraryTarget: 'umd',
      path: path.join(__dirname, 'build'),
      filename: 'server.js'
    },

    resolve: {
      alias: {
        shared: path.join(__dirname, 'src', 'shared')
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
        }
      ]
    },

    externals: {
      lodash: {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: "lodash"
      }
    },

    plugins: plugins
  };
}

module.exports = createConfig(true);
module.exports.create = createConfig;