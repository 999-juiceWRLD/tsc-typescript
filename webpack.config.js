const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.bundle.js",
        publicPath: "dist"
    },
    devtool: "inline-source-map",
    module: {
        rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
};