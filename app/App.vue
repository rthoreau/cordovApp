<template>
  <div id="app">
    <svgdef></svgdef>
    <appheader></appheader>
    <router-view class="page" :class="playerExpanded ? 'hidden': ''"></router-view>
    <!--<draggable>
      <transition-group>-->
    <appplayer @expanded="expand"></appplayer>
      <!--</transition-group>
    </draggable>-->
  </div>
</template>

<script>
import appheader from './components/AppHeader.vue'
import appplayer from './components/AppPlayer.vue'
import svgdef from './components/components/SvgDef.vue'
export default {
  name: 'app',
  components: {
    appheader,
    appplayer,
    svgdef
  },
  data () {
    return {
      playerExpanded: false
    }
  },
  methods: {
    expand (active) {
      this.playerExpanded = active;
    }
  },
  mounted () {
    var screenHeight = 0;
    var screenWidth = 0;
    var root = document.querySelector(':root');
    function setFontSize () {
      screenHeight = document.scrollingElement.offsetHeight;
      screenWidth = document.scrollingElement.offsetWidth;
      root.style.fontSize = (screenHeight > screenWidth ? screenHeight : screenWidth) / 40 + 'px';
      console.log('font size set')
    }

    setFontSize();
    this.$nextTick(function () {
      window.addEventListener('resize', setFontSize);
    });
  }
}
</script>

<style>
@font-face {
  font-family: "Gadugi";
  src: url(assets/gadugi.ttf);
}
html {
  height: 100%;
  background-color: black;
}

body {
  height: 100%;
  background: url(assets/background.jpg) no-repeat fixed;
  background-size: cover;
  background-color:black;
  margin: 0;
  font-family: "Gadugi", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #c8d6e8;
  font-size: 0.85rem;
}

#app {
  padding: 4rem 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

button {
  font-size: 1em;
  color: inherit;
  padding: 0;
  background-color: transparent;
  border: none;
  -webkit-appearance: none;
  outline: none;
}
button svg {
  width: 100%;
  height: auto;
}

p {
  margin: 0;
}

svg {
  fill: white;
  height: 100%;
  transition: fill 0.5s;
}

.page {
  position: relative;
  height: 100%;
  transition: opacity 0.5s;
  overflow: hidden;
  z-index: 10;
}
.page.hidden {
  opacity: 0;
  overflow: hidden;
}
.page.hidden .page-header {
  overflow: hidden;
}

.page-header {
  position: fixed;
  top: 4rem;
  height: 4rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  border-top: 1px solid rgba(33, 82, 146, 0.15);
  z-index: 90;
  text-align: left;
  padding-left: 2.4rem;
  transition: opacity 0.5s;
}
.page-header .submenu-link {
  position: absolute;
  height: 50%;
  fill: white;
  top: 25%;
  right: 5%;
}
.page-header .submenu-link + .submenu-link {
  right: 18%;
}

.page-content {
  position: relative;
  z-index: 0;
  display: inline-block;
  padding: 0.8rem 0;
  width: 100%;
  overflow: scroll;
  margin: 4rem 0;
  text-align: left;
  height: calc(100% - 4rem);
}
.page-content + .page-content {
  margin-top: 4rem;
}

.page-title {
  display: inline-block;
  font-size: 1.8rem;
  line-height: 4rem;
  color: white;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 60%;
}

*::-webkit-input-placeholder {
  color: rgba(235, 245, 255, 0.5);
}

*:-moz-placeholder {
  color: rgba(235, 245, 255, 0.5);
}

*::-moz-placeholder {
  color: rgba(235, 245, 255, 0.5);
}

*:-ms-input-placeholder {
  color: rgba(235, 245, 255, 0.5);
}

.sp {
  background-color: #4CAF50;
}

.yt {
  background-color: #C62828;
}

.lo {
  background-color: #5d9cec;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

input[type=checkbox] {
  position: absolute;
  left: -999px;
}

label.checkbox {
  display: block;
  padding: 0.4rem 0;
  font-size: 1rem;
  position: relative;
  transition: all 0.5s;
}
label.checkbox:before {
  content: "";
  width: 1.2rem;
  height: 1.2rem;
  border: 0.05rem solid #888;
  background-color: white;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  transition: all 0.5s;
}

input:checked + label.checkbox {
  color: #5d9cec;
}
input:checked + label.checkbox:before {
  background-color: #5d9cec;
  border-color: #5d9cec;
}

ul.selection li {
  position: relative;
  padding: 0.4rem 0;
}
ul.selection li + li {
  margin-top: 0.1rem;
  padding-top: 0.5rem;
}
ul.selection li + li:before {
  content: "";
  position: absolute;
  top: 0;
  left: 1%;
  width: 98%;
  height: 0.04rem;
  background-color: rgba(255, 255, 255, 0.2);
}

.music-plateform {
  position: absolute;
  height: 3rem;
  left: 4%;
  top: 1rem;
  z-index: 0;
  width: 4rem;
  transition: background-color 0.5s;
}

.appear-enter-active,
.appear-leave-active {
  transition: all 0.3s;
}

.appear-enter,
.appear-leave-to {
  width: 0% !important;
}

/* items */
.item {
  padding: 0.5rem 4%;
  transition: background-color 0.4s;
}
.item.active {
  background-color: rgba(130, 153, 195, 0.31);
}
.item .submenu-link {
  height: 1.5rem;
  vertical-align: middle;
  width: 2%;
  text-align: center;
}
.item .submenu {
  position: absolute;
  top: 100%;
  right: 0.6rem;
  margin: 0.4rem 0;
}
.item .submenu.top {
  top: auto;
  bottom: 100%;
}

.empty-message {
  padding: 1.4rem;
  color: #c8d6e8;
  display: inline-block;
  font-size: 1.2rem;
}
.empty-message svg {
  height: 1.4rem;
  position: relative;
  top: 0.25rem;
}
.empty-message a {
  font-size: 1.4rem;
  color: #207bd2;
}
.empty-message a svg {
  fill: #207bd2;
}
</style>
