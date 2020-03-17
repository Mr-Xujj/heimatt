import axios from 'axios'

const instance = axios.create({
  // 设置基地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})
// 请求拦截器
instance.interceptors.request.use(function (config) {
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
