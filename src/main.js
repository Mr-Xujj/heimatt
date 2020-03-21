import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 导入iconfont
import './style/iconfont.css'
Vue.use(Vant)
// 图片懒加载
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
