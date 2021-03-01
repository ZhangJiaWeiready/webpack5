const { resolve } = require('path'); // \r\n
// 引用插件处理html

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 不是loader处理的直接放到plugins
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  // 用于区分当前执行的是生产(production)还是开发(development)模式 区别 压缩代码
  mode: 'development',
  // 入口 路径
  // 单入口 string ，生成名称默认
  // 多入口 array
  entry: './src/index.js',
  // entry: ['./src/index.js', './src/index2.js'],
  // entry: {
  //   one: './src/index2.js',
  //   two: './src/index.js'
  // },
  output: {
    filename: '[name].js',
    // __dirname 项目根目录
    path: resolve(__dirname, 'dist'),
  },
  // loader 让webpack
  module: {
    rules: [
      {
        // 规则
        test: /\.(css|less)$/,
        // 多个loader 用 use 一个的话用loader
        // 顺序不能写反 从右到左执行， 从下到上
        // 先兼容 然后解析css文件
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpeg|png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          // 指定目录路径，这样就会在解析图片地址得时候自动加上这个路径
          publicPath: './images/',
          // 输出目录
          outputPath: 'images/',
          // 以上打包会生成base64格式得图片 且不会生成新的文件夹 7k以下得才转
          // 会生成hash名称得图片 --> 应该用默认得名字
          limit: 1024 * 7,
          // 默认的hash名称 [hash].[ext]  ---> [name] 默认的名称
          // 生成前十位得hash加原名得文件格式
          name: '[name][hash:10].[ext]',
        },
        // use: ['url-loader', 'file-loader'],
        // 当只有一个loader得时候
        // loader: 'file-loader',
        // options: {}
        // 有配置项的时候
        // use: ['url-loader', { loader: 'file-loader', options: {}}]
      },
      {
        test: /\.html$/,
        // 用于处理html文件中得图片
        loader: 'html-loader',
      },
      // {
      //   loader: 'file-loader',
      //   // 排除
      //   exclude: /\.(js|json|html)$/,
      //   option: {
      //     outputPath: 'font/',
      //     publicPath: './font',
      //     name: '[name][hash:10].[ext]',
      //   },
      // },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        // 只检查自己写的代码，不查第三方库得代码
        exclude: /node_module/,
        // 自动修复 语法错误仍 会报错
        options: {
          fix: true,
        },
      },
    ],
  },
  plugins: [
    // 默认会创建一个空的，目的就是自动引入打包的资源(js/css)
    // 多个出口的话 可以放置多个配置，
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'demo.html',
      // 是否压缩html文件
      minify: {
        // 移除空格
        // collapseWhitespace: true  ,
        // 去除注释
        removeComments: true,
      },
    }),
    // 将css单独提取出来
    new MiniCssExtractPlugin({
      filename: 'demo.css',
    }),
    // 压缩css代码 本地测试不需要用，生产版本需要用到
    // new OptimizeCssAssetsWebpackPlugin()
  ],
};
