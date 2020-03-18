// 操作文章相关网络请求
import http from '../utils/http'

function apiGetArticleList ({ channelid, timestamp }) {
  return http({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: {
      channel_id: channelid,
      timestamp: timestamp,
      with_top: 0
    }
  })
}
export {
  apiGetArticleList
}
