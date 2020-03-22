<template>
  <div>
      <van-dialog :value="value"  :showConfirmButton="false" >
        <van-cell-group v-if="isReport===false">
         <van-cell>
             <template slot="title">
<van-icon name="cross" @click="$emit('input', false)" size="25px" />
             </template>
         </van-cell>
         <van-cell @click="nolike" icon="info-o" title="不感兴趣"></van-cell>
         <van-cell @click="isReport = true" icon="warning-o" is-link title="反馈垃圾内容"></van-cell>
         <van-cell icon="wap-home" title="拉黑作者"></van-cell>
        </van-cell-group>
        <!-- 反馈的选项 -->
        <van-cell-group v-if="isReport===true">
         <van-cell  title="拉黑作者">
           <template slot="title">
<van-icon @click="isReport=false" name="arrow-left" size="20px" />
           </template>
         </van-cell>
         <van-cell @click="report(item.id)" v-for="(item, index) in reportList" :key="index" :title="item.name"></van-cell>
        </van-cell-group>
     </van-dialog>
  </div>
</template>

<script>
import { apiNoLike, apiReport } from '../../../api/aritcle'
export default {
  // value显示与隐藏  artid文章id
  props: ['value', 'artid'],
  data () {
    return {
      // 不感兴趣面板
      isReport: false,
      // 举报的选项
      reportList: [
        { id: 0, name: '其他问题' },
        { id: 1, name: '标题夸张' },
        { id: 2, name: '低俗色情' },
        { id: 3, name: '错别字多' },
        { id: 4, name: '旧闻重复' },
        { id: 5, name: '广告软文' },
        { id: 6, name: '内容不实' },
        { id: 7, name: '涉嫌违法犯罪' },
        { id: 8, name: '侵权' }
      ]
    }
  },
  methods: {
    async nolike () {
      //   点击不感兴趣关闭面板
      this.$emit('input', false)
      //   调用父组件事件删除文章
      this.$emit('delChannel')
      //   发送不感兴趣文章id到服务器
      await apiNoLike(this.artid)
      window.console.log(this.artid)
    },
    // 反馈
    async report (type) {
      try {
        await apiReport({
          artid: this.artid,
          type: type
        })
        // 提示
        this.$toast.success('举报成功!你的!一等良民')
      } catch {
      // 提示
        this.$toast.fail('不能重复举报')
      }
      // 关闭面板
      this.$emit('input', false)

      // 返回三级面板
      this.isReport = false
    }
  }

}
</script>

<style>

</style>
