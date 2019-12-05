import axios from 'axios';
import { showLoading, hideLoading } from '@/assets/js/loading';

const http = axios.create({
  baseURL: 'http://localhost:3000/client/api'
})

// 请求拦截器
http.interceptors.request.use(config => {
  showLoading();
  return config;
}, err => {
  return Promise.reject(err);
})

// 响应拦截器
http.interceptors.response.use(res => {
  hideLoading();
  return res;
}, err => {
  return Promise.reject(err);
})

export default http;