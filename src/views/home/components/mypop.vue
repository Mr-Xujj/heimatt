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
<van-button type="danger" hairline plain size="mini" round>编辑</van-button>
              </template>
          </van-cell>
      <!-- 我的频道项 -->
      <van-grid>
  <van-grid-item v-for="(item, index) in 8" :key="index" text="文字" />
</van-grid>
          <!-- 频道推荐 -->
          <van-cell>
              <template slot="title">
                  <div>频道推荐</div>
              </template>
          </van-cell>
      <!-- 我的频道项 -->
      <van-grid>
  <van-grid-item v-for="(item, index) in 8" :key="index" text="文字" />
</van-grid>
      </van-popup>

  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    //   点击叉叉关闭面板
    colos () {
      this.$emit('input', false)
      window.console.log('关闭了')
    }
  }

}
</script>

<style>

</style>
