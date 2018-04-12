<template>
  <div id="appPlayer" :class="expandClass">
    <div class="player-container">
      <div class="progress" :style="currentTimeValue"></div>

      <div class="music-plateform" v-bind:class="getCurrentMusic.plateform">
        <plateformicon v-bind:plateform="getCurrentMusic.plateform"></plateformicon>
      </div>

      <div class="video-container">
        <transition name="appear">
          <youtube class="video" :players-vars="{start: 0, autoplay: 0, controls:0}" :player-width="320" :player-height="240" @ready="ready" @playing="playing" @buffering="buffering" @ended="ended" v-show="player && refresh"></youtube>
        </transition>
        <transition name="appear">
          <img v-bind:src="getCurrentMusic.thumbnail" alt="" class="video" v-if="player && refresh">
        </transition>
        <div class="overlay"></div>
      </div>

      <button @click="playPause()" class="play">
        <transition name="switch" mode="in-out">
            <svg viewBox="0 0 23.125 23.129" v-if="paused" key="play"><use xlink:href="#icon-play"></use></svg>
            <svg viewBox="0 0 23.125 23.129" v-if="!paused" key="pause"><use xlink:href="#icon-pause"></use></svg>
        </transition>
      </button>

      <button @click="nextVideo()" class="next">Next</button>
      <button @click="test()" class="next">test</button>
      <span>{{hmsDuration(currentTime)}} / {{hmsDuration(duration)}}</span>
      <button class="expand-link" @click="expand()"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-next" ></use></svg></button>
    </div>
    <waitingline></waitingline>
  </div>
</template>

<script>
//https://github.com/kaorun343/vue-youtube-embed
import Vue from 'vue'
import plateformicon from './components/PlateformIcon'
import waitingline from './pages/WaitingLine'
import VueYouTubeEmbed, {getIdFromURL/*, getTimeFromURL */} from 'vue-youtube-embed'
import {mapGetters, mapActions} from 'vuex'

Vue.use(VueYouTubeEmbed)
export default {
  name: 'App_player',
  components: {
    plateformicon,
    waitingline
  },
  data () {
    return {
      currentMusic: this.$store.getters['manageStore/getCurrentMusic'],
      url: '',
      videoId: '',
      startTime: 15,
      player: '',
      paused: true,
      currentTime: 0,
      duration: 0,
      currentTimeValue: '',
      currentTimeInterval: '',
      progressInterval: '',
      refresh: true,
      expandClass: ''
    }
  },
  methods: {
    ...mapActions({
      setCurrentMusic: 'manageStore/setCurrentMusic'
    }),
    nextVideo () {
      this.setCurrentMusic('ert5784ert');
    },
    ready (player) {
      this.player = player;
      this.loadVideoById(this.videoId);
    },
    playing () {
      this.watchTime();
      if (this.paused) {
        this.paused = false;
      }
    },
    ended () {
      this.nextVideo();
    },
    buffering () {
      console.log('buffering');
      if (this.paused) {
        //this.playVideo();
      }
      this.setProgressByGet();
    },
    playPause () {
      if (this.paused) {
        this.playVideo();
        this.paused = false;
      } else {
        this.pauseVideo();
        this.paused = true;
      }
    },
    playVideo () {
      if (this.player) {
        this.player.playVideo();
        console.log(this.player);
      }
    },
    pauseVideo () {
      if (this.player) {
        this.player.pauseVideo();
        this.watchTime(false);
      }
    },
    loadVideoById (id) {
      if (this.player) {
        console.log(id);
        //this.player.loadVideoById(id);
        this.setProgressByGet();
      }
    },
    watchTime (active) {
      active = active !== false;
      if (active) {
        if (!this.progressInterval) {
          this.progressInterval = window.setInterval(this.setProgress, 500);
          this.currentTimeInterval = window.setInterval(this.setProgressByGet, 5000);
        }
      } else {
        window.clearInterval(this.currentTimeInterval);
        window.clearInterval(this.progressInterval);
        this.currentTimeInterval = '';
        this.progressInterval = '';
      }
    },
    setProgress () {
      if (this.paused) {
        this.watchTime(false);
      } else {
        this.currentTime = this.currentTime + 0.5;
      }
    },
    setProgressByGet () {
      if (this.player) {
        var time = this.player.getCurrentTime();
        if (time) {
          this.currentTime = time;
        }
      }
    },
    hmsDuration (val) {
      var h = Math.floor(val / 3600);
      h = h === 0 ? '' : h + ':';
      var m = Math.floor(val % 3600 / 60);
      m = m >= 10 ? m : '0' + m;
      var s = Math.floor(val % 3600 % 60);
      s = s >= 10 ? s : '0' + s;
      return h + m + ':' + s;
    },
    test () {
      this.player.seekTo(this.currentTime + 50);
    },
    expand () {
      //TODO quand expand, changer de route
      this.expandClass = this.expandClass === '' ? 'expanded' : '';
      this.$emit('expanded', (this.expandClass !== ''));
    }
  },
  mounted () {
    this.videoId = getIdFromURL(this.currentMusic.url);
    this.duration = this.currentMusic.duration;
  },
  computed: {
    ...mapGetters({
      getCurrentMusic: 'manageStore/getCurrentMusic'
    })
  },
  //TODO
  // detect onPause (modif this.paused)
  // set quality to low/small
  // submenu headbox
  // animation hide thumbnail
  watch: {
    player: function (val) {
      if (val) {
        this.playVideo();
      }
    },
    currentTime: function (time) {
      time = time * 100 / this.duration;
      if (time > 100) {
        time = 100;
      }
      this.currentTimeValue = 'width:' + time + '%';
    },
    getCurrentMusic: function (music) {
      this.videoId = getIdFromURL(music.url);
      this.duration = music.duration;
      this.currentTime = 0;
      this.refresh = false;
      this.$nextTick(function () {
        this.refresh = true;
      })
    },
    videoId: function (id) {
      this.loadVideoById(id);
      this.setProgressByGet();
    }
  }
}
</script>

<style>
#appPlayer{
  position:fixed;
  bottom:0;
  height:3.85rem;
  width:100%;
  background:linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 4rem, transparent 4rem, transparent);
  text-align:left;
  color:white;
  z-index:100;
  transition:height 0.5s;
}
.player-container{
  padding:0.5rem 4%;
}
#appPlayer.expanded{
  border-top:1px solid rgba(33,82,146,0.15);
  height:calc(100% - 4rem);
}
.progress{
  position:absolute;
  top:-0.15rem;
  left:0;
  height:0.15rem;
  background-color:white;
  transition:width 0.5s linear;
}
.player-container .music-plateform{
  top:0.5rem;
  height:2.85rem;
  position:static;
  display:inline-block;
  margin-right:0.5rem;
}
.video-container{
  height:2.85rem;
  position:absolute;
  width:3.5rem;
  margin-left:0.5rem;
  top:0.5rem;
  left:4%;
}
.video{
  position:absolute;
  display:inline-block;
  height:100%;
  width:100%;
  right:0;
  top:0;
}
.overlay{
  position:absolute;
  left:0;
  right:0;
  top:0;
  z-index:10;
}
.video iframe{
  width:100%!important;
  height:100%!important;
}
#appPlayer button{
  position:relative;
  display:inline-block;
  vertical-align:top;
  width:2rem;
}
#appPlayer button svg{
  position:absolute;
  height:1.8rem;
  left:50%;
  top:0.5rem;
}

.switch-leave-active {
  transition: all 0.8s ease;
}
.switch-enter,
.switch-leave-to{
  opacity: 0;
}
#appPlayer.sortable-drag{
  width:300%!important;
  left:-50%!important;
}
#appPlayer.sortable-drag *{
  display:none;
}
.expand-link{
  height:1.5rem;
}
</style>
