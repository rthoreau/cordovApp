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
  }
}
</script>

<style lang="sass">
/*@font-face {
  font-family: 'Segoe UI';
  src: url(assets/seguiemj.ttf);
}*/
html, body{
  height:100%;
}
body{
  background: url(assets/bg.jpg) no-repeat fixed;
  background-size:cover;
  margin:0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #c8d6e8;
}
#app{
  padding:4em 0;
  height:100%;
}
*{
  box-sizing:border-box;
}
button{
  font-size:1em;
  color:inherit;
  padding:0;
  background-color:transparent;
  border:none;
  -webkit-appearance:none;
  outline:none;
  svg{
    width:100%;
    height:auto;
  }
}
p{
  margin:0;
}

svg{
  fill:white;
  height:100%;
  transition:fill 0.5s;
}

.page{
  position:relative;
  height:100%;
  z-index:0;
  transition:height 0.5s;
  overflow:hidden;
  z-index:10;
  &.hidden{
    height:0;
    overflow:hidden;
    .page-header{
      height:0;
      overflow:hidden;
    }
  }
}
.page-header{
  position:fixed;
  top:4rem;
  height:4rem;
  width:100%;
  background-color:rgba(0,0,0,0.7);
  box-sizing:border-box;
  border-top:1px solid rgba(33,82,146,0.15);
  z-index:100;
  text-align:left;
  padding-left:2.4rem;
  transition:opacity 0.5s;
  .submenu-link{
    position:absolute;
    height:50%;
    fill:white;
    top:25%;
    right:5%;
    & + .submenu-link{
      right:18%;
    }
  }
}
.page-content{
  display:inline-block;
  padding:0.8rem 0;
  width:100%;
  overflow:scroll;
  margin:4rem 0;
  text-align:left;
  height:calc(100% - 4rem);
  & + .page-content{
    margin-top:4em;
  }
}
.page-title{
  font-size:1.8rem;
  line-height:4rem;
  color:white;
  vertical-align: middle;
}

*::-webkit-input-placeholder {
  color: rgba(235,245,255,0.5);
}
*:-moz-placeholder {
  color: rgba(235,245,255,0.5);
}
*::-moz-placeholder {
  color: rgba(235,245,255,0.5);
}
*:-ms-input-placeholder {
  color: rgba(235,245,255,0.5);
}

.sp{
  background-color:#4CAF50;
}
.yt{
  background-color:#C62828;
}
.lo{
  background-color:#5d9cec;
}

ul{
  list-style-type:none;
  padding:0;
  margin:0;
}
a{
  text-decoration:none;
  color:inherit;
}
input[type="checkbox"]{
  position:absolute;
  left:-999px;
}
label.checkbox{
  display:block;
  padding:0.4rem 0;
  font-size:1rem;
  position:relative;
  transition:all 0.5s;
  &:before{
    content:'';
    width:1.2rem;
    height:1.2rem;
    border:0.05rem solid #888;
    background-color:white;
    position:absolute;
    right:0;
    top:50%;
    transform:translate(0,-50%);
    transition:all 0.5s;
  }
}
input:checked{
  & + label.checkbox{
    color:#5d9cec;
    &:before{
      background-color:#5d9cec;
      border-color:#5d9cec;
    }
  }
}
ul.selection li{
  position:relative;
  padding:0.4rem 0;
  & + li{
    margin-top:0.1rem;
    padding-top:0.5rem;
    &:before{
      content:'';
      position:absolute;
      top:0;
      left:1%;
      width:98%;
      height:0.04rem;
      background-color:rgba(255,255,255,0.2);
    }
  }
}
.music-plateform{
  position:absolute;
  height:3.5rem;
  left:4%;
  top:0.5rem;
  z-index:0;
  width:4rem;
  transition:background-color 0.5s;
}

.appear-enter-active,
.appear-leave-active{
  transition: all 0.3s;
}
.appear-enter,
.appear-leave-to{
  width:0%!important;
}

/* items */
.item{
  padding:0.5rem 4%;
  transition:background-color 0.4s;
  &.active{
    background-color:rgba(130, 153, 195, 0.31);
  }
  .submenu-link{
    height:1rem;
    vertical-align: middle;
    width:2%;
    text-align:center;
  }
  .submenu{
    position:absolute;
    top:100%;
    right:0.6rem;
    margin:0.4rem 0;
    &.top{
      top:auto;
      bottom:100%;
    }
  }
}
.empty-message{
  padding:1.4rem;
  color:#c8d6e8;
}
</style>
