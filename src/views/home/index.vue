<template>
  <div class="home">
      <!-- NavBar 导航栏 -->
    <van-nav-bar fixed="" class="navbar-login" title="首页" />
    <!-- Tab标签页 -->
    <van-tabs v-model="active">
  <van-tab v-for="(item, index) in channelList" :title="item.name" :key="index">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="item.isloading" @refresh="onRefresh">
    <!-- list 上拉加载更多 -->
    <van-list
  v-model="item.loading"
  :finished="item.finished"
  finished-text="没有更多了"
  @load="onLoad">
  <van-cell class="mycell" v-for="(subitem, subindex) in item.list" :key="subindex">
    <!-- 文章标题 -->
    <template slot="title">
        <div>{{subitem.title}}</div>
    <!-- 文章图片 -->
    <div class="imgbox">
      <van-grid :border="false" :column-num="3">
  <van-grid-item v-for="(imgitem,imgindex) in subitem.cover.images" :key="imgindex">
    <van-image lazy-load :src="imgitem" />
  </van-grid-item>
</van-grid>
    </div>
    <!-- 文章作者评论时间 -->
    <div class="other">
      <div class="allother">
        <span>{{subitem.aut_name}}</span>
        <span>{{subitem.comm_count}}评论</span>
        <span>{{subitem.pubdate | timefilter}}</span>
      </div>
      <div class="chacha">
        <van-icon name="cross" />
      </div>
    </div>
    </template>

  </van-cell>
</van-list>
</van-pull-refresh>
  </van-tab>
</van-tabs>
  <div class="mymenu">
      <van-icon @click="openchannel" name="wap-nav" />
    </div>
<!-- 弹出层 -->
<!-- <mypop :value="show" @input="show=$event"/> -->
<!-- <mypop v-model="show" :mypopChannelList="channelList" :active="active" @cactive="active=$event"/> -->
<mypop v-model="show" :mypopChannelList="channelList" :active.sync="active"/>
  </div>
</template>

<script>
import { apiChannel } from '../../api/channel'
import { getLocal } from '../../utils/local'
import { apiGetArticleList } from '../../api/aritcle'
// 导入弹出层组件
import mypop from './components/mypop'
export default {
  components: {
    mypop
  },
  data () {
    return {
      // list: [],
      // // 是否处于加载状态
      // loading: false,
      // // 数据是否加载完毕
      // finished: false,
      // count: 0,
      // isLoading: false,
      // 频道数据
      channelList: [],
      active: 0,
      // 控制弹出面板
      show: false
    }
  },
  methods: {
    openchannel () {
      this.show = true
    },
    // list 的事件：当 list 组件被加载时会执行
    async onLoad () {
      // 得到当前频道
      const currentChannle = this.channelList[this.active]
      // 得到当前频道对应的 id
      const id = currentChannle.id
      // 得到当前频道下的文章数据
      const res = await apiGetArticleList({
        channelid: id,
        timestamp: Date.now()
      })
      // 将文章列表数据保存到当前频道下面的 list 属性中
      currentChannle.list = [...currentChannle.list, ...res.data.data.results]
      window.console.log(res.data.data.results)
      // 判断返回数据的长度
      if (res.data.data.results.length === 0) {
        // 将 list 的加载完毕状态设置为 true
        currentChannle.finished = true
      }
      // 手动设置 loading 为 false
      currentChannle.loading = false
    },
    // pullrefresh 的事件：当组件被下拉时执行
    onRefresh () {
      // 得到当前频道数据
      const currentChannel = this.channelList[this.active]
      // 清除当前频道中的所有的数据
      currentChannel.loading = false
      currentChannel.finished = false
      currentChannel.list = []
      currentChannel.isloading = false
      // 重新加载数据
      this.onLoad()
    },
    addOtherProp () {
      this.channelList.forEach(item => {
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isloading', false)
        this.$set(item, 'list', [])
      })
    }
  },
  async created () {
    // 得到用户信息
    const user = this.$store.state.user
    window.console.log(user)
    try {
      // 判断是否登录
      if (user.token) {
        // 登录直接发请求获取数据
        const res = await apiChannel()
        // window.console.log(res)
        this.channelList = res.data.data.channels
      } else {
        // 没有登陆判断是否操作过默认数据
        const channels = getLocal('channels')
        if (channels) {
          this.channelList = channels
        } else {
          const res = await apiChannel()
          // window.console.log(res)
          this.channelList = res.data.data.channels
        }
      }
    } catch {
      this.$toast.fail('出错了')
    }
    this.addOtherProp()
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
  z-index: 99;
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
.other{
  display: flex;
  justify-content: space-between;
}
.allother span{
  margin-right: 10px;
}
.chacha{
 border: 1px solid #ccc;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: #ccc;
}
}

</style>
