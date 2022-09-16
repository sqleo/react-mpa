
const { merge } = require("webpack-merge");
const configBase = require("./webpack.config");

const devConfig = {
  mode: 'development',
  stats: 'errors-warnings'// 去除控制台webpack打印的无用信息
}

return merge(configBase, devConfig);

