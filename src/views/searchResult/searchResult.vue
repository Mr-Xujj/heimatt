<template>
  <div class="searchResult">
     <!-- 顶部的导航 -->
    <van-nav-bar @click-left="back" left-arrow fixed class="login-nav-bar">
      <template slot="title">
        <div class="mylogin">搜索结果</div>
      </template>
    </van-nav-bar>
    <!-- 新闻区 -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <!-- 上拉加载 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
  <van-cell v-for="item in 3" :key="item" :title="item" >
    <template slot="title">
<h4>标题</h4>
<van-grid :border="false" :column-num="3">
  <van-grid-item v-for="(imgitem, imgindex) in 3 " :key="imgindex" >
    <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
  </van-grid-item>
</van-grid>
<div class="searchBox">
  <span>作者</span>
  <span>品论</span>
  <span>时间</span>
</div>
<van-grid :column-num="3">
  <van-grid-item icon="comment-o" text="品论" />
  <van-grid-item icon="like-o" text="点赞" />
  <van-grid-item icon="share" text="分享" />
</van-grid>
    </template>
  </van-cell>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 下拉刷新状态
      isLoading: false,
      // 加载状态
      loading: false,
      // 完毕状态
      finished: false,
      // 加载数据源
      list: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    // 下拉刷新
    onRefresh () {

    },
    // 加载
    onLoad () {

    }
  }
}
</script>

<style lang="less">
 .searchResult{
   margin-top: 46px;
     .login-nav-bar {
  background-color: #3e9df8;
  .mylogin {
    color: #fff;
  }
}
.van-nav-bar .van-icon {
    color: #fff;
}
.searchBox span{
  margin-right: 15px;
}
 .van-grid-item__content{
   flex-direction: row;
   align-items: center;
   .van-grid-item__icon {
     font-size: 18px;
     line-height: 24px;
     span{
       margin-top: 0;
     }
   }
 }
 }

</style>
