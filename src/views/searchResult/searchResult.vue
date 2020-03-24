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
  <van-cell v-for="(item, index) in searchResult" :key="index" >
    <template slot="title">
<h4>{{item.title}}</h4>
 <van-grid v-if="item.cover.type > 0" :border="false" :column-num="3">
                    <van-grid-item v-for="(imgitem, imgindex) in item.cover.images" :key="imgindex">
                        <van-image :src="imgitem" />
                    </van-grid-item>
                </van-grid>
<div class="searchBox">
      <span>{{ item.aut_name }}</span>
                    <span>{{ item.comm_count }}评论</span>
                    <span>{{ item.pubdate | timefilter }}</span>
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
import { apiGetSearchResult } from '../../api/search'
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
      list: [],
      // 搜索的关键字
      key: '',
      // 当前页
      page: 0,
      // 每页的条数
      perpage: 10,
      // 搜索的结果
      searchResult: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    // 下拉刷新
    onRefresh () {
      window.console.log('刷新')
    },
    // 加载
    async onLoad () {
      this.page = this.page + 1
      // 请求页面数据
      try {
        const res = await apiGetSearchResult({
          page: this.page,
          perpage: this.perpage,
          q: this.key
        })
        window.console.log(res)
        // this.searchResult = res.data.data.results
        this.searchResult = [...this.searchResult, ...res.data.data.results]
        if (res.data.data.results.length <= 0) {
          this.finished = true
        }
        // 将请求状态设置为 false
        this.loading = false
      } catch {
        window.console.log('出错')
      }
    }
  },
  created () {
    // 获取动态路由中的参数
    this.key = this.$route.params.key
    window.console.log(this.key)
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
