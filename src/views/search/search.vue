<template>
  <div>
      <!-- 搜索框 -->
        <van-search @input="think"
    v-model="value" background="#3296fa" show-action
    placeholder="请输入搜索关键词" @search="onSearch">
    <template slot="action">
        <div class="mycancel" @click="onCancel">取消</div>
    </template>
    </van-search>
    <!-- 联想区 -->
    <van-cell-group v-if="ThinkList.length > 0">
  <van-cell @click="onSearch(item.oldItem)" v-for="(item, index) in ThinkList" :key="index" icon="search">
      <template slot="title">
 <div v-html="item.newItem"></div>
      </template>
  </van-cell>
</van-cell-group>
    <!-- 搜索历史区 -->
        <van-cell-group v-else>
  <van-cell title="搜索历史">
      <template slot="default">
<van-icon name="delete" />
      </template>
  </van-cell>
  <van-cell icon="search" title="单元格">
      <template slot="right-icon">
<van-icon name="cross" />
      </template>
  </van-cell>
</van-cell-group>
  </div>
</template>

<script>
import { apiThink } from '../../api/search.js'
export default {
  data () {
    return {
      // 搜索框值
      value: '',
      //   是否显示联想
      isthink: false,
      //   联想结果
      ThinkList: [],
      //   防抖定时器
      timer: null
    }
  },
  methods: {
    onSearch (key) {
      this.$router.push(`/searchResult/${key}`)
    },
    onCancel () {
      window.console.log('cancel')
      //   点击取消清空
      this.value = ''
      this.ThinkList = []
    },
    // 搜索联想
    async think () {
      // 清除定时器
      clearTimeout(this.timer)

      this.timer = setTimeout(async () => {
        // 判断搜索内容是否为空
        if (this.value.trim().length <= 0) {
          this.ThinkList = []
          return
        }
        const res = await apiThink(this.value)
        this.ThinkList = res.data.data.options
        window.console.log(this.ThinkList)
        //   关键字高亮
        this.ThinkList = this.ThinkList.map(item => {
          return {
            oldItem: item,
            newItem: item.split(this.value).join(`<span style="color: red">${this.value}</span>`)
          }
        })
      }, 1000)
    }

  }
}
</script>

<style lang="less">
.mycancel {
    color: #fff;
}
.mycancel:active {
    color: #ccc;
}
.van-search__action:active {
    background-color: #3296fa;
}

</style>
