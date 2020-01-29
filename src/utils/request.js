import axios from "axios";
import { Message } from "element-ui";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
//创建axios,赋予变量service
const service = axios.create({
  baseURL: BASEURL, //http://localhost:8080/api/ == http://www.web-jshtml.cn/productApi
  timeout: 3000 
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

//添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    //在请求之前做些些什么
    return config;
  },
  function(error) {
    //请求对错做些什么
    return Promise.reject(error);
  }
);

//添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  console.log(data.resCode)
  // 业务需求

  if(data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
  }else{
      console.log(response)
      return response;
      // return Promise.resolve(data);
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;
