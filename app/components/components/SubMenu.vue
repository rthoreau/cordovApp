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
      supClass: '',
      jsObj: undefined
    }
  },
  methods: {
    closeMenu () {
      this.$emit('closemenu', true);
      return true;
    },
    callAction (link) {
      this.closeMenu();
      try {
        link.action.call()
      } catch (error) {
        console.log('Bad action in links', error)
      }
    }
  },
  mounted () {
    this.jsObj = this.$el.parentElement.parentElement;
    window.obj = this.jsObj
    if (this.jsObj.className.indexOf('page-content') === -1) {
      this.jsObj = this.jsObj.parentElement.parentElement
    }
    this.jsObj.addEventListener('scroll', this.closeMenu);
    var offsetHeight = this.jsObj.offsetTop;
    var scrollTop = this.jsObj.scrollTop;
    var screenHeight = this.jsObj.offsetHeight;
    var itemTop = this.$el.parentElement.offsetTop;
    var menuHeight = this.$el.offsetHeight;
    if ((screenHeight - 3 * offsetHeight) < ((itemTop - scrollTop) + menuHeight + 0.5 * offsetHeight)) {
      this.supClass = 'top';
    }
  },
  beforeDestroy () {
    this.jsObj.removeEventListener('scroll', this.closeMenu);
  }
}
</script>

<style>
.submenu {
  background-color: white;
  position: fixed;
  top: 8rem;
  right: 0.5rem;
  z-index: 1000;
  color: #222;
}
.submenu ul {
  list-style-type: none;
  margin: 0;
  padding: 0.5rem;
  text-align: right;
}
.submenu li {
  padding: 0.3rem;
  font-size: 1rem;
}
</style>