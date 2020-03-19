<template>
  <div>
      <!-- <van-popup v-model="value" position="bottom" :style="{ height: '80%' }"/> -->
      <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '80%' }">
          <!-- 关闭面板 -->
          <van-cell>
              <template slot="title">
                 <van-icon @click="colos" name="cross" style="font-size:20px" />
              </template>
          </van-cell>
          <!-- 我的频道 -->
          <van-cell>
              <template slot="title">
                  <div>我的频道</div>
              </template>
              <template slot="default">
<van-button type="danger" v-if="showicon===false" @click="showicon=true" hairline plain size="mini" round>编辑</van-button>
<van-button type="danger" v-if="showicon===true" @click="showicon=false" hairline plain size="mini" round>完成</van-button>
              </template>
          </van-cell>
      <!-- 我的频道项 -->
      <van-grid>
  <van-grid-item @click="changeActive(index)" class="fatheritem" v-for="(item, index) in mypopChannelList" :key="index">
      <template slot="text">
          <span :class="{active :active === index}" class="sonspan">{{item.name}}</span><van-icon @click.stop="delChannel(item)"  v-if="showicon" class="sonicon" name="clear" />
      </template>
  </van-grid-item>
</van-grid>
          <!-- 频道推荐 -->
          <van-cell>
              <template slot="title">
                  <div>频道推荐</div>
              </template>
          </van-cell>
      <!-- 频道项 -->
      <van-grid>
  <van-grid-item @click="addChannels(item)" v-for="(item, index) in otherChannelsList" :key="index" :text="item.name" />
</van-grid>
      </van-popup>

  </div>
</template>

<script>
// 获取所有频道数据
import { apiAllChannels, apiResetChannle } from '../../../api/channel'
import { setLocal } from '../../../utils/local'
export default {
  // value 面板的显示与隐藏 mypopChannelList我的频道数据
  props: ['value', 'mypopChannelList', 'active'],
  data () {
    return {
      //   隐藏叉叉
      showicon: false,
      //   所有频道数据
      AllChannels: []
    }
  },
  //   计算属性有缓存
  // mypopChannelList AllChannels这两依赖项改变 结果也会发生改变
  computed: {
    //   从所有频道数据中筛选
    otherChannelsList () {
      const ids = []
      this.mypopChannelList.forEach(item => {
        ids.push(item.id)
      })
      const other = []
      this.AllChannels.forEach(item => {
        //   不包含则添加进other数组
        if (!ids.includes(item.id)) {
          other.push(item)
        }
      })
      return other
    }
  },
  methods: {
    //   点击叉叉关闭面板
    colos () {
      this.$emit('input', false)
      window.console.log('关闭了')
    },
    async getAllChannels () {
      try {
        const res = await apiAllChannels()
        window.console.log(res)
        this.AllChannels = res.data.data.channels
      } catch {
        this.$toast.fail('获取数据出错了')
      }
    },
    // 添加频道
    async addChannels (item) {
      // 添加额外属性
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isloading', false)
      this.$set(item, 'list', [])
      this.mypopChannelList.push(item)
      //   判断是否登录
      const user = this.$store.state.user
      if (user.token) {
        // 根据我的频道数据生成channels
        const channels = []
        this.mypopChannelList.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2
          })
        })
        // 将我的频道数据加到服务器
        await apiResetChannle(channels)
      } else {
        //   未登录
        setLocal('channels', this.mypopChannelList)
      }
    },
    // 删除频道
    async delChannel (obj) {
      // 遍历我的频道列表删除
      this.mypopChannelList.forEach((item, index) => {
        if (item.id === obj.id) {
          this.mypopChannelList.splice(index, 1)
        }
      })
      // 判断是否登录
      const user = this.$store.state.user
      if (user.token) {
        const channels = []
        this.mypopChannelList.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2
          })
        })
        await apiResetChannle(channels)
      } else {
        //   未登录
        setLocal('channels', this.mypopChannelList)
      }
    },
    // 从面板选频道
    changeActive (index) {
      // this.$emit('cactive', index)
      this.$emit('update:active', index)
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.fatheritem{
    position: relative;
    .sonicon{
        position: absolute;
        top: 0;
        right: 0;
        color: #aaa;
    }
    .sonspan{
        font-size: 14px;
        color:#aaa;
    }
}
.active{
  color: red !important;
}
</style>
