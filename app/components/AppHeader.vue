<template>
  <header id="appHeader">
    <ul class="nav">
      <li><router-link to="/">
        <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-home"></use></svg>
      </router-link></li>
      <li><router-link to="/Playlists">
        <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-playlist"></use></svg>
      </router-link></li>
      <li><router-link to="/Favorite">
        <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-favorite"></use></svg>
      </router-link></li>
      <li><router-link to="/Search">
        <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-search"></use></svg>
      </router-link></li>
      <li><a @click="submenuVisible = !submenuVisible">
        <svg viewBox="0 0 8.688 23.129"><use xlink:href="#icon-submenu"></use></svg>
      </a></li>
    </ul>
    <submenu v-if="submenuVisible" v-bind:links="links" @closemenu="submenuVisible = false"></submenu>
  </header>
</template>

<script>
import submenu from './components/SubMenu'
export default {
  name: 'App_header',
  components: {
    submenu
  },
  data () {
    return {
      submenuVisible: false,
      links: [{action: () => this.reload(), text: 'Réinitialiser les données'}]
    }
  },
  methods: {
    reload () {
      window.localStorage.clear();
      window.location.reload()
    }
  }
}
</script>

<style lang="sass">
  #appHeader{
    position:fixed;
    top:0;
    width:100%;
    height:10vh;
    background-color:rgba(0,0,0,0.7);
    z-index:100;
    .nav{
      list-style-type:none;
      margin:0;
      padding:0.25rem 8% 0.25rem 4%;
      height:100%;
      font-size:0;
      li{
        display:inline-block;
        width:24.1%;
        height:100%;
        text-align:center;
        vertical-align: middle;
        &:last-child{
          display:inline-block;
          width:3.6%;
          svg{
            height:2rem;
            position:relative;
            top:-0.2rem;
          }
        }
      }
      a{
        position:relative;
        display:inline-block;
        padding:1rem;
        height:100%;
        &:after{
          position:absolute;
          left:50%;
          bottom:-0.25rem;
          content:'';
          width:0;
          transform:translate(-50%,0);
          height:0.1rem;
          background-color:#215292;
          transition:width 0.5s;
        }
        &.router-link-exact-active{
          svg{
            fill:#207bd2;
          }
          &:after{
            width:100%;
          }
        }
      }
    }
    .submenu{
      top:4rem;
    }
  }
</style>
