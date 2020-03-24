<template>
  <div>
      <router-view></router-view>
      <!-- 底部导航栏 -->
      <van-tabbar>
  <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
  <van-tabbar-item icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item icon="manager-o" to="/me">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
