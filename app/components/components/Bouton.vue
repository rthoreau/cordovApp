<template>
  <div @click="animate" class="button">
    <slot></slot>
    <span v-if="!animateButton"></span>
    <transition name="click">
      <span v-if="animateButton" class="click-animation"></span>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Btn',
  data () {
    return {
      animateButton: false
    }
  },
  props: {
    click: true
  },
  methods: {
    animate () {
      var self = this;
      try {
        this.click.call()
      } catch (error) {
        console.log('Bad action in click', error)
      }
      this.animateButton = true;
      setTimeout(function () {
        self.animateButton = false;
      }, 400);
    }
  }
}
</script>

<style>
@keyframes click {
	0% { 
    width:0;
    height:0;
    border-color:rgba(61, 133, 181, 0.3);
  }
  100% { 
    width:150%;
    height:150%;
    border-color:rgba(61, 133, 181, 0.3);
  }
}
.click-animation{
  position:absolute;
  height:0;
  width:0;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  transition: all 1s;
  border:0.15rem solid transparent;
  animation:click 0.4s;
}
</style>
