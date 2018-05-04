<template>
  <div id="playlists">
    <header class="page-header">
      <span class="page-title">Playlists</span>
      <router-link :to="nextIdLink">
        <svg class="submenu-link" viewBox="0 0 23.125 23.129"><use xlink:href="#icon-plus"></use></svg>
      </router-link>
    </header>
    <div class="page-content">
      <span class="empty-message" v-if="getPlaylists.length === 0">Vous n'avez aucune playlist pour l'instant&nbsp;! <router-link :to="nextIdLink">Ajouter une playlist <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-plus"></use></svg></router-link></span>
      <playlistitem 
      v-for="(data) in getPlaylists" 
      :key="data.id" 
      :playlist="data"></playlistitem>
    </div>
  </div>
</template>

<script>
import playlistitem from '../components/PlaylistItem'
import {mapGetters} from 'vuex'
export default {
  name: 'Playlists',
  components: {
    playlistitem
  },
  data () {
    return {
      nextIdLink: ''
    }
  },
  mounted () {
    var nextId = this.getPlaylists.length ? (parseInt(this.getPlaylists[this.getPlaylists.length - 1].id) + 1) : 1;
    this.nextIdLink = '/Playlist/' + nextId + '/edit';
  },
  computed: {
    ...mapGetters({
      getPlaylists: 'manageStore/getPlaylists'
    })
  }
}
</script>
