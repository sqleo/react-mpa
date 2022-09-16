const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const { getEntryPath, getEntryTemplate } = require("./utils/tool")
module.exports = {
  entry: getEntryPath(),
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@src/common": path.resolve(__dirname, "../src/common"),
      "@src/containers": path.resolve(__dirname, "../src/containers"),
      "@src/packages": path.resolve(__dirname, "../src/packages"),

    },
    // yarn add -D stream-browserify path-browserify stream-browserify
    mainFiles: ["index", "mian"],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 小于4kb转成base64
          }
        },
        generator: {
          filename: 'static/asset/images/[fullhash][ext][query]'
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              disable: process.env.NODE_ENV === 'production' ? false : true,
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/asset/fonts/[fullhash][ext][query]',
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin(),
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name]css/[fullhash].css",
    }),
    ...getEntryTemplate()
  ],
}