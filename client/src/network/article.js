import http from './http';

// 文章详情
export function fetchInfo(id) {
  return http({
    url: `/articles/detail/${id}`,
    method: "get"
  })
}