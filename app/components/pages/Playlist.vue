<template>
  <div id="playlist">
    <header class="page-header" :class="mode">

      <btn :click="() => back()" class="back-link"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-back"></use></svg></btn>

      <playlisticon :colors="playlist.colors" :class="mode" @click="showColorEditer()"></playlisticon>

      <input ref="editInput" type="text" class="page-title edit" v-if="mode === 'edit'" placeholder="Pop, Jazz ..." v-model="playlist.name" v-on:keyup.enter="save()"/>

      <span class="page-title" v-if="mode !== 'edit'">{{playlist.name}}</span>

      <btn class="submenu-link" :click="() => submenuVisible = !submenuVisible" v-if="mode !== 'edit'"><svg viewBox="0 0 8.688 23.129"><use xlink:href="#icon-submenu"></use></svg></btn>

      <btn :click="() => save()" class="right save-link" v-if="mode === 'edit'"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-ok"></use></svg></btn>
    </header>
    
    <submenu v-if="submenuVisible" :links="links" @closemenu="submenuVisible = false"></submenu>

    <div class="color-editer" v-if="colorEditing === true">
      <btn class="color" :style="'background-color:' + playlist.colors[0].hex" :click="() => editColor = 0" :class="editColor === 0 ? 'selected' : ''"></btn>
      <btn class="color" :style="'background-color:' + playlist.colors[1].hex" :click="() => editColor = 1" :class="editColor === 1 ? 'selected' : ''"></btn>
      <btn class="color" :style="'background-color:' + playlist.colors[2].hex" :click="() => editColor = 2" :class="editColor === 2 ? 'selected' : ''"></btn>
      <btn class="confirm-color" :click="() => colorEditing = false"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-ok"></use></svg></btn>
      <colorpicker v-model="playlist.colors[editColor]"></colorpicker>
    </div>

    <div class="page-content">
      <span class="empty-message" v-if="mode !== 'edit' && !playlist.name">Cette playlist semble ne plus exister&nbsp;!<br><router-link to="/Playlists">Revenir aux playlists</router-link></span>
      <span class="empty-message" v-if="mode === 'edit' && !getPlaylist(id).name">Donnez un nom à votre playlist, puis validez. Vous pourrez ensuite y ajouter des musqiues&nbsp;!</span>
      <span class="empty-message" v-if="playlist.musics.length === 0 && getPlaylist(id).name">Ajoutez des musiques à cette playlist depuis vos <router-link to="/Favorite">Favoris <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-favorite"></use></svg></router-link> ou depuis la page de <router-link to="/Search">Recherche <svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-search"></use></svg></router-link></span>
      <draggable v-model="playlist.musics" :options="{draggable:'.editing', scroll: true}">
        <transition-group>
          <musicitem 
          v-for="(musicId, index) in (mode === 'edit' ? playlist.musics : getPlaylist(id).musics)" 
          :key="index" 
          :music="getMusic(musicId)"
          :playlistid="id"
          :page="'playlist'"
          :mode="mode"
          :index="index"
          :class="mode === 'edit' ? 'editing' : ''"
          @delete="deleteFromPlaylist(musicId)"></musicitem>
        </transition-group>
      </draggable>
      <errormessage :error="error" v-if="error" @closemessage="error = false"></errormessage>
    </div>
    <popup v-if="popupVisible" :params="popupParams">
      {{popupText}}
    </popup>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import musicitem from '../components/MusicItem'
import submenu from '../components/SubMenu'
import errormessage from '../components/ErrorMessage'
import playlisticon from '../components/PlaylistIcon'
import popup from '../components/Popup'
import btn from '../components/Bouton'
import draggable from 'vuedraggable'
import {Chrome} from 'vue-color'
export default {
  name: 'Playlist',
  components: {
    musicitem,
    submenu,
    popup,
    errormessage,
    draggable,
    colorpicker: Chrome,
    playlisticon,
    btn
  },
  data () {
    return {
      id: this.$route.params.id,
      mode: this.$route.params.mode || '',
      playlist: {name: '', musics: [], colors: [{hex: ''}, {hex: ''}, {hex: ''}]},
      submenuVisible: false,
      error: false,
      editInput: '',
      deleteIds: [],
      links: [
        {text: 'Modifier la playlist', action: () => this.changeMode()},
        {text: 'Supprimer la playlist', action: () => this.callDeletePlaylist()}
      ],
      popupVisible: false,
      popupText: '',
      popupParams: {},
      editColor: 0,
      colorEditing: false
    }
  },
  methods: {
    ...mapActions({
      setPlaylist: 'manageStore/setPlaylist',
      deletePlaylist: 'manageStore/deletePlaylist',
      filterMusics: 'manageStore/filterMusics'
    }),
    callDeletePlaylist (confirmed) {
      confirmed = confirmed || false;
      if (confirmed) {
        this.deletePlaylist(this.playlist);
        this.$router.push({path: '/Playlists'});
      } else {
        this.popupText = 'Supprimer la playlist ?';
        this.popupParams = {
          okAction: () => this.callDeletePlaylist(true),
          cancelAction: () => this.popupVisible = false
        }
        this.popupVisible = true;
      }
    },
    hasValidName () {
      return this.playlist.name && this.playlist.name.split(' ').join('') !== '';
    },
    save () {
      this.colorEditing = false;
      if (!this.hasValidName()) {
        this.error = 'Donnez un nom à votre playlist !';
        this.$refs.editInput.focus();
        return false;
      }
      this.setPlaylist(this.playlist);
      this.filterMusics();
      this.changeMode();

      //reload manually to avoid auto-save
      var playlistStored = this.getPlaylist(this.id);
      this.playlist = {
        id: playlistStored.id,
        name: playlistStored.name,
        musics: playlistStored.musics,
        colors: playlistStored.colors.filter(color => color)
      };
      return true;
    },
    back (confirmed, save) {
      function comparePlaylists (p1, p2) {
        return p1.id === p2.id && p1.name === p2.name && p1.musics === p2.musics && p1.colors[0] === p2.colors[0] && p1.colors[1] === p2.colors[1] && p1.colors[2] === p2.colors[2];
      }
      //if save fail, cancel back
      if (confirmed && save) {
        if (!this.save()) {
          this.popupVisible = false;
          return;
        }
      }
      var playlistStored = this.getPlaylist(this.playlist.id);
      //If playlist has been modified and has a valid name or has not an empty music list
      if (this.mode === 'edit' && !confirmed && !comparePlaylists(this.playlist, playlistStored) && (this.hasValidName() || playlistStored.name !== '')) {
        this.popupText = 'Sauvegarder les modifications ?';
        this.popupParams = {
          okAction: () => this.back(true, true),
          cancelAction: () => this.back(true),
          cancelText: 'Ignorer'
        }
        this.popupVisible = true;
      } else {
        confirmed = true;
      }
      if (confirmed) {
        this.$router.go(-1);
      }
    },
    changeMode () {
      this.mode = this.mode === 'edit' ? '' : 'edit';
      this.colorEditing = this.mode !== 'edit' ? this.colorEditing : false;
      if (this.mode === 'edit') {
        this.$nextTick(() => this.$refs.editInput.focus());
      }
    },
    deleteFromPlaylist (id) {
      this.deleteIds.push(id);

      this.playlist.musics = this.playlist.musics.filter(musicId => musicId !== id);
    },
    showColorEditer () {
      if (this.mode === 'edit') {
        this.colorEditing = !this.colorEditing;
      }
    }
  },
  computed: {
    ...mapGetters({
      getPlaylist: 'manageStore/getPlaylist',
      getMusic: 'manageStore/getMusic'
    })
  },
  mounted () {
    //load manually to avoid auto-save
    var playlistStored = this.getPlaylist(this.id);
    this.playlist = {
      id: playlistStored.id,
      name: playlistStored.name,
      musics: playlistStored.musics,
      colors: playlistStored.colors.filter(color => color)
    };
    this.editInput = this.$refs.editInput;
    //generate random color combination for new playlists
    if (this.playlist.colors[0].hex === '') {
      var randomComb = [[{hex: '#ffffff'}, {hex: '#000000'}, {hex: '#0532ff'}],
        [{hex: '#91a5ff'}, {hex: '#000000'}, {hex: '#0532ff'}],
        [{hex: '#e64aa9'}, {hex: '#ecdde8'}, {hex: '#ed0019'}],
        [{hex: '#ffa200'}, {hex: '#0400ff'}, {hex: '#ff0091'}],
        [{hex: '#00ff2f'}, {hex: '#0400ff'}, {hex: '#ff0091'}],
        [{hex: '#ff2700'}, {hex: '#0054fa'}, {hex: '#00660b'}],
        [{hex: '#ff0000'}, {hex: '#0d00ff'}, {hex: '#ff0091'}],
        [{hex: '#ff0000'}, {hex: '#ffaa00'}, {hex: '#ff4800'}],
        [{hex: '#ffffff'}, {hex: '#3c3939'}, {hex: '#000000'}],
        [{hex: '#cd77e8'}, {hex: '#c20076'}, {hex: '#290119'}],
        [{hex: '#ffffff'}, {hex: '#0532ff'}, {hex: '#000000'}],
        [{hex: '#ffb300'}, {hex: '#00897b'}, {hex: '#3f51b5'}]];

      randomComb = randomComb[Math.floor(Math.random() * randomComb.length)];
      var j
      var x
      var i
      for (i = randomComb.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = randomComb[i];
        randomComb[i] = randomComb[j];
        randomComb[j] = x;
      }
      this.playlist.colors[0] = randomComb[0];
      this.playlist.colors[1] = randomComb[1];
      this.playlist.colors[2] = randomComb[2];
    }
  }
}
</script>

<style>
#playlist .page-header {
  padding-left: 0.4rem;
  font-size: 0;
}
#playlist .page-header.edit {
  padding-top: 0.5rem;
}
#playlist .page-header .button {
  vertical-align: middle;
  height: 2.5rem;
  color: white;
  font-size: 1.4rem;
  padding: 0 0.4rem;
  width: 16%;
}
#playlist .page-header .back-link {
  text-align: left;
  padding: 0 0.4rem;
  width:12%;
}
#playlist .page-header .submenu-link {
  width: auto;
  height: 50%;
  right: 2.5%;
}
#playlist .page-header .submenu-link svg {
  height: 100%;
  width: auto;
}
#playlist .page-header .playlisticon {
  margin-right: 0.5rem;
}
#playlist input.page-title {
  background-color: transparent;
  height: 3rem;
  margin: 0 2% 0;
  width: 52%;
  outline: none;
  vertical-align: middle;
  font-size:1.4rem;
}

input.page-title:focus {
  background-color: rgba(255, 255, 255, 0.2);
}

.page-title.edit {
  border: 2px dashed white;
  padding: 0.5rem;
}

.item.sortable-chosen {
  background-color: rgba(60, 95, 132, 0.3);
}

.item.sortable-ghost {
  opacity: 0.3;
}

.back-link svg {
  width: 100%;
}

.save-link svg {
  width: 80%;
}

.color-editer {
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  margin-top: 4rem;
  padding: 1rem;
}
.color-editer .color, .color-editer .confirm-color {
  width: 2rem;
  height: 2rem;
  margin: 0 1rem 1rem;
  border: 0.15rem double rgba(255, 255, 255, 0.1);
  border-radius: 0.1rem;
  transition: border-color 0.5s;
}
.color-editer .color.selected {
  border-color: white;
  box-shadow:0 0 0.8rem white;
}

.color-editer .confirm-color{
  border-color:transparent;
}
.color-editer .vc-chrome {
  width: 100%;
  background: transparent;
  box-shadow: none;
}
.color-editer .vc-chrome-alpha-wrap, .color-editer .vc-chrome-fields-wrap, .color-editer .vc-chrome-color-wrap {
  display: none;
}
.color-editer .vc-chrome-saturation-wrap {
  border-radius: 0;
}
.color-editer .vc-saturation-pointer {
  margin-left: -3px;
  margin-top: -3px;
}
.color-editer .vc-chrome-body {
  background-color: transparent;
}
</style>