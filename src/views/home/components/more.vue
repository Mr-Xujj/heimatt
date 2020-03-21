<template>
  <div>
      <van-dialog :value="value"  :showConfirmButton="false" >
         <van-cell>
             <template slot="title">
<van-icon name="cross" @click="$emit('input', false)" size="25px" />
             </template>
         </van-cell>
         <van-cell @click="nolike" icon="info-o" title="不感兴趣"></van-cell>
         <van-cell icon="warning-o" is-link title="反馈垃圾内容"></van-cell>
         <van-cell icon="wap-home" title="拉黑作者"></van-cell>
     </van-dialog>
  </div>
</template>

<script>
import { apiNoLike } from '../../../api/aritcle'
export default {
  // value显示与隐藏  artid文章id
  props: ['value', 'artid'],
  methods: {
    async nolike () {
      //   点击不感兴趣关闭面板
      this.$emit('input', false)
      //   调用父组件事件删除文章
      this.$emit('delChannel')
      //   发送不感兴趣文章id到服务器
      await apiNoLike(this.artid)
      window.console.log(this.artid)
    }
  }

}
</script>

<style>

</style>
