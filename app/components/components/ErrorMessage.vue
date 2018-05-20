<template>
  <div class="error-message" :class="transitionClass">
    <p>{{error}}</p>
    <svgfile icon="delete"></svgfile>
  </div>
</template>

<script>
import svgfile from './SvgFile'
export default {
  name: 'ErrorMessage',
  props: {
    error: String
  },
  components: {
    svgfile
  },
  data () {
    return {
      transitionClass: ''
    }
  },
  methods: {
    closeMessage () {
      this.$emit('closemessage', true);
    }
  },
  mounted () {
    setTimeout(() => {
      this.transitionClass = 'disappear';
    }, 3500);
    setTimeout(() => {
      this.transitionClass = '';
      this.closeMessage();
    }, 4000);
  }
}
</script>

<style>
.error-message {
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  opacity: 1;
  transition: opacity 0.5s;
  text-align: left;
}
.error-message.disappear {
  opacity: 0;
}
.error-message p {
  width: 100%;
  padding: 0.8rem 2.6rem 0.8rem 0.8rem;
  margin: 0;
  background-color: #506175;
  color: white;
}
.error-message svg {
  width: 1.2rem;
  position: absolute;
  right: 0.6rem;
  top: 0;
}
</style>