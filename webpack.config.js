const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	mode: "production",
	entry: "./src/app.ts",
	output: {
		filename: "app.bundle.js",
		path: outputPath
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules"}
		]
	},
	node: {
		__dirname: true
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				'./node_modules/swagger-ui-dist/swagger-ui.css',
				'./node_modules/swagger-ui-dist/swagger-ui-bundle.js',
				'./node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
				'./node_modules/swagger-ui-dist/favicon-16x16.png',
				'./node_modules/swagger-ui-dist/favicon-32x32.png',

				{from: "./src/files", to: "files"},
				{from: "./src/images", to: "images"},
			]
		}),
	],
	target: "node"
}