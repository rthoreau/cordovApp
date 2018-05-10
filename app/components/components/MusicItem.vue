<template>
  <div class="music-item item" :class="mode ? classe + mode : classe">

    <svg v-if="page === 'playlist' && mode === 'edit'" class="move-link" viewBox="0 0 23.125 23.129"><use xlink:href="#icon-draggable"></use></svg>

    <div class="music-plateform" :class="music.plateform" @click="addToCurrent()">
      <plateformicon :plateform="music.plateform"></plateformicon>
    </div>
    <div class="music-thumbnail-container" @click="addToCurrent()">
      <transition name="appear">
        <img v-if="music.thumbnail && loaded" :src="music.thumbnail" alt="" class="music-thumbnail">
      </transition>
    </div>
    <div class="music-content" :class="page" @click="addToCurrent()">
      <span class="music-title">{{music.title}}</span>
      <span class="music-author">{{music.author}}</span>
      <span key="d" class="music-duration" v-if="music.duration !== 0 && (music.plateform !== 'lo' || music.file.name)">{{hmsDuration(music.duration)}}</span>
      <span key="e" v-if="music.plateform === 'lo' && !music.file.name" class="unloaded">Musique inaccessible ! :'(</span>
    </div>

    <button v-if="page !== 'favorite' && !(page === 'playlist' && mode === 'edit')" class="favorite-link" @click="favorite()"><svg viewBox="0 0 23.125 23.129">
      <use v-if="music.favorite || forceFavorite" xlink:href="#icon-favorited"></use>
      <use v-if="!music.favorite || forceFavorite === false" xlink:href="#icon-favorite"></use>
    </svg></button>

    <button v-if="!(page === 'playlist' && mode === 'edit')" class="submenu-link"  @click="submenuVisible = !submenuVisible"><svg viewBox="0 0 8.688 23.129"><use xlink:href="#icon-submenu"></use></svg></button>

    <button v-if="page === 'playlist' && mode === 'edit'" class="remove-link" @click="deleteFromRender()"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-delete"></use></svg></button>

    <submenu v-if="submenuVisible" :links="links" @closemenu="submenuVisible = false"></submenu>
    <popup v-if="popupVisible" :params="popupParams">
      <ul class="selection">
        <li v-for="(playlist) in playlists" :key="playlist.id">
          <input type="checkbox" :id="'check' + playlist.id" :value="playlist.id" v-model="checkedPlaylists"><label class="checkbox" :for="'check'+playlist.id"> {{playlist.name}}</label>
        </li>
      </ul>
    </popup>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import plateformicon from './PlateformIcon'
import submenu from './SubMenu'
import popup from '../components/Popup'
//TODO show on music item if playing
export default {
  name: 'MusicItem',
  props: {
    music: Object,
    page: String,
    playlistid: String,
    mode: String,
    index: Number,
    searchvalue: String
  },
  components: {
    plateformicon,
    submenu,
    popup
  },
  data () {
    return {
      loaded: false,
      playlists: this.$store.getters['manageStore/getPlaylists'],
      submenuVisible: false,
      source: '',
      checkedPlaylists: [],
      links: [
        {text: 'Ajouter à une playlist', action: () => this.popupVisible = true}
      ],
      popupVisible: false,
      popupParams: {
        title: 'Ajouter la musique dans...',
        okAction: () => this.addToPlaylists(),
        cancelAction: () => this.popupVisible = false
      },
      classe: '',
      forceFavorite: undefined
    }
  },
  methods: {
    ...mapActions({
      musicAction: 'manageStore/musicAction'
    }),
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
      this.musicAction({action: 'add', to: 'playlist', id: this.music.id, playlistIds: this.checkedPlaylists});
      this.popupVisible = false;
    },
    favorite () {
      var refresh = this.searchvalue !== '';
      this.musicAction({action: (this.music.favorite ? 'remove' : 'add'), to: 'favorite', from: 'favorite', id: this.music.id, source: this.source, music: this.music});
      if (refresh) {
        console.log('n')
        this.$emit('refresh', true);
      } else {
        console.log('y')
        this.forceFavorite = !this.forceFavorite;
      }
    },
    addToCurrent () {
      var currentMusic = this.getCurrentMusic;
      var fileReload = this.music.plateform === 'lo' && currentMusic.title === this.music.title && currentMusic.file !== this.music.file;
      console.log(fileReload);
      var self = this;
      this.musicAction({action: 'add', to: 'current', id: this.music.id, source: this.source, music: this.music});
      if (fileReload) {
        this.getCurrentMusic;
        this.$nextTick(function () {
          self.musicAction({action: 'add', to: 'current', id: this.music.id, source: this.source, music: this.music});
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
    }
  },
  computed: {
    ...mapGetters({
      getMusic: 'manageStore/getMusic',
      getCurrentMusic: 'manageStore/getCurrentMusic'
    })
  },
  mounted () {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
    if (this.page === 'waitingLine') {
      this.links.push({text: 'Retirer de la file', action: () => this.musicAction({action: 'remove', from: 'waitingLine', index: this.index})});
    } else {
      this.links.push({text: 'Ajouter à la file', action: () => this.musicAction({action: 'add', to: 'waitingLine', id: this.music.id})});
    }
    if (this.music.favorite && this.page === 'favorite') {
      this.links.push({text: 'Supprimer des favoris', action: () => this.musicAction({action: 'remove', from: 'favorite', id: this.music.id})});
    }
    if (this.page === 'playlist') {
      this.links.push({text: 'Supprimer de la playlist',
        action: () => this.musicAction({action: 'remove', from: 'playlist', id: this.music.id, playlistId: parseInt(this.playlistid)})});
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
  padding: 0.5rem 4%;
}

.music-thumbnail-container {
  position: relative;
  width: 3.5rem;
  height: 3rem;
  display: inline-block;
  margin: 0 0.8rem 0 0.5rem;
  text-align: right;
  vertical-align: middle;
  top:0.5rem;
}

.music-thumbnail {
  width: 100%;
  height: 100%;
  display: inline-block;
  background-color: #545436;
  object-fit: cover;
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
</style>