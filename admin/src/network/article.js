import http from './http';

// 获取
export function fetchArticles(pageSize, currentPage) {
  return http({
    url: 'articles',
    method: 'get',
    params: {
      pageSize,
      currentPage
    }
  })
}

// 删除
export function deleteArticle(id) {
  return http({
    url: `/articles/delete/${id}`,
    method: 'delete'
  })
}

// 详情
export function fetchArticle(id) {
  return http({
    url: `/articles/detail/${id}`,
    method: 'get'
  })
}

// 分类
export function fetchCategories() {
  return http({
    url: "/categories/all",
    method: 'get'
  })
}

// 新建
export function postArticle(params) {
  return http({
    url: '/articles',
    method: 'post',
    data: params
  })
}

// 修改
export function editArticle(id, params) {
  return http({
    url: `/articles/edit/${id}`,
    method: 'put',
    data: params
  })
}

// 评论
export function fetchComments(id, pageSize, currentPage) {
  return http({
    url: `/articles/comments/${id}`,
    method: 'get',
    params: {
      pageSize,
      currentPage
    }
  })
}

// 删评
export function deleteComment(id) {
  return http({
    url: `articles/comments/${id}`,
    method: 'delete'
  })
}