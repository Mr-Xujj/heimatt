<template>
  <div>
    <!-- NavBar 导航栏 -->
    <van-nav-bar class="navbar-login" title="登录" />
    <!-- Field 输入框 -->
    <van-cell-group>
      <van-field v-model="obj.mobile" :error-message="message.mobile" left-icon="smile-o" placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-phone"></i>
        </template>
      </van-field>
      <van-field v-model="obj.code" :error-message="message.code" clearable left-icon="music-o" placeholder="请输入密码">
        <template slot="left-icon">
          <i class="iconfont icon-key"></i>
        </template>
        <van-button slot="button" size="small" color="#000" round type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="mylogin-btn">
      <van-button size="large" :loading="loginLoading" type="info" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { apiLogin } from '../../api/user'
export default {
  data () {
    return {
      // 输入信息
      obj: {
        mobile: '13071637518',
        code: '246810'
      },
      // 验证提示
      message: {
        mobile: '',
        code: ''
      },
      // 登录状态
      loginLoading: false
    }
  },
  methods: {
    login () {
      if (!this.yanzheng()) {
        // 如果不通过，后续代码不执行
        return
      }
      // 提交数据到服务器
      // axios({
      //   url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
      //   method: 'POST',
      //   data: this.obj
      // }).then(res => {
      //   window.console.log(res)
      //   // 跳转到首页
      //   this.$router.push('/home')
      // }).catch(() => {
      //   window.console.log('登录失败')
      // }
      // 将登陆状态设为true
      this.loginLoading = true
      window.setTimeout(async () => {
        // try 用来包着可能会出错的代码
        try {
          const res = await apiLogin(this.obj)
          // window.console.log(res)
          // 登录成功保存token
          this.$store.commit('setUser', res.data.data)
          // window.console.log(this.$store.state.user)
          this.$router.push('/home')
        } catch {
          // 出错要执行的代码
          window.console.log('登录失败')
          this.$toast.fail('登陆失败')
        }
        this.loginLoading = false
      }, 1000)
      // apiLogin(this.obj).then(res => {
      //   window.console.log(res)
      //   // 跳转到首页
      //   this.$router.push('/home')
      // }).catch(() => {
      //   window.console.log('登录失败')
      // })
    },
    yanzheng () {
      const resArr = []
      const phone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      // 手机号验证
      if (!phone.test(this.obj.mobile)) {
        this.message.mobile = '手机号不合法'
        resArr.push(false)
      } else {
        this.message.mobile = ''
        resArr.push(true)
      }
      // 验证验证码
      if (this.obj.code.trim().length !== 6) {
        this.message.code = '验证码不合法'
        resArr.push(false)
      } else {
        this.message.code = ''
        resArr.push(true)
      }
      // 不包含false说明验证通过
      return !resArr.includes(false)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-login {
  background-color: #3e9df8;
  .van-nav-bar__title {
    color: #fff;
  }
}
.iconfont {
  font-size: 20px;
  font-weight: 700;
  color: yellow;
}
.van-button__text {
  color: #ccc;
}
.mybtn {
  color: #ccc !important;
  padding: 0 5px;
}
.mylogin-btn {
  margin: 20px 10px;
}
</style>
