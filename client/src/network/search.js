import http from './http';

// 搜索
export function fetchSearch(keyword) {
  return http({
    url: 'articles/search',
    method: "get",
    params: {
      keyword
    }
  })
}