import axios from 'axios';
import Vue from 'vue';
import { showLoading, hideLoading } from '@/assets/js/loading';

const http = axios.create({
  baseURL: 'http://localhost:3000/client/api',
  timeout: 1000 * 5
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
  hideLoading();

  // 请求超时
  if (err && err.code == 'ECONNABORTED' && err.message.includes('timeout')) {
    Vue.prototype.$toast('请求超时');
  }

  // 请求错误
  if (err && err.response.status === 500) {

    Vue.prototype.$toast(err.response.data.message);
  }
  return Promise.reject(err);
})



export default http;