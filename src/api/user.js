import http from '../utils/http'
// 封装登录方法
function apiLogin ({ mobile, code }) {
  return http({
    url: '/authorizations',
    method: 'post',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
export {
  apiLogin
}
