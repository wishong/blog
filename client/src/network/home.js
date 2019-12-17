import http from './http';

// 分类
export function fetchCategories() {
  return http({
    url: '/categories',
    method: "get"
  })
}

// 最近文章
export function fetchEditArticles() {
  return http({
    url: '/articles/edit',
    method: "get"
  })
}

// 文章列表
export function fetchArticles(pageSize, currentPage) {
  return http({
    url: '/articles/pagination',
    method: "get",
    params: {
      pageSize,
      currentPage
    }
  })
}