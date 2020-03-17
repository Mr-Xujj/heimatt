<template>
  <div>
      <!-- NavBar 导航栏 -->
      <van-nav-bar class="navbar-login" title="登录"/>
      <!-- Field 输入框 -->
      <van-cell-group>
  <van-field
    v-model="mobile"
    left-icon="smile-o"
    placeholder="请输入手机号">
    <template slot="left-icon">
<i class="iconfont icon-phone"></i>
    </template>
    </van-field>
  <van-field
    v-model="code"
    clearable
    left-icon="music-o"
    placeholder="请输入密码">
       <template slot="left-icon">
<i class="iconfont icon-key"></i>
    </template>
      <van-button slot="button" size="small" color="#000" round type="primary">发送验证码</van-button>
    </van-field>
</van-cell-group>
      <!-- 登录按钮 -->
        <div class="mylogin-btn">
            <van-button size="large" type="info" @click="login">登录</van-button>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mobile: '',
      code: ''
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-login{
    background-color: #3e9df8;
    .van-nav-bar__title{
        color: #fff;
    }
}
.iconfont{
  font-size: 20px;
  font-weight: 700;
  color: yellow;
}
.van-button__text{
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
