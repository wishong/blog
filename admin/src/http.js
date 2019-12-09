import axios from 'axios';
import Vue from 'vue';
import router from './router/index';
import { showLoading, hideLoading } from '@/assets/js/loading';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
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
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  if (err.response.status == 401) {
    router.push('/login')
  }
  return Promise.reject(err);
})

export default http;