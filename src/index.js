/*
 * @Author: zhangjiawei
 * @Date: 2021-02-24 20:02:59
 */
console.log('这是入口文件');

// let obj = {}
// function changeValue(obj1) {
//   obj1.name = '11111'
//   obj1 = {
//     name: '2222'
//   }
// }
// changeValue(obj)
// console.log(obj);

function add(a, d) {
  return a + d;
}

// add(1, 2);
// 由于这是入口文件 编译打包的时候会从入口找
// require('./index.less')
require('./index.scss');
