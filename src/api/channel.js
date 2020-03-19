import http from '../utils/http'

function apiChannel () {
  return http({
    url: '/user/channels'
  })
}

function apiAllChannels () {
  return http({
    url: '/channels'
  })
}
// 重置频道数据
function apiResetChannle (channels) {
  return http({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}

export {
  apiChannel,
  apiAllChannels,
  apiResetChannle
}
