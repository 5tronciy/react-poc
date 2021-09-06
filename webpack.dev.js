const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
require("dotenv").config();

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    devServer: {
        port: process.env.PORT || 3000,
        proxy: {
            "/rest": process.env.SERVER_REST,
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    "less-loader",
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
        }),
        new Dotenv(),
    ],
};
