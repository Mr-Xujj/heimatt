// 处理时间全局过滤器
import Vue from 'vue'

// 导入dayjs
import dayjs from 'dayjs'
// 导入语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// 导入相对时间插件和扩展插件
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 定义全局过滤器
Vue.filter('timefilter', function (time) {
  return dayjs().from(dayjs(time))
})
