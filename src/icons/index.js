import Vue from "vue";
import SvgIcon from "./SvgIcon";

Vue.component("svg-icon",SvgIcon);

// require.context(‘./svg’, false, /\.svg$/) 参数说明：
// 第一个：目录
// 第二个：是否遍历子级目录
// 第三个：定义遍历文件规则


const req = require.context('./svg', false, /\.svg$/)
//es6写法
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}

//es5写法
// const requireAll = function ( requireContext ) {
//     return requireContext.keys().map(requireContext)
//   }
requireAll(req)
