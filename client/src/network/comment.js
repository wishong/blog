import http from './http';

// 获取评论
export function fetchComments(id) {
  return http({
    url: `/comments/${id}`,
    method: 'get'
  })
}

// 新建评论
export function postComment(params) {
  return http({
    url: '/comments',
    method: 'post',
    data: params
  })
}