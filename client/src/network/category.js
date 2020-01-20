import http from './http';

// 所有文章
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

// 所有分类
export function fetchCategories() {
  return http({
    url: '/categories',
    method: "get"
  })
}

// 分类下文章
export function fetchCategoryArticles(name, pageSize, currentPage) {
  return http({
    url: `/articles/category/${name}`,
    method: "get",
    params: {
      pageSize,
      currentPage
    }
  })
}