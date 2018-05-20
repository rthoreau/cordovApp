<template>
  <div id="favorite">
    <header class="page-header"><span class="page-title">Favoris</span>
    </header>
    <div class="page-content">
      <musicitem 
      v-for="data in getFavorites" 
      :key="data.id" 
      :music="data"
      :page="'favorite'"></musicitem>
      <span class="empty-message" v-if="getFavorites.length === 0">Vous n'avez aucune musique favorite&nbsp;! N'hésitez plus, cliquez sur le <svgfile icon="favorite"></svgfile> de ce que vous aimez !</span>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
import svgfile from '../components/SvgFile'
import {mapGetters} from 'vuex'

export default {
  name: 'Favorite',
  components: {
    musicitem,
    svgfile
  },
  computed: {
    ...mapGetters({
      getFavorites: 'manageStore/getFavorites'
    })
  }
}
</script>