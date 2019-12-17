import http from './http';

// 归档
export function fetchArchives() {
  return http({
    url: '/articles',
    method: "get"
  })
}