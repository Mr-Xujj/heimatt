import Vue from 'vue'
import Vuex from 'vuex'
import { setLocal, getLocal } from '../utils/local'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存用户信息
    // 每次打开页面时，需要从 localstorage 中获取用户信息
    user: getLocal('userInfo') || {}
  },
  mutations: {
    // 定义一个方法给user赋值
    setUser (state, payload) {
      // payload 传过来的参数
      state.user = payload
      // 将 token & refresh_token 也保存到 localstorage 中
      setLocal('userInfo', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
