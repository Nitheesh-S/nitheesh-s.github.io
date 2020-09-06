const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: __dirname + '/src/app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs'),
		publicPath: ''
	},
	module: { 
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [ 
		new HtmlWebpackPlugin({
			template: __dirname + "/src/public/index.html",
			inject: 'body'
		})
	],
	devServer: { 
		contentBase: __dirname + '/src/public', 
		port: 8000,
	},
	mode: 'development',
};