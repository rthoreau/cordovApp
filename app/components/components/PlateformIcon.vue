<template>
  <div class="plateform-icon">
    <svg viewBox="0 0 28.643 33.622" v-if="plateform === 'lo'"><use xlink:href="#icon-lo"></use></svg>
    <svg viewBox="0 0 51.869 36.433" v-if="plateform === 'yt'"><use xlink:href="#icon-yt"></use></svg>
    <svg viewBox="0 0 36.363 36.433" v-if="plateform === 'sp'"><use xlink:href="#icon-sp"></use></svg>
  </div>
</template>

<script>
export default {
  name: 'PlateformIcon',
  props: {
    plateform: String
  }
}
</script>

<style>
.plateform-icon{
  width:100%;
  height:100%;
  position:relative;
}
.plateform-icon svg{
  position:absolute;
  top:50%;
  height:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
</style>