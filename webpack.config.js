const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", //라우팅을 위한 publicPath 설정
    clean: true, //dist 폴더 정리
  },
  resolve: {
    extensions: [".js", ".jsx"], //확장자 생략 허용
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/, //css 파일 처리
        use: ["style-loader", "css-loader", "postcss-loader"], //postcss-loader 추가
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 기본 HTML 템플릿
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
