<template>
  <div class="app">
    <div class="errPage">
      <div class="nodata">
        <p>
          <i class="icon-404"></i>
        </p>
        <p>页面消失了。。。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    //this.$Title('打开失败')
  }
}
</script>

<style scpoed>
.errPage {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nodata {
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.nodata p {
  overflow: hidden;
  color: #998981;
}
.icon-nodata {
  width: 1.48rem;
  height: 1.41rem;
  background: url(../../../assets/img/sprite.png) -5.98rem -6.380966rem no-repeat;
  background-size: 12.318841rem 10.869565rem;
}
.icon-404 {
  width: 1.352657rem;
  height: 1.400966rem;
  background: url(../../../assets/img/sprite.png) -7.560386rem -6.376812rem no-repeat;
  background-size: 12.318841rem 10.869565rem;
}
</style>
