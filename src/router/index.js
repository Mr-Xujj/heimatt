import Vue from 'vue'
import VueRouter from 'vue-router'

import useVant from '../views/useVant'
// 导入登录页
import Login from '../views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/usevant',
      component: useVant
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
