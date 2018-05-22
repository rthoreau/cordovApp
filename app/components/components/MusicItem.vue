<template>
  <div class="music-item item" :class="mode ? classe + mode : classe">

    <svgfile icon="draggable" v-if="page === 'playlist' && mode === 'edit'" class="move-link"></svgfile>

    <div class="music-plateform" :class="music.plateform" @click="addToCurrent()">
      <plateformicon :plateform="music.plateform"></plateformicon>
    </div>
    <div class="music-thumbnail-container" @click="addToCurrent()">
      <transition name="appear">
        <img v-if="music.thumbnail && loaded" :src="music.thumbnail" alt="" class="music-thumbnail">
        <div v-if="!music.thumbnail && loaded" class="music-thumbnail empty"><svgfile icon="lo"></svgfile></div>
      </transition>
    </div>
    <div class="music-content" :class="page" @click="addToCurrent()">
      <span class="music-title">{{music.title}}</span>
      <span class="music-author">{{music.author}}</span>
      <span key="d" class="music-duration" v-if="music.duration !== 0 && (music.plateform !== 'lo' || music.file.name)">{{hmsDuration(music.duration)}}</span>
      <span key="e" v-if="music.plateform === 'lo' && !music.file.name" class="unloaded">Musique inaccessible ! :'(</span>
    </div>

    <btn v-if="page !== 'favorite' && !(page === 'playlist' && mode === 'edit')" class="favorite-link" :click="() => favorite()"><svg viewBox="0 0 23.125 23.129">
      <use v-if="music.favorite || forceFavorite" xlink:href="#icon-favorited"></use>
      <use v-if="!music.favorite || forceFavorite === false" xlink:href="#icon-favorite"></use>
    </svg></btn>

    <btn v-if="!(page === 'playlist' && mode === 'edit')" class="submenu-link"  :click="() => subFunction()"><submenulink></submenulink></btn>

    <btn v-if="page === 'playlist' && mode === 'edit'" class="remove-link" :click="() => deleteFromRender()"><svgfile icon="delete"></svgfile></btn>

    <submenu v-if="submenuVisible" :links="links" @closemenu="submenuVisible = false"></submenu>
    <popup v-if="popupVisible" :params="popupParams">
      <errormessage :error="popupError" v-if="popupError" @closemessage="popupError = false"></errormessage>
      <ul class="selection" v-if="getPlaylists.length">
        <li v-for="(playlist) in getPlaylists" :key="playlist.id">
          <input type="checkbox" :id="'check' + playlist.id" :value="playlist.id" v-model="checkedPlaylists"><label class="checkbox" :for="'check'+playlist.id"> {{playlist.name}}</label>
        </li>
      </ul>
      <div class="new-playlist" :class="getPlaylists.length ? '' : 'none'">
        <span class="label">Créer une playlist</span>
        <input type="text" v-model="newPlaylistName" placeholder="Nom de la playlist" 
          @keyup.enter="newPlaylist()"><btn :click="() => newPlaylist()"><svgfile icon="plus"></svgfile></btn>
      </div>
    </popup>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import plateformicon from './PlateformIcon'
import submenu from './SubMenu'
import popup from './Popup'
import Btn from './Bouton'
import svgfile from './SvgFile'
import submenulink from './SubMenuLink'
import errormessage from '../components/ErrorMessage'
//TODO show on music item if playing
export default {
  name: 'MusicItem',
  props: {
    music: true,
    page: String,
    playlistid: String,
    mode: String,
    index: Number,
    forcedfavorite: Boolean
  },
  components: {
    plateformicon,
    submenu,
    popup,
    Btn,
    svgfile,
    submenulink,
    errormessage
  },
  data () {
    return {
      loaded: false,
      submenuVisible: false,
      source: '',
      checkedPlaylists: [],
      links: [
        {text: 'Ajouter à une playlist', action: () => this.popupFunction(true)}
      ],
      popupVisible: false,
      popupParams: {
        title: 'Ajouter la musique dans...',
        okAction: () => this.addToPlaylists(),
        cancelAction: () => this.popupFunction(false)
      },
      classe: '',
      forceFavorite: undefined,
      newPlaylistName: '',
      popupError: ''
    }
  },
  methods: {
    ...mapActions({
      musicAction: 'manageStore/musicAction',
      setPlaylist: 'manageStore/setPlaylist'
    }),
    subFunction () {
      this.submenuVisible = !this.submenuVisible;
    },
    popupFunction (val) {
      this.popupVisible = val
    },
    hmsDuration (val) {
      var h = Math.floor(val / 3600);
      h = h === 0 ? '' : h + ':';
      var m = Math.floor(val % 3600 / 60);
      m = m >= 10 ? m : '0' + m;
      var s = Math.floor(val % 3600 % 60);
      s = s >= 10 ? s : '0' + s;
      return h + m + ':' + s;
    },
    addToPlaylists () {
      this.musicAction({action: 'add', to: 'playlist', id: this.music.id, playlistIds: this.checkedPlaylists, source: this.source, music: this.music});
      this.popupVisible = false;
      return false;
    },
    favorite () {
      this.musicAction({action: (this.music.favorite ? 'remove' : 'add'), to: 'favorite', from: 'favorite', id: this.music.id, source: this.source, music: this.music});
      if (this.forcedfavorite) {
        this.forceFavorite = !this.forceFavorite;
      } else {
        this.$emit('refresh', true);
      }
      return false;
    },
    addToCurrent () {
      var currentMusic = this.getCurrentMusic;
      var fileReload = this.music.plateform === 'lo' && currentMusic.title === this.music.title && currentMusic.file !== this.music.file;
      this.musicAction({action: 'add', to: 'current', id: this.music.id, source: this.source, music: this.music});
      if (fileReload) {
        this.getCurrentMusic;
        this.$nextTick(function () {
          this.musicAction({action: 'add', to: 'current', id: this.music.id, source: this.source, music: this.music});
        });
      }
    },
    deleteFromRender () {
      this.$emit('delete', true);
    },
    setClass () {
      this.classe = this.submenuVisible ? 'active' : '';
      if (typeof this.getCurrentMusic !== 'undefined') {
        this.classe += this.music.id === this.getCurrentMusic.id ? ' playing' : '';
      }
    },
    hasValidName () {
      return this.newPlaylistName && this.newPlaylistName.split(' ').join('') !== '';
    },
    newPlaylist () {
      if (!this.hasValidName()) {
        this.popupError = 'Ecrivez un nom pour créer une nouvelle playlist !';
        return;
      }
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
      var newId = '0';
      this.getPlaylists.forEach(function (pl) {
        newId = newId < pl.id ? pl.id : newId;
      })
      newId = parseInt(newId) + 1;
      newId = newId.toString();
      this.setPlaylist({id: newId, name: this.newPlaylistName, musics: [], colors: [randomComb[0], randomComb[1], randomComb[2]]});
      this.newPlaylistName = '';
      this.checkedPlaylists.push(newId)
    }
  },
  computed: {
    ...mapGetters({
      getMusic: 'manageStore/getMusic',
      getCurrentMusic: 'manageStore/getCurrentMusic',
      getPlaylists: 'manageStore/getPlaylists'
    })
  },
  mounted () {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
    if (this.page === 'waitingLine') {
      this.links.push({text: 'Retirer de la file', action: () => this.musicAction({action: 'remove', from: 'waitingLine', index: this.index})});
    } else {
      this.links.push({text: 'Ajouter à la file', action: () => this.musicAction({action: 'add', to: 'waitingLine', id: this.music.id, source: this.source, music: this.music})});
    }
    if (this.music.favorite && this.page === 'favorite') {
      this.links.push({text: 'Supprimer des favoris', action: () => this.musicAction({action: 'remove', from: 'favorite', id: this.music.id})});
    }
    if (this.page === 'playlist') {
      this.links.push({text: 'Supprimer de la playlist',
        action: () => this.musicAction({action: 'remove', from: 'playlist', index: this.index, playlistId: parseInt(this.playlistid)})});
    }
    this.source = this.page === 'search' ? this.page : '';
    this.setClass();
  },
  watch: {
    popupVisible: function () { this.checkedPlaylists = [] },
    submenuVisible: function () { this.setClass() },
    getCurrentMusic: function () { this.setClass() },
    mode: function () { this.setClass() }
  }
}
</script>

<style>
.music-item {
  position: relative;
  font-size: 0;
}

.music-thumbnail-container {
  position: relative;
  width: 3.5rem;
  height: 3rem;
  display: inline-block;
  margin: 0 0.8rem 0 0.5rem;
  text-align: right;
  vertical-align: middle;
  overflow: hidden;
}

.music-thumbnail {
  width: 100%;
  height: 102%;
  display: inline-block;
  background-color: #5d9cec;
  object-fit: cover;
}
.music-thumbnail.empty{
  background-color:#071a2d;
}
.music-thumbnail svg{
  position: absolute;
  top: 50%;
  height: 50%;
  left: 43%;
  transform: translate(-50%, -50%);
}

.music-content {
  display: inline-block;
  text-align: left;
  width: 61%;
  margin-right: 3%;
  vertical-align: middle;
  width: calc(83% - 4.8rem);
  font-size: 1rem;
  vertical-align: top;
  word-break: break-word;
}
.music-content.favorite {
  width: 73%;
  width: calc(95% - 4.8rem);
}
.music-content span {
  display: block;
}

.editing .music-thumbnail-container {
  margin-left: 0.1rem;
}
.editing .music-content {
  width: 54%;
}
.editing .music-plateform {
  left: 12%;
}

.music-title {
  font-weight: bold;
  word-break: break-all;
  word-wrap:break-word;
}

.music-author {
  opacity: 0.7;
}

.favorite-link, .remove-link, .move-link {
  display: inline-block;
  vertical-align: middle;
  width: 8%;
}

.favorite-link {
  margin-right: 4%;
}

.move-link {
  width: 6%;
  margin-right: 5%;
}
.popup .new-playlist{
  margin-bottom: 0.5rem;
}
.popup .new-playlist .label{
  display:block;
  opacity:0.8;
  margin:1rem 0 0.5rem;
}
.popup .new-playlist.none .label{
  margin-top:0;
}
.popup .new-playlist input{
  font-size: 1rem;
  background-color: transparent;
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  outline: none;
  color: #c8d6e8;
  padding: 0 4%;
  line-height:1.15;
  width:calc(100% - 2rem);
  vertical-align: middle;
  margin: 0 0.5rem 0 0;
  height:2rem;
  border:1px solid white;
}
.popup .new-playlist .button{
  position:relative;
  width:1.5rem;
  height:1.5rem;
  padding:0;
  vertical-align: middle;
}
.popup .new-playlist .button svg{
  width:100%;
  height:auto;
}
</style>
