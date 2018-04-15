<template>
  <div id="test">
    <span>Total duration: {{ duration }} seconds</span>
    <span>Progress: {{ (progress * 100) }}%</span>
    <button @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</button>
  </div>
</template>

<script>
import VueHowler from 'vue-howler'
import {mapActions} from 'vuex'
export default {
  name: 'test',
  mixins: [VueHowler],
  props: {
    event: String,
    music: Object
  },
  data () {
    return {
      submenuVisible: false
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      setMusic: 'manageStore/setMusic'
    })
  },
  watch: {
    event: function (val) {
      console.log(val)
      switch (val) {
        case 'play':
        case 'pause':
          this.togglePlayback();
          break
      }
    },
    duration: function (val) {
      if (this.music.duration === 0) {
        this.setMusic({id: this.music.id, duration: this.duration})
      }
    }
  }
}
</script>

<style>
  #waitingLine{
    height:50%;
  }
</style>