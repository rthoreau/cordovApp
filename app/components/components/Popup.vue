<template>
  <div class="popup-overlay" v-on-clickaway="callAction">
    <div class="popup">
      <header v-if="defaultParams.title !== ''">
        <span class="title">{{defaultParams.title}}</span>
      </header>
      <div class="container">
        <slot></slot>
      </div>
      <footer>
        <btn :click="() => callAction(defaultParams.okAction)">{{defaultParams.okText}}</btn>
        <btn :click="() => callAction(defaultParams.cancelAction)">{{defaultParams.cancelText}}</btn>
      </footer>
    </div>
  </div>
</template>

<script>
import btn from './Bouton'
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'SubMenu',
  props: {
    params: Object
  },
  mixins: [ clickaway ],
  components: {
    btn
  },
  data () {
    return {
      defaultParams: {
        okText: 'Ok',
        okAction: '',
        cancelText: 'Annuler',
        cancelAction: '',
        title: ''
      }
    }
  },
  methods: {
    callAction (action) {
      action = action || this.defaultParams.cancelAction;
      try {
        action.call()
      } catch (error) {
        console.log('Bad action in popup', error)
      }
    }
  },
  mounted () {
    if (this.params) {
      this.defaultParams = Object.assign(this.defaultParams, this.params)
    }
  }
}
</script>

<style>
.popup-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
}

.popup {
  background-color: rgba(12, 28, 38, 1);
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-height: 55%;
  padding: 0;
  transform: translate(-50%, -50%);
}
.popup .button {
  width: 45%;
  padding: 0.4rem;
  text-transform: uppercase;
  color: white;
  margin: 0;
  font-size: 0.8rem;
}
.popup header {
  font-size: 1.1rem;
  padding: 0.6rem 1rem;
  color: white;
  background-color: #114372;
}
.popup header + .container {
  padding: 0.8rem 0.8rem;
  text-align: left;
}
.popup .container {
  padding: 2rem 0.8rem;
  font-size: 1rem;
  color: #ddd;
  text-align: center;
  max-height:18rem;
  overflow:auto;
}
.popup footer {
  padding: 0.5rem 0;
  background: linear-gradient(to right, #114372, #114372 50%, #000 50%, #000);
  font-size: 0;
  text-align: center;
}

</style>