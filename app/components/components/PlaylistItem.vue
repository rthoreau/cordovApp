<template>
  <div class="playlist-item item" v-bind:class="submenuVisible ? 'active' : ''">
    <div class="playlist-content">
      <span class="playlist-name">{{playlist.name}}</span>
      <ul class="playlist-music-list">
        <li
        v-for="(id, index) in playlist.musics" 
        v-bind:key="index" 
        v-bind:id="id">{{index}} : {{getMusic(id).title}}</li>
      </ul>
    </div>
    <svg class="submenu-link" viewBox="0 0 7.234 31.32" @click="submenuVisible = !submenuVisible"><use xlink:href="#icon-submenu"></use></svg>
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
export default {
  name: 'MusicItem',
  props: {
    playlist: Object
  },
  components: {
    submenu,
    popup
  },
  data () {
    return {
      submenuVisible: false,
      links: [
        {text: 'Accéder à la playlist', action: 'Playlist/' + this.playlist.id, mode: 'router'},
        {text: 'Supprimer la playlist', action: () => this.callDeletePlaylist()}
      ],
      popupVisible: false,
      popupParams: {
        okAction: () => this.callDeletePlaylist(true),
        cancelAction: () => this.popupVisible = false
      }
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
      deletePlaylist: 'manageStore/deletePlaylist'
    })
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
  width:97%;
  vertical-align: middle;
  margin-right:1%;
}
.playlist-name{
  font-weight:bold;
}
.playlist-music-list li{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>