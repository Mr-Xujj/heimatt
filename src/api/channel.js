import http from '../utils/http'

function apiChannel () {
  return http({
    url: '/user/channels'
  })
}

export {
  apiChannel
}
