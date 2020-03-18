<template>
  <div class="home">
      <!-- NavBar 导航栏 -->
    <van-nav-bar fixed="" class="navbar-login" title="首页" />
    <!-- Tab标签页 -->
    <van-tabs>
  <van-tab v-for="(item, index) in 8" :title="'标签 ' + index" :key="index">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- list 上拉加载更多 -->
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
  <van-cell v-for="(item, index) in list" :key="index" :title="item" />
</van-list>
</van-pull-refresh>
  </van-tab>
  <div class="mymenu">
      <van-icon name="wap-nav" />
    </div>
</van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 是否处于加载状态
      loading: false,
      // 数据是否加载完毕
      finished: false,
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }

}
</script>

<style lang="less">

.home{
  margin-bottom: 50px;
  margin-top: 90px;
  .navbar-login {
  background-color: #3e9df8;
  .van-nav-bar__title {
    color: #fff;
  }
}
.van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0px;
  z-index: 999999;
  width: 90%;
};
.mymenu {
  position: fixed;
  top: 46px;
  right: 0;
  z-index: 999;
  height: 44px;
  line-height: 44px;
  width: 10%;
  text-align: center;
  font-weight: 700
}
}
</style>
