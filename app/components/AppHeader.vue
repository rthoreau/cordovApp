<template>
  <header id="appHeader">
    <ul class="nav">
      <li><router-link to="/" class="link">
        <svgfile :icon="'home'"></svgfile>
      </router-link></li>
      <li><router-link to="/Playlists" class="link">
        <svgfile :icon="'playlist'"></svgfile>
      </router-link></li>
      <li><router-link to="/Favorite" class="link">
        <svgfile :icon="'favorite'"></svgfile>
      </router-link></li>
      <li><router-link to="/Search" class="link">
        <svgfile :icon="'search'"></svgfile>
      </router-link></li>
      <li><btn :click="() => submenuVisible = !submenuVisible" class="link">
        <submenulink></submenulink>
      </btn></li>
    </ul>
    <submenu v-if="submenuVisible" v-bind:links="links" @closemenu="submenuVisible = false"></submenu>
  </header>
</template>

<script>
import submenu from './components/SubMenu'
import btn from './components/Bouton'
import svgfile from './components/SvgFile'
import submenulink from './components/SubMenuLink'
export default {
  name: 'App_header',
  components: {
    submenu,
    btn,
    svgfile,
    submenulink
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

<style>
#appHeader {
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
}
#appHeader .nav {
  list-style-type: none;
  margin: 0;
  padding: 0.25rem 8% 0.25rem 4%;
  height: 100%;
  font-size: 0;
}
#appHeader .nav li {
  display: inline-block;
  width: 24.1%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
}
#appHeader svg {
  min-height:1.5rem;
}
#appHeader .nav li:last-child {
  display: inline-block;
  width: 3.6%;
}
#appHeader .nav li:last-child .link{
  padding: 0;
}
#appHeader .nav li:last-child .link:after {
  content:none;
}
#appHeader .nav li:last-child svg {
  max-height:60%;
  top:50%;
  left:5%;
  transform:translate(0, -50%);
  position: relative;
}
#appHeader .nav .link {
  position: relative;
  display: inline-block;
  padding: 17%;
  height: 100%;
}
#appHeader .nav .link:after {
  position: absolute;
  left: 50%;
  bottom: -0.25rem;
  content: "";
  width: 0;
  transform: translate(-50%, 0);
  height: 0.1rem;
  background-color: #215292;
  transition: width 0.5s;
}
#appHeader .nav .link.router-link-exact-active svg {
  fill: #207bd2;
}
#appHeader .nav .link.router-link-exact-active:after {
  width: 100%;
}
#appHeader .submenu {
  top: 4rem;
}
</style>
