<template>
  <div>
      <!-- 搜索框 -->
        <van-search
    v-model="value" background="#3296fa" show-action
    placeholder="请输入搜索关键词" @search="onSearch">
    <template slot="action">
        <div class="mycancel" @click="onCancel">取消</div>
    </template>
    </van-search>
    <!-- 联想区 -->
    <van-cell-group v-if="isthink">
  <van-cell icon="search" title="单元格"/>
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
export default {
  data () {
    return {
      // 搜索框值
      value: '',
      //   是否显示联想
      isthink: false
    }
  },
  methods: {
    onSearch (key) {
      window.console.log('search')
    },
    onCancel () {
      window.console.log('cancel')
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
