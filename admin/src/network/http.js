import axios from 'axios';
import Vue from 'vue';
import router from '../router/index';
import { showLoading, hideLoading } from '@/assets/js/loading';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
  timeout: 1000 * 5
})

// 请求拦截器
http.interceptors.request.use(config => {
  showLoading();
  if (sessionStorage.token) {
    config.headers.Authorization = 'Beaer ' + sessionStorage.getItem('token');
  }
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
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message || err.response.data.error
  })
  if (err.response.status == 401) {
    router.push('/login')
  }
  return Promise.reject(err);
})

export default http;