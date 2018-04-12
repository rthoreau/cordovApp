<template>
  <div id="waitingLine">
    <div class="page-content">
      <span class="subtitle">Lectures suivantes :</span>
      <musicitem 
      v-for="(id, index) in getWaitingLine" 
      :key="index" 
      :music="getMusic(id)"
      :page="'waitingLine'"></musicitem>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
import {mapGetters} from 'vuex'

export default {
  name: 'WaitingLine',
  components: {
    musicitem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getWaitingLine: 'manageStore/getWaitingLine',
      getMusic: 'manageStore/getMusic'
    })
  }
}
</script>

<style>
#waitingLine{
  position:relative;
  height:calc(100% - 4rem);
}
#waitingLine .page-content{
  margin:0;
  padding-top:0;
  max-height:100%;
}
.subtitle{
  display:inline-block;
  padding:0.5rem;
}
</style>