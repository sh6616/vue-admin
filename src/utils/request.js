import axios from "axios";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

//创建axios,赋予变量service
const service = axios.create({
  baseURL: BASEURL, //http://localhost:8080/api/ == http://www.web-jshtml.cn/productApi
  timeout: 1000
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

//添加相应拦截器
axios.interceptors.response.use(
  function(response) {
    ////在请求之前做些些什么
    return config;
  },
  function(error) {
    //请求对错做些什么
    return Promise.reject(error);
  }
);

export default service;
