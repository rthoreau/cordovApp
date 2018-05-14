<template>
  <div id="home">
    <div class="page-content">
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
    <!--<div class="circleContainer">
      <div class="circle tl"></div>
      <div class="circle bl"></div>
      <div class="circle r"></div>
    </div>-->
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
  margin:0.8rem 4% 0.5rem;
}
h2{
  padding:0 4%;
  opacity:0.7;
}
/*.circleContainer{
  position:relative;
  width:200px;
  height:200px;
}
.circle {
  position: absolute;
  width: 65%;
  height: 65%;
  background-color: #656685;
  border-radius: 50%;
  opacity: 0.5;
}
.circle {
  background-color: white;
  opacity: 0.5;
}
.circle.tl {
  top:0;
  left: 2.345%;
}
.circle.r {
  left: 32.655%;
  top: 50%;
  transform: translate(0, -50%);
}
.circle.bl {
  left: 2.345%;
  bottom:0;
}*/

</style>
