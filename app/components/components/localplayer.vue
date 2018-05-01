<template>
  <div id="localplayer">
    <span>Total duration: {{ duration }} seconds</span>
    <span>Progress: {{ (progress * 100) }}%</span>
    <button @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</button>
  </div>
</template>

<script>
import VueHowler from 'vue-howler'
import {mapActions} from 'vuex'
export default {
  name: 'localplayer',
  mixins: [VueHowler],
  props: {
    event: String,
    music: Object
  },
  data () {
    return {
      submenuVisible: false,
      seek: undefined
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
      if (val === 'play' || val === 'pause') {
        this.togglePlayback();
        return;
      }
      if (val.indexOf('seekto') !== -1) {
        val.replace('seekto', '');
        this.seek = parseInt(val);
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