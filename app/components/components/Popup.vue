<template>
  <div class="popup-overlay">
    <div class="popup">
      <header v-if="defaultParams.title !== ''">
        <span class="title">{{defaultParams.title}}</span>
      </header>
      <div class="container">
        <slot></slot>
      </div>
      <footer>
        <button @click="defaultParams.okAction">{{defaultParams.okText}}</button>
        <button @click="defaultParams.cancelAction">{{defaultParams.cancelText}}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    params: Object
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
  mounted () {
    if (this.params) {
      this.defaultParams = Object.assign(this.defaultParams, this.params)
    }
  }
}
</script>

<style>
.popup-overlay{
    background-color:rgba(0,0,0,0.5);
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:200;
}
.popup{
  background-color:white;
  position:fixed;
  top:50%;
  left:50%;
  width:80%;
  max-height:55%;
  padding:0;
  transform:translate(-50%,-50%);
}
.popup button{
    width:45%;
    padding:0.4rem;
    text-transform:uppercase;
    color:white;
    margin:0;
    font-size:0.8rem;
}
.popup header{
  font-size:1.1rem;
  padding:0.6rem 1rem;
  color:white;
  background-color:#4b89dc;
}
.popup .container{
  padding:2rem 0.8rem;
  font-size:1rem;
  color:#222;
  text-align:center;
}
.popup header + .container{
  padding:0.8rem 0.8rem;
  text-align:left;
}
.popup footer{
  padding:0.5rem 0;
  background:linear-gradient(to right, #4b89dc, #4b89dc 49%, #888 50%, #888);
  font-size:0;
  text-align:center;
}

</style>