<template>
  <div class="playlist-item item" v-bind:class="submenuVisible ? 'active' : ''">
    <div class="playlist-infos">
      <playlisticon :colors="playlist.colors"></playlisticon>
      <span class="music-amount">{{playlist.musics.length}}<svg viewBox="0 0 28.643 33.622"><use xlink:href="#icon-lo"></use></svg></span>
      <span class="playlist-duration">{{hmsDuration(playlist.duration)}}</span>
    </div>
    <div class="playlist-content" @click="handleClick()">
      <span class="playlist-name">{{playlist.name}}</span>
      <ul class="playlist-music-list">
        <li
        v-for="(id, index) in playlist.musics" 
        :key="index" 
        :id="id" v-if="index <= 3">{{index + 1}} : {{getMusic(id).title}}</li>
      </ul>
    </div>
    <svg class="submenu-link" viewBox="0 0 8.688 23.129" @click="submenuVisible = !submenuVisible"><use xlink:href="#icon-submenu"></use></svg>
    <submenu v-if="submenuVisible" v-bind:links="links" @closemenu="submenuVisible = false"></submenu>
    <popup v-if="popupVisible" v-bind:params="popupParams">
      Supprimer la playlist ?
    </popup>
  </div>
</template>

<script>
import submenu from '../components/SubMenu'
import {mapActions, mapGetters} from 'vuex'
import popup from '../components/Popup'
import playlisticon from '../components/PlaylistIcon'
export default {
  name: 'MusicItem',
  props: {
    playlist: Object
  },
  components: {
    submenu,
    popup,
    playlisticon
  },
  data () {
    return {
      submenuVisible: false,
      links: [
        {text: 'Accéder à la playlist', action: 'Playlist/' + this.playlist.id, mode: 'router'},
        {text: 'Lecture aléatoire', action: () => this.musicAction({action: 'randomize', to: 'waitingLine', ids: this.playlist.musics})},
        {text: 'Ajouter à la file', action: () => this.musicAction({action: 'add', to: 'waitingLine', ids: this.playlist.musics, from: 'playlist'})},
        {text: 'Supprimer la playlist', action: () => this.callDeletePlaylist()}
      ],
      popupVisible: false,
      popupParams: {
        okAction: () => this.callDeletePlaylist(true),
        cancelAction: () => this.popupVisible = false
      },
      clicks: 0,
      timer: null
    }
  },
  methods: {
    callDeletePlaylist (confirmed) {
      confirmed = confirmed || false;
      if (confirmed) {
        this.deletePlaylist(this.playlist);
      } else {
        this.popupVisible = true;
      }
    },
    ...mapActions({
      deletePlaylist: 'manageStore/deletePlaylist',
      setCurrentMusic: 'manageStore/setCurrentMusic',
      musicAction: 'manageStore/musicAction'
    }),
    play () {
      var musics = [...this.playlist.musics];
      this.setCurrentMusic(musics.pop());
      this.musicAction({action: 'add', ids: musics, to: 'waitingLine'});
    },
    handleClick: function (event) {
      this.clicks++
      if (this.clicks === 1) {
        var self = this
        this.timer = setTimeout(function () {
          self.play();
          self.clicks = 0
        }, 500);
      } else {
        clearTimeout(this.timer);
        this.$router.push({path: '/Playlist/' + this.playlist.id})
        this.clicks = 0;
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
    }
  },
  computed: {
    ...mapGetters({
      getMusic: 'manageStore/getMusic'
    })
  }
}
</script>

<style>
.playlist-item{
  position:relative;
  font-size:0;
  margin-bottom:1rem;
}
.playlist-content{
  display:inline-block;
  font-size:1rem;
  width:calc(96% - 4rem);
  vertical-align: middle;
  margin:0 1%;
}
.playlist-name{
  font-weight:bold;
  display:block;
  word-break:break-word;
  max-height:2.6rem;
  overflow:hidden;
}
.playlist-music-list li{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  opacity:0.7;
}
.playlist-infos{
  display:inline-block;
  text-align:center;
  vertical-align:top;
  width:4rem;
  padding-top:0.5rem;
}
.playlist-infos .music-amount, .playlist-infos .playlist-duration{
  font-size:0.9rem;
  display:block;
  margin-top:0.15rem;
}
.playlist-infos svg{
  width:1rem;
  height:auto;
  vertical-align: top;
  margin-left:0.5rem;
}
</style>