<template>
  <div id="timeslider">
    <div class="slider-container">
      <div class="progressbar" :style="'width:'+progress+'%'"></div>
      <input ref="timeslider" type="range" class="slider" min="0" max="100" @input="setTime">
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeslider',
  props: {
    time: Number
  },
  data () {
    return {
      progress: this.time
    }
  },
  methods: {
    setTime (e) {
      this.progress = e.target.value
      this.$emit('settime', this.progress)
    }
  },
  mounted () {
    this.$refs.timeslider.value = this.time
  },
  watch: {
    time: function (value) {
      this.progress = value
      this.$refs.timeslider.value = this.time
    }
  }
}
</script>

<style lang="sass">
  .slider-container{
    position:relative;
    width:100%;
    height:0.8rem;
    margin:0.5rem 0 1rem;
    background-color:rgba(255,255,255,0.4);
    font-size:0;
  }
  @mixin thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 0.5rem;
    height: 1.8rem;
    background: #207bd2;
    cursor: pointer;
    border-radius:0;
    box-shadow:none;
    border:none;
  }
  @mixin track{
    width: 100%;
    height: 200%;
    cursor: pointer;
    box-shadow: none;
    background: transparent;
    border-radius: 0;
    border: none;
  }
  .slider {
    position:relative;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    border-radius: 0;   
    background: transparent;
    outline: none;
    padding:0;
    font-size:0;
    margin:0;
    &::-webkit-slider-thumb {@include thumb;}
    &::-moz-range-thumb {@include thumb;}
    &::-ms-thumb {@include thumb;}
    
    &::-webkit-slider-runnable-track {@include track;}
    &::-moz-range-track {@include track;}
    &::-ms-track {@include track;}
    &::-ms-fill-lower {@include track;}
    &::-ms-fill-upper {@include track;}
  }
  .progressbar{
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:white;
  }

</style>