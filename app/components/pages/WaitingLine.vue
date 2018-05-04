<template>
  <div id="waitingLine">
    <div class="page-content">
      <span class="subtitle">Lectures suivantes :</span>
      <p class="empty-message" v-if="getWaitingLine.length === 0">
         Vous n'avez rien prévu d'écouter pour le moment&nbsp;!<br> Laissez faire la lecture automatique ou ajoutez des musiques à la file&nbsp;!
      </p>
      <button v-if="getWaitingLine.length > 4" @click="musicAction({action: 'randomize', from: 'waitingLine'})">Mélanger la file</button>
      <button v-if="getWaitingLine.length !== 0" @click="popupVisible = true" class="empty-link"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-delete"></use></svg></button>
      <musicitem 
      v-for="(id, index) in getWaitingLine" 
      :key="index" :index="index"
      :music="getMusic(id)"
      :page="'waitingLine'"></musicitem>
      <popup v-if="popupVisible" :params="popupParams">Vider la file d'attente ?</popup>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
import popup from '../components/Popup'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'WaitingLine',
  components: {
    musicitem,
    popup
  },
  data () {
    return {
      popupVisible: false,
      popupParams: {
        okAction: () => this.empty(),
        cancelAction: () => this.popupVisible = false
      }
    }
  },
  methods: {
    ...mapActions({
      musicAction: 'manageStore/musicAction'
    }),
    empty () {
      this.musicAction({action: 'remove', all: true, from: 'waitingLine'});
      this.popupVisible = false;
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
#waitingLine {
  position: relative;
  height: 76vh;
}
#waitingLine .page-content {
  margin: 0;
  padding-top: 0;
  height: 100%;
  transition: none;
}

.subtitle {
  display: inline-block;
  padding: 0.5rem;
}

.empty-link {
  width: 1.2rem;
  float: right;
  margin: 0.5rem;
  font-size: 0;
}
</style>