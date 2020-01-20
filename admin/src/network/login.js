import http from './http';

// 登录
export function login(params) {
  return http({
    url: 'http://localhost:3000/admin/login',
    method: 'post',
    data: params
  })
}