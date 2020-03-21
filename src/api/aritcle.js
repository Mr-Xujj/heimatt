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
// 将文章设置为不感兴趣
// 将文章设置为不喜欢
function apiNoLike (artid) {
  return http({
    url: '/article/dislikes',
    method: 'POST',
    data: {
      target: artid
    }
  })
}
export {
  apiGetArticleList,
  apiNoLike
}
