
const { merge } = require("webpack-merge");
const path = require('path');
const configBase = require("./webpack.config");

const proConfig = {
  mode: 'development',
  stats: 'errors-warnings',// 去除控制台webpack打印的无用信息
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../../dist'),
  },
}

module.exports = merge(configBase, proConfig)

