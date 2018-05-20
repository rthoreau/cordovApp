<template>
  <div id="home">
    <div class="page-content"><img src="../../assets/logo.png" alt="PLaylith" class="logo" v-if="getLastMusics.length === 0 && getLastPlaylist.length === 0">
      <h1 v-if="getLastMusics.length === 0 && getLastPlaylist.length === 0">Bienvenue sur Playlith&nbsp;!</h1>
      <span class="empty-message" v-if="getLastMusics.length === 0 && getLastPlaylist.length === 0">
      Pour commencer à écouter de la musique, ça se passe dans l'onglet de <router-link to="/Search">Recherche <svgfile icon="search"></svgfile></router-link>&nbsp;!</span>

      <section class="last music" v-if="getLastMusics.length !== 0">
        <h2>Vos dernières écoutes&nbsp;:</h2>
        <musicitem 
          v-for="(musicId, index) in getLastMusics"
          v-if="getMusic(musicId) !== false" 
          :key="index" 
          :music="getMusic(musicId)"
          :page="'home'"></musicitem>
      </section>
      <section class="last playlist" v-if="getLastPlaylist.length !== 0">
        <h2>Votre dernière playlist jouée &nbsp;:</h2>
        <playlistitem 
          v-for="(data) in getPlaylists" 
          :key="data.id" 
          :playlist="data"
          v-if="getLastPlaylist !== '' && data.id === getLastPlaylist"></playlistitem>
      </section>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import musicitem from '../components/MusicItem'
import playlistitem from '../components/PlaylistItem'
import svgfile from '../components/SvgFile'
export default {
  name: 'Home',
  components: {
    musicitem,
    playlistitem,
    svgfile
  },
  computed: {
    ...mapGetters({
      getLastMusics: 'manageStore/getLastMusics',
      getLastPlaylist: 'manageStore/getLastPlaylist',
      getPlaylists: 'manageStore/getPlaylists',
      getMusic: 'manageStore/getMusic'
    })
  }
}
</script>

<style>
h1 {
  margin:0 4% 3rem;
  text-align:center;
}
h2{
  padding:0 4%;
  opacity:0.7;
}
.logo{
  margin:3rem auto 1.5rem;
  display:block;
  width:40%;
}
</style>
