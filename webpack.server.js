var path = require("path"),
	fs = require("fs"),
	webpack = require("webpack");
	
const nodeModules = fs.readdirSync("./node_modules").filter(d => d != ".bin");
function ignoreNodeModules(context, request, callback) {
	if (request[0] == ".")
		return callback();
		
	const module = request.split("/")[0];
	if (nodeModules.indexOf(module) !== -1) {
		return callback(null, "commonjs " + request);
	}
	
	return callback();
}

function createConfig(isDebug) {
	const plugins = [];
	
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
	
	// ---------------------
	// WEBPACK CONFIG
	return {
    context: __dirname,
		target: "node",
		devtool: "source-map",
    entry: {
      'server': './src/server/server.js'
    },
		output: {
      libraryTarget: 'umd',
      path: path.join(__dirname, "build"),
			filename: "[name].js"
		},
		resolve: {
			alias: {
				shared: path.join(__dirname, "src", "shared")
			}
		},
    module: {
			rules: [
				{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
				{ test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
			]
		},
		externals: [ignoreNodeModules],

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
	// ---------------------
}

module.exports = createConfig(true);
module.exports.create = createConfig;