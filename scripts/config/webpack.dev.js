const { merge } = require("webpack-merge");
const portfinder = require("portfinder")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const configBase = require("./webpack.config");
const path = require('path');
const { BASE_PROT } = require("../utils/constant")

portfinder.basePort = BASE_PROT;
const devConfig = {
  mode: 'development',
  stats: 'errors-warnings', // 去除控制台webpack打印的无用信息
  devServer: {
    static: {
      // 托管静态资源文件, 可通过数组的方式托管多个静态资源文件
      directory: path.join(__dirname, 'public'),
    },
    client: {
      progress: false, // 在浏览器端打印编译速度
    },
    compress: true, // 开启gzip压缩
    open: ['/home.html' ], // 是否自动打开浏览器
    hot: true,
    // 是否开启代码压缩
    port: BASE_PROT,
  },
  plugins:[
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:'+portfinder.basePort],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
    }),
  ]
}

module.exports = async function () {
  try {
    const port = await portfinder.getPortPromise();
    devConfig.devServer.port = port;
    // execa("clear")
    return merge(configBase, devConfig);
  } catch (error) {
    throw new Error(error);
  }
}