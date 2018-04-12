<template>
  <div id="playlist">
    <header class="page-header">

      <button @click="back()"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-back"></use></svg></button>

      <input ref="editInput" type="text" class="page-title edit" v-if="mode === 'edit'" placeholder="Party, Pop, Sleep..." v-model="playlist.name" v-on:keyup.enter="save()"/>

      <span class="page-title" v-if="mode !== 'edit'">{{playlist.name}}</span>

      <svg class="submenu-link" viewBox="0 0 8.688 23.129" @click="submenuVisible = !submenuVisible" v-if="mode !== 'edit'"><use xlink:href="#icon-submenu"></use></svg>

      <button @click="save()" class="right" v-if="mode === 'edit'">OK</button>
    </header>
    
    <submenu v-if="submenuVisible" :links="links" @closemenu="submenuVisible = false"></submenu>

    <div class="page-content">
      <span v-if="mode !== 'edit' && !playlist.name">Cette playlist semble ne plus exister !<br><router-link to="/Playlists">Revenir aux playlists</router-link></span>
      <draggable v-model="playlist.musics" :options="{draggable:'.editing', scroll: true}">
        <transition-group>
          <musicitem 
          v-for="(musicId, index) in (mode === 'edit' ? playlist.musics : getPlaylist(id).musics)" 
          :key="index" 
          :music="getMusic(musicId)"
          :playlistid="id"
          :page="'playlist'"
          :mode="mode"
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
import popup from '../components/Popup'
import draggable from 'vuedraggable'
export default {
  name: 'Playlist',
  components: {
    musicitem,
    submenu,
    popup,
    errormessage,
    draggable
  },
  data () {
    return {
      id: this.$route.params.id,
      mode: this.$route.params.mode || '',
      playlist: {name: '', musics: []},
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
      popupParams: {}
    }
  },
  methods: {
    ...mapActions({
      setPlaylists: 'manageStore/setPlaylists',
      deletePlaylist: 'manageStore/deletePlaylist',
      music: 'manageStore/music'
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
      if (!this.hasValidName()) {
        this.error = 'Donnez un nom à votre playlist !';
        this.$refs.editInput.focus();
        return false;
      }
      if (this.deleteIds.length) {
        this.music({action: 'remove', from: 'playlist', ids: this.deleteIds, playlistId: this.playlist.id});
        this.deleteIds = [];
      }
      var playlists = this.$store.getters['manageStore/getPlaylists'];
      var index = playlists.findIndex(playlist => playlist.id === this.playlist.id);
      if (index === -1) {
        playlists.push(this.playlist);
      } else {
        playlists[index] = this.playlist;
      }
      this.setPlaylists(playlists);
      this.changeMode();

      //reload manually to avoid auto-save
      var playlistStored = this.getPlaylist(this.id);
      this.playlist = {
        id: playlistStored.id,
        name: playlistStored.name,
        musics: playlistStored.musics
      };

      return true;
    },
    back (confirmed, save) {
      function comparePlaylists (p1, p2) {
        return p1.id === p2.id && p1.name === p2.name && p1.musics === p2.musics;
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
      if (this.mode === 'edit') {
        this.$nextTick(() => this.$refs.editInput.focus());
      }
    },
    deleteFromPlaylist (id) {
      this.deleteIds.push(id);

      this.playlist.musics = this.playlist.musics.filter(musicId => musicId !== id);
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
      musics: playlistStored.musics
    };
    this.editInput = this.$refs.editInput;
  }
}
</script>

<style>
#playlist .page-header{
  padding-left:0.4rem;
  font-size:0;
}
#playlist input.page-title{
  background-color:transparent;
  height:1.5em;
  margin:0.6rem 2%;
  width:60%;
  outline:none;
  vertical-align:middle;
}
input.page-title:focus{
background-color:rgba(255,255,255,0.2);
}
.edit{
  border:2px dashed white;
  padding:0.5rem;
}
#playlist .page-header button{
  vertical-align: middle;
  height:2.5rem;
  color:white;
  font-size:1.4rem;
  padding:0 0.5rem;
  width:18%;
}
.item.sortable-chosen{
  background-color:rgba(0,0,0,0.3);
}
.item.sortable-ghost{
  opacity:0.3;
}
</style>