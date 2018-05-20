<template>
  <div id="waitingLine">
    <div class="page-content">
      <span class="subtitle">Lectures suivantes :</span>
      <btn :click="() => empty()" class="action"><svgfile icon="delete"></svgfile></btn>
      <btn :click="() => loop()" class="action loop"><svgfile icon="loop"></svgfile></btn>
      <btn v-if="getWaitingLine.length > 2" :click="() => musicAction({action: 'randomize', from: 'waitingLine'})" class="action"><svgfile icon="random"></svgfile></btn>
      <p class="empty-message" v-if="getWaitingLine.length === 0">
         Vous n'avez rien prévu d'écouter pour le moment&nbsp;!<br> Laissez faire la lecture automatique ou ajoutez des musiques à la file&nbsp;!
      </p>
      <musicitem 
      v-for="(id, index) in getWaitingLine" 
      :key="index + '-' + id"
      :index="index"
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
import btn from '../components/Bouton'
import svgfile from '../components/SvgFile'

export default {
  name: 'WaitingLine',
  components: {
    musicitem,
    popup,
    btn,
    svgfile
  },
  data () {
    return {
      popupVisible: false,
      popupParams: {
        okAction: () => this.empty(true),
        cancelAction: () => this.popupVisible = false
      }
    }
  },
  methods: {
    ...mapActions({
      musicAction: 'manageStore/musicAction'
    }),
    empty (confirmed) {
      if (!confirmed) {
        this.popupVisible = true
        return
      }
      this.musicAction({action: 'remove', all: true, from: 'waitingLine'});
      this.popupVisible = false;
    },
    loop () {
      this.$emit('loop');
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
  height: 30.3rem;
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

#waitingLine .action {
  width: 1.2rem;
  float: right;
  margin: 0.5rem;
  font-size: 0;
}
#waitingLine.looping .loop svg {
  fill:#207bd2;
}
</style>