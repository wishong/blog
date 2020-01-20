import http from './http';

// 详情
export function fetchInfo(id) {
  return http({
    url: `/articles/detail/${id}`,
    method: "get"
  })
}