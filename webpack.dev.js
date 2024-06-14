const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: __dirname + "/dist",
    clean: true,
  },
  devtool: "source-map",
});
