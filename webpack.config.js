require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { components } = require("@storybook/core/components");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", //라우팅을 위한 publicPath 설정
    clean: true, //dist 폴더 정리
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"], //확장자 생략 허용
    alias: {
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      lib: path.resolve(__dirname, "src/lib"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, //css 파일 처리
        use: ["style-loader", "css-loader", "postcss-loader"], //postcss-loader 추가
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      // 반드시 문자열로 치환되어야 함
      "process.env.NEXT_PUBLIC_API_URL": JSON.stringify(
        process.env.NEXT_PUBLIC_API_URL
      ),
      "process.env.NEXT_PUBLIC_TOUR_API_KEY": JSON.stringify(
        process.env.NEXT_PUBLIC_TOUR_API_KEY
      ),
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
    open: true,
  },
  mode: "development",
};
