import path from "path";

module.exports = {
	mode: "development",
	entry: "./src/app.ts",
	output: {
		fileName: "app.ts",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extenstions: [".ts", ".js"]
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader"}
		]
	}
}