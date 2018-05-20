<template>
  <div id="localplayer">
  </div>
</template>

<script>
import VueHowler from 'vue-howler'
import {mapActions} from 'vuex'
export default {
  name: 'LocalPlayer',
  mixins: [VueHowler],
  props: {
    event: String,
    music: Object
  },
  data () {
    return {
      submenuVisible: false,
      seek: undefined,
      start: false
    }
  },
  methods: {
    ...mapActions({
      setMusic: 'manageStore/setMusic'
    })
  },
  watch: {
    event: function (val) {
      if (val === 'play') {
        if (!this.playing) {
          this.togglePlayback();
          window.aaa = this;
        }
        return;
      }
      if (val === 'pause') {
        if (this.playing) {
          this.togglePlayback();
        }
        return;
      }
      if (val.indexOf('seekto') !== -1) {
        val = val.replace('seekto', '');
        this.setSeek(parseInt(val));
        return
      }
      if (val === 'currenttime') {
        if (!this.started) {
          this.togglePlayback();
          this.$emit('currenttime', 0);
          return;
        }
        if (!this.playing) {
          this.$emit('paused');
          this.$emit('currenttime', 0);
          return;
        }
        this.$emit('currenttime', this.progress * this.duration);
      }
    },
    duration: function (val) {
      if (this.music.duration === 0) {
        this.setMusic({id: this.music.id, duration: this.duration})
        this.$emit('duration', this.duration);
        this.togglePlayback();
      }
    },
    playing: function (val) {
      if (val === true) {
        if (!this.started) {
          this.started = true;
        } else {
          this.$emit('currenttime', this.progress * this.duration);
        }
        this.$emit('playing', true);
      } else {
        if (this.seek === 0) {
          this.$emit('ended', true);
        }
      }
    },
    sources: function (val) {
      this.started = false;
      this.togglePlayback();
    }
  }
}
</script>