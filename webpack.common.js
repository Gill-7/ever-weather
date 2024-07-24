const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

const envKeys = {
  "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
  "process.env.GOOGLEMAP_API_KEY": JSON.stringify(
    process.env.GOOGLEMAP_API_KEY
  ),
  "process.env.GEOCODE_API_KEY": JSON.stringify(process.env.GEOCODE_API_KEY),
};

module.exports = {
  entry: "./src/js/index.js",
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather App",
      template: path.resolve(__dirname, "./src/template.html"),
      favicon: `./src/svg/favicon.svg`,
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/svg", to: "assets" }],
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
