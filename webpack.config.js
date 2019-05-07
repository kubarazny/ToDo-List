const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'scripts/bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		},
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/style.css')
		//if you want to pass in options, you can do so:
		//new ExtractTextPlugin({
		//  filename: 'style.css'
		//})
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'public')
	},
	devtool: 'source-map'
}
