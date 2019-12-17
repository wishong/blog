import http from './http';

// 获取
export function fetchCategories(pageSize, currentPage) {
  return http({
    url: '/categories',
    method: 'get',
    params: {
      pageSize,
      currentPage
    }
  })
}

// 详情
export function fetchCategory(id) {
  return http({
    url: `/categories/${id}`,
    method: 'get'
  })
}

// 新建
export function postCategory(params) {
  return http({
    url: '/categories',
    method: 'post',
    data: params
  })
}

// 修改
export function editCategory(id, params) {
  return http({
    url: `/categories/${id}`,
    method: 'put',
    data: params
  })
}

// 删除
export function deleteCategory(id) {
  return http({
    url: `/categories/delete/${id}`,
    method: 'delete'
  })
}