<template>
  <div id="appPlayer" :class="expandClass">
    <div class="player-container">
      <div v-if="expandClass === '' && duration !== 0" class="progress" :style="'width:' + currentTimeValue + '%'"></div>
      <timeslider v-if="expandClass !== ''" :time="currentTimeValue" @settime="seekTo"></timeslider>

      <div class="music-plateform" :class="plateform">
        <plateformicon :plateform="plateform"></plateformicon>
        <div class="video-container">
          <transition name="appear">
            <youtube v-if="plateform === 'yt'" class="video" :player-vars="{start: 0, autoplay: 0, controls:0, iv_load_policy: 3}" :player-width="320" :player-height="240" @ready="ready" @playing="playing" @buffering="buffering" @ended="ended" v-show="player && refresh !== false"></youtube>
          </transition>
          <transition name="appear">
            <img :src="getCurrentMusic.thumbnail" alt="" class="video" v-if="player && refresh && getCurrentMusic.thumbnail">
            <div class="video empty" v-if="refresh && !getCurrentMusic.thumbnail"><svgfile icon="lo"></svgfile></div>
          </transition>
          <div class="overlay"></div>
        </div>
      </div>

      <btn :click="() => playPause()" class="play">
        <transition name="switch" mode="out-in">
          <svgfile icon="play" v-if="paused" key="play"></svgfile>
          <svgfile icon="pause" v-if="!paused" key="pause"></svgfile>
        </transition>
      </btn>

      <btn :click="() => nextVideo(true)" class="next"><svgfile icon="next"></svgfile></btn>

      <p class="music-infos" :class="getCurrentMusic.id ? '' : 'empty'">
        <span class="music-title">{{getCurrentMusic.title}}</span>
        <span key="t" v-if="!unloaded" class="time">{{hmsDuration(currentTime)}} / {{hmsDuration(duration)}}</span>
        <span key="u" v-else class="unloaded">Musique inaccessible ! :'(</span>
      </p>

      <div class="expand-link" @click="expand()"><svgfile icon="draggable"></svgfile></div>
    </div>
    <waitingline @loop="loop = !loop" :class="loop ? 'looping' : ''"></waitingline>
    <localplayer v-if="plateform === 'lo' && sources && sources.length" :music="getCurrentMusic" :sources="sources" :event="localPlayerEvent" @ended="ended" @playing="playing" @currenttime="setProgressByGet" @duration="setDuration" @paused="pauseVideo"></localplayer>
  </div>
</template>

<script>
import svgfile from './components/SvgFile'
import Vue from 'vue'
import plateformicon from './components/PlateformIcon'
import waitingline from './pages/WaitingLine'
import VueYouTubeEmbed, {getIdFromURL/*, getTimeFromURL */} from 'vue-youtube-embed'
import {mapGetters, mapActions} from 'vuex'
import localplayer from './components/LocalPlayer'
import timeslider from './components/TimeSlider'
import btn from './components/Bouton'

Vue.use(VueYouTubeEmbed)
export default {
  name: 'App_player',
  components: {
    plateformicon,
    waitingline,
    localplayer,
    timeslider,
    btn,
    svgfile
  },
  data () {
    return {
      currentMusic: {},
      url: '',
      videoId: '',
      startTime: 15,
      player: '',
      paused: true,
      currentTime: 0,
      duration: 0,
      currentTimeValue: 0,
      currentTimeInterval: '',
      progressInterval: '',
      refresh: true,
      expandClass: '',
      sources: [],
      localPlayerEvent: '',
      plateform: '',
      unloaded: false,
      loop: false,
      windowEventListener: false,
      windowPlayerPaused: false,
      documentVisible: undefined,
      playInit: false
    }
  },
  methods: {
    ...mapActions({
      setCurrentMusic: 'manageStore/setCurrentMusic',
      musicAction: 'manageStore/musicAction',
      setMusic: 'manageStore/setMusic'
    }),
    nextVideo (forced) {
      forced = forced || false;
      if (this.loop) {
        if (forced) {
          this.loop = false;
        } else {
          this.currentTime = 0;
          this.seekTo(0);
          this.playVideo();
          return;
        }
      }
      var waiting = this.getWaitingLine;
      this.sources = [];
      if (waiting.length === 0) {
        this.pauseVideo();
        this.paused = true;
        this.setCurrentMusic('');
      } else {
        this.setCurrentMusic(this.getWaitingLine[0]);
        this.musicAction({action: 'remove', index: 0, from: 'waitingLine'})
      }
      this.setData();
    },
    ready (player) {
      if (this.plateform === 'yt' && this.videoId) {
        this.player = player;
        this.loadVideoById(this.videoId);
      }
    },
    playing () {
      if (!this.playInit) {
        this.pauseVideo();
        this.paused = true;
      } else {
        this.watchTime();
        if (this.paused) {
          this.paused = false;
        }
      }
    },
    ended () {
      this.nextVideo();
    },
    buffering () {
      this.setProgressByGet();
    },
    playPause () {
      if (this.paused) {
        this.playVideo();
        this.paused = false;
        this.playInit = true;
      } else {
        this.pauseVideo();
        this.paused = true;
      }
    },
    playVideo () {
      if (this.plateform === 'yt') {
        if (this.player) {
          this.player.playVideo();
        }
      } else {
        this.localPlayerEvent = 'play';
      }
    },
    pauseVideo (reset) {
      reset = reset ? 0 : false;
      if (this.plateform === 'yt') {
        if (this.player) {
          this.player.pauseVideo();
        }
      } else {
        this.paused = true;
        this.localPlayerEvent = 'pause';
      }
      this.watchTime(reset);
    },
    loadVideoById (id) {
      if (this.player && id) {
        this.player.loadVideoById({videoId: id, suggestedQuality: 'small', start: 0});
        this.setProgressByGet();
        window.player = this.player
        this.showVideo();
      }
    },
    seekTo (ratio) {
      var time = this.currentMusic.duration * ratio / 100;
      if (this.plateform === 'yt') {
        this.player.seekTo(time);
      } else {
        this.localPlayerEvent = 'seekto' + time;
      }
      this.setProgress(time);
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
    setProgress (time) {
      if (this.paused) {
        this.watchTime(false);
      } else {
        if (time) {
          this.currentTime = time;
          return;
        }
        this.currentTime = this.currentTime + 0.5;
        if (this.duration === 0) {
          if (this.plateform === 'yt') {
            var duration = this.player.getDuration();
            if (duration) {
              this.setMusic({id: this.getCurrentMusic.id, duration: duration})
              this.setDuration(duration);
            }
          }
        }
      }
    },
    setProgressByGet (timeValue) {
      if (this.plateform === 'yt') {
        if (this.player) {
          var time = this.player.getCurrentTime();
          if (time) {
            this.currentTime = time;
          }
        }
      } else {
        if (!timeValue) {
          this.localPlayerEvent = 'currenttime';
        } else {
          this.currentTime = parseInt(timeValue);
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
    expand (hide) {
      this.expandClass = this.expandClass === 'expanded' || hide ? '' : 'expanded';
      this.$emit('expanded', (this.expandClass !== ''));
    },
    setData () {
      var oldPlateform = this.plateform;
      this.currentMusic = this.getCurrentMusic;
      this.plateform = this.currentMusic.plateform;
      this.duration = this.currentMusic.duration;
      this.currentTime = 0;
      this.unloaded = false;
      this.sources = [];
      this.localPlayerEvent = this.localPlayerEvent === 'play' ? '' : this.localPlayerEvent;
      if (this.plateform === 'yt') {
        if (this.currentMusic.url) {
          this.videoId = getIdFromURL(this.currentMusic.url);
          if (oldPlateform !== 'lo') {
            this.loadVideoById(this.videoId);
          }
        }
        if (this.currentMusic.videoId) {
          this.videoId = this.currentMusic.videoId;
          this.loadVideoById(this.videoId);
        }
        if (oldPlateform !== 'lo') {
          this.setProgressByGet();
        }
      } else if (this.currentMusic.id !== '') {
        this.$nextTick(function () {
          if (this.currentMusic.file && this.currentMusic.file.name) {
            var self = this;
            let reader = new window.FileReader()
            reader.readAsDataURL(self.currentMusic.file)
            reader.onload = () => {
              self.sources = [reader.result]
              self.$nextTick(function () {
                self.playVideo();
              });
            }
          } else {
            console.log('File is unloaded');
            this.unloaded = true;
            this.pauseVideo();
          }
        })
      }
    },
    setDuration (duration) {
      this.duration = duration;
    },
    showVideo () {
      if (this.plateform === 'yt') {
        var self = this;
        window.setTimeout(function () {
          self.refresh = 0;
        }, 1500);
      }
    }
  },
  mounted () {
    this.currentMusic = this.getCurrentMusic;
    this.setData();
    var self = this;
    if (!this.windowEventListener) {
      document.addEventListener('visibilitychange', function () {
        self.documentVisible = !document.hidden;
      });
      this.windowEventListener = true;
    }
  },
  computed: {
    ...mapGetters({
      getCurrentMusic: 'manageStore/getCurrentMusic',
      getWaitingLine: 'manageStore/getWaitingLine'
    })
  },
  watch: {
    player: function (val) {
      if (val && this.playInit) {
        this.playVideo();
      }
    },
    currentTime: function (time) {
      time = time * 100 / this.duration;
      if (time > 100) {
        time = 100;
      }
      this.currentTimeValue = time;
    },
    getCurrentMusic: function (music) {
      this.playInit = true;
      if (music.plateform === 'yt') {
        if (music.url) {
          this.videoId = getIdFromURL(music.url);
        } else {
          this.videoId = music.videoId;
        }
        this.videoId = music.url ? getIdFromURL(music.url) : music.videoId;
      } else {
        this.videoId = '';
      }
      this.duration = music.duration;
      this.currentTime = 0;
      this.refresh = false;
      this.$nextTick(function () {
        this.refresh = true;
      });
      this.setData();
    },
    $route: function () {
      this.expand(true);
    },
    documentVisible: function (visible) {
      //Force to pause/play youtube player on tab switch/tab back
      if (this.plateform === 'yt') {
        if (!visible) {
          if (this.paused === false) {
            this.pauseVideo();
            this.windowPlayerPaused = true;
          }
        } else {
          if (this.windowPlayerPaused === true) {
            this.playVideo();
            this.windowPlayerPaused = false;
          }
        }
      }
    }
  }
}
</script>

<style>
#appPlayer {
  position: fixed;
  bottom: calc(-28rem);
  width: 100%;
  height: calc(36rem);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 6.15rem, transparent 6.15rem, transparent);
  text-align: left;
  color: white;
  z-index: 100;
  transform-origin: bottom;
  transform: translate(0, 4rem);
  transition: transform 0.8s;
}
#appPlayer.expanded {
  border-top: 1px solid rgba(33, 82, 146, 0.15);
  transform: translate(0, -28rem);
  transition: transform 0.5s;
}
#appPlayer.expanded .player-container {
  height: 6.15rem;
}
#appPlayer.expanded .music-infos {
  height:calc(100% - 2.2rem);
}
#appPlayer.expanded .expand-link {
  top:calc(50% + 1.4rem);
}

.player-container {
  position: relative;
  z-index: 100;
  height: 4rem;
  padding: 0.5rem 4%;
}
.player-container .music-plateform {
  top: 0;
  left:0;
  height: 2.85rem;
  position: relative;
  display: inline-block;
  margin-right: 0.25rem;
  vertical-align: middle;
  overflow:hidden;
}
.player-container .plateform-icon{
  top:0;
}
.player-container .button {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 1.8rem;
}
.player-container .expand-link {
  position: absolute;
  top:50%;
  transform:translate(0,-50%);
  right: 0.5rem;
  height: 2rem;
}

.progress {
  position: absolute;
  top: -0.15rem;
  left: 0;
  height: 0.15rem;
  background-color: white;
  transition: width 0.5s linear;
}

.expanded .progress {
  top: 0;
}

.video-container {
  height: 2.85rem;
  position: absolute;
  width: 3.5rem;
  margin-left: 0.5rem;
  top: 0;
  left: 0;
  overflow: hidden;
}

.video {
  position: absolute;
  display: inline-block;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  object-fit: cover;
}
.video.empty{
  background-color:#071a2d;
}
.video svg{
  position: absolute;
  top: 50%;
  height: 50%;
  left: 43%;
  transform: translate(-50%, -50%);
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

.video iframe {
  position:relative;
  top:-1%;
  width: 100% !important;
  height: 102% !important;
}

.switch-enter-active, .switch-leave-active {
  transition: all 0.3s ease;
}

.switch-enter, .switch-leave-to {
  opacity: 0;
}

.time {
  font-size: 0.8rem;
}

.play {
  height: 2rem;
}
.play svg {
  top: 0;
  left: 0;
  position: absolute;
}

.music-infos {
  display: inline-block;
  white-space: nowrap;
  width: calc(100% - 10.5rem);
  vertical-align: middle;
  margin-left: 0.3rem;
  height:100%;
  padding-top:calc((10vh - 4rem)/2);
}
.music-infos.empty{
  text-overflow: unset;
}
.music-infos span {
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: -0.1rem;
  display: block;
  line-height:1.3rem;
}
.music-infos span + span {
  margin-top: 0.2rem;
}
.unloaded{
  color:#ff3f3f;
}
</style>
