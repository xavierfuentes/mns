var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
	entry: [
		'./client/src/index.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[chunkhash].js'
	},
	module: {
		loaders: [
      { test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel', query: {
          presets: ['es2015'],
          plugins: [],
        }
      }
    ]
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			// template: './src/template.html',
			// title: 'Xavi starter',
		})
	]
};
