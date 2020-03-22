import Vue from 'vue'
import VueRouter from 'vue-router'

import useVant from '../views/useVant'
// 导入登录页
import Login from '../views/login'
import Layout from '../views/layout'
// 导入home页
import home from '../views/home'
// 导入搜索页
import Search from '../views/search/search.vue'
// 导入搜索结果页
import SearchResult from '../views/searchResult/searchResult.vue'
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
        },
        {
          path: '/search',
          component: Search
        }
      ]

    },
    {
      path: '/searchResult/:key',
      component: SearchResult
    }
  ]
})

export default router
