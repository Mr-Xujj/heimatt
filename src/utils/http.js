import axios from 'axios'

import store from '../store'

const instance = axios.create({
  // 设置基地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 取出用户信息 判断用户是否登录
  const user = store.state.user
  // 判断是否存在 token
  if (user.token) {
    // 在请求头中添加 token
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
export default instance
