<template>
  <div class="searchResult">
     <!-- 顶部的导航 -->
    <van-nav-bar @click-left="back" left-arrow fixed class="login-nav-bar">
      <template slot="title">
        <div class="mylogin">搜索结果</div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
 .searchResult{
     .login-nav-bar {
  background-color: #3e9df8;
  .mylogin {
    color: #fff;
  }
}
.van-nav-bar .van-icon {
    color: #fff;
}
 }

</style>
