<template>
  <div id="timeslider">
    <div class="slider-container">
      <div class="slider-background">
        <div class="progressbar" :style="'width:'+progress+'%'"></div>
      </div>
      <input ref="timeslider" type="range" class="slider" min="0" max="100" @input="setTime">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeSlider',
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

<style>
.slider-container {
  position: relative;
  width: 100%;
  height: 0.8rem;
  margin: 0.5rem 0 1rem;
  font-size: 0;
}

.slider {
  position: relative;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  border-radius: 0;
  background: transparent;
  outline: none;
  padding: 0;
  font-size: 0;
  margin: 0;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.7rem;
  height: 1.2rem;
  background: #207bd2;
  cursor: pointer;
  border-radius: 0;
  box-shadow: none;
  border: none;
  margin-top:0.2rem;
  margin-left:0.1rem;
}
.slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.7rem;
  height: 1.2rem;
  background: #207bd2;
  cursor: pointer;
  border-radius: 0;
  box-shadow: none;
  border: none;
  margin-top:0.2rem;
  margin-right:-2%;
}
.slider::-ms-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.7rem;
  height: 1.2rem;
  background: #207bd2;
  cursor: pointer;
  border-radius: 0;
  box-shadow: none;
  border: none;
  margin-top:0.2rem;
  margin-right:-2%;
}
.slider::-webkit-slider-runnable-track {
  width: 98%;
  margin:0 1%;
  height: 200%;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}
.slider::-moz-range-track {
  width: 98%;
  margin:0 1%;
  height: 200%;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}
.slider::-ms-track {
  width: 98%;
  margin:0 1%;
  height: 200%;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}
.slider::-ms-fill-lower {
  width: 100%;
  height: 200%;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}
.slider::-ms-fill-upper {
  width: 100%;
  height: 200%;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}

.progressbar, .slider-background {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
}

.slider-background{
  background-color: rgba(255, 255, 255, 0.4);
  width:96%;
  left:2%;
}

</style>