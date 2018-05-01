<template>
  <div id="favorite">
    <header class="page-header"><span class="page-title">Favoris</span><!--<svg class="submenu-link" viewBox="0 0 8.688 23.129" @click="submenuVisible = !submenuVisible"><use xlink:href="#icon-submenu"></use></svg>-->
    </header>
    <!--<SubMenu v-if="submenuVisible" :links="links" @closeMenu="submenuVisible = false"></SubMenu>-->
    <div class="page-content">
      <musicitem 
      v-for="(data, index) in getFavorites" 
      :key="index" 
      :music="data"
      :page="'favorite'"></musicitem>
      <span class="empty-message" v-if="getFavorites.length === 0">Vous n'avez aucune musique favorite ! N'hésitez plus, cliquez sur le <svg viewBox="0 0 23.125 23.129" alt="Coeur"><use xlink:href="#icon-favorite"></use></svg> de ce que vous aimez !</span>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
//import SubMenu from '../components/SubMenu'
import {mapGetters} from 'vuex'

export default {
  name: 'Favorite',
  components: {
    musicitem
    //SubMenu
  },
  data () {
    return {
      submenuVisible: false
      /*links:[{action: () => console.log(this.musics), text:'Do something'},
      {action:() =>  alert('Done.'), text:'Do nothing'},
      {action:() =>  alert('Something went wrong ! Try again later !'), text:'Delete all the internet'}]*/
    }
  },
  computed: {
    ...mapGetters({
      getFavorites: 'manageStore/getFavorites'
    })
  }
}
</script>

<style>
</style>