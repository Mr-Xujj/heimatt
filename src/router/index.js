import Vue from 'vue'
import VueRouter from 'vue-router'

import useVant from '../views/useVant'
// 导入登录页
import Login from '../views/login'
// 导入home页
import home from '../views/home'
import Layout from '../views/layout'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/usevant',
      component: useVant
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/layout',
      component: Layout,
      children: [
        {
          path: '/home',
          component: home
        }
      ]

    }
  ]
})

export default router
