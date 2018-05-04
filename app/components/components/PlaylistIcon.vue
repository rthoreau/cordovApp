<template>
  <div class="playlisticon" @click="$emit('click')">
    <div class="tl white"></div>
    <div class="bl white"></div>
    <div class="r white"></div>
    <div class="tl" :style="'background-color:'+colors[0].hex"></div>
    <div class="bl" :style="'background-color:'+colors[1].hex"></div>
    <div class="r" :style="'background-color:'+colors[2].hex"></div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistIcon',
  props: {
    colors: Array
  }
}
</script>

<style>
.playlisticon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 3rem;
  height: 3rem;
}
.playlisticon.edit {
  border: 2px dashed white;
}
.playlisticon div {
  position: absolute;
  width: 60%;
  height: 60%;
  background-color: #656685;
  border-radius: 50%;
  opacity: 0.5;
}
.playlisticon div.white {
  background-color: white;
  opacity: 0.5;
}
.playlisticon div.tl {
  left: 3.27%;
}
.playlisticon div.r {
  left: 37.71%;
  top: 50%;
  transform: translate(0, -50%);
}
.playlisticon div.bl {
  left: 3.27%;
  top: 40%;
}
</style>