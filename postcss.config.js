/*
 * @Author: zhangjiawei
 * @Date: 2021-02-26 10:24:25
 */
// css兼容处理  在webpack里面写了postcss-loader 就会自动来查找这个文件
module.exports = {
  plugins: [
    // 会读取 package.json里面的浏览器支持列表 browserslist--> 配置多个 就会兼容目标浏览器
    // > 0.2%
    require('postcss-preset-env')()
  ]
} 