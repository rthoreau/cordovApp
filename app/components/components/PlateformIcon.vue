<template>
  <div class="plateform-icon">
    <svgfile icon="lo" v-if="plateform === 'lo'"></svgfile>
    <svgfile icon="yt" v-if="plateform === 'yt'"></svgfile>
    <svgfile icon="sp" v-if="plateform === 'sp'"></svgfile>
  </div>
</template>

<script>
import svgfile from './SvgFile'
export default {
  name: 'PlateformIcon',
  components: {
    svgfile
  },
  props: {
    plateform: String
  }
}
</script>

<style>
.plateform-icon {
  width: 100%;
  height: 100%;
  position: relative;
}
.plateform-icon svg {
  position: absolute;
  top: 50%;
  height: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>