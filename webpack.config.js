const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	target: "web",
	// watch: true,
	entry: __dirname + '/src/app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs'),
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|pdf|jpg|png|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			}
		],
	},
	devServer: {
		historyApiFallback: true,
		compress: true,
        port: 8080,
        open: true,
		openPath: 'localhost:8080',
		publicPath: '',
		stats: 'minimal',
		inline: true,
		disableHostCheck: true,
		public: 'localhost:8080',
		host: '0.0.0.0'
	},
	mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/src/public/index.html",
			inject: 'body'
		})
	],
	watchOptions: {
		poll: true
	}
};