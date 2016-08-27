var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8080';

module.exports = {
	entry: [
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		`webpack/hot/dev-server`,
		`./client/src/index.js`,
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-eval-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015']}},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
	},
	devServer: {
		contentBase: './dist',
		noInfo: true,
		hot: true,
    quiet: true,
		inline: true,
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
    new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './client/src/index.html',
		})
	]
};
