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
    fallback: {
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
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
        options: {
          limit: 500
        },
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