<template>
  <div class="page indexPage">
    <!-- 翻牌抽奖组件 -->
    <Fanpai></Fanpai>
    <!-- 转盘抽奖 -->
    <!-- <Zhuanpan></Zhuanpan> -->
    <!-- 一系列弹窗 -->
    <Toastrunlot v-if="isShowToast"></Toastrunlot>
  </div>
</template>

<script>
import Fanpai from './Fplot'
import Zhuanpan from './Zplot'
import Toastrunlot from './Toastrunlot'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
    Fanpai, // 翻牌组件
    Zhuanpan, // 转盘抽奖
    Toastrunlot // 中奖弹窗
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowToast: 'isShowToast'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss"></style>
