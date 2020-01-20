import http from './http';

// 获取管理员
export function fetchAdmins() {
  return http({
    url: '/admins',
    method: 'get',
  })
}

// 新建管理员
export function postAdmins(params) {
  return http({
    url: '/admins',
    method: 'post',
    data: params
  })
}

// 删除管理员
export function deleteAdmins(id, params) {
  return http({
    url: `/admins/delete/${id}`,
    method: 'delete',
    data: params
  })
}

// 修改密码
export function editAdmins(name, params) {
  return http({
    url: `/admins/changePwd/${name}`,
    method: 'put',
    data: params
  })
}