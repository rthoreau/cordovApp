<template>
  <div class="submenu" v-bind:class="supClass" v-on-clickaway="closeMenu">
    <ul>
      <li v-if="links" v-for="(link, index) in links" 
        v-bind:key="index">
        <a @click="callAction(link)" v-if="link.mode !== 'router'">{{link.text}}</a>
        <router-link v-if="link.mode === 'router'" v-bind:to="link.action">{{link.text}}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [ clickaway ],
  name: 'SubMenu',
  props: {
    links: Array
  },
  data () {
    return {
      supClass: ''
    }
  },
  methods: {
    closeMenu () {
      this.$emit('closemenu', true);
      return true;
    },
    callAction (link) {
      this.closeMenu()
      try {
        link.action.call()
      } catch (error) {
        console.log('Bad action in links', error)
      }
    }
  },
  mounted () {
    var offsetHeight = this.$el.parentElement.parentElement.offsetTop;
    var scrollTop = document.scrollingElement.scrollTop;
    var screenHeight = document.scrollingElement.offsetHeight;
    var itemTop = this.$el.parentElement.offsetTop;
    var menuHeight = this.$el.offsetHeight;
    if ((screenHeight - 3 * offsetHeight) < ((itemTop - scrollTop) + menuHeight + 0.5 * offsetHeight)) {
      this.supClass = 'top';
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.closeMenu);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.closeMenu);
  }
}
</script>

<style lang="sass">
.submenu{
  background-color:white;
  position:fixed;
  top:8rem;
  right:0.5rem;
  z-index:50;
  color:#222;
  ul{
    list-style-type:none;
    margin:0;
    padding:0.5rem;
    text-align:right;
  }
  li{
    padding:0.3rem;
    font-size:1rem;
  }
}
</style>