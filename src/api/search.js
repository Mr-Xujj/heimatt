import http from '../utils/http'

// 联想的方法
function apiThink (q) {
  return http({
    url: `/suggestion?q=${q}`
  })
}

export {
  apiThink
}
