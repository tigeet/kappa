/* eslint-disable */
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {
  default: TsconfigPathsPlugin,
} = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/db/run.ts",
  mode: "development",
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/i,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: ["postcss-nested"],
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(png|jp(e*)g|gif)$/,
      //   type: "asset/resource",
      // },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: "@svgr/webpack",
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"),
      }),
    ],
  },
  // devServer: {
  //   historyApiFallback: true,
  //   static: {
  //     directory: path.resolve(__dirname, "public"),
  //   },
  //   port: 3030,
  //   hot: true,
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "./public/index.html",
  //   }),
  // ],
};
