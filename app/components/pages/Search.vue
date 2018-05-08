<template>
  <div id="search">
    <header class="page-header">
      <span class="page-title">
        <input 
        placeholder="Recherche..." 
        class="search-input" 
        ref="searchInput" 
        v-model="searchValue"
        @keyup.enter="search()"
        :class="searchValue.length ? 'fill' : ''"><label @click="focusSearch()"><svg viewBox="0 0 23.125 23.129" class="search-icon"><use xlink:href="#icon-search"></use></svg></label>
      </span>
      <input type="file" id="filer" multiple @change="importMusic" accept="audio/*">
      <label for="filer"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-fold"></use></svg></label>
    </header>
    <div class="page-content">
      <musicitem 
      v-for="(music, index) in searchResult" 
      :key="index" 
      :music="music"
      :page="'search'"
      :searchvalue="searchValue"
      @refresh="search"></musicitem>
      <span v-if="searchResult.length === 0" class="empty-message">Pour écouter les musiques de votre téléphone, cliquez sur le dossier&nbsp;!<br><br>Pour rechercher des musiques sur Youtube, utilisez le champ de recherche&nbsp;!</span>
      <div class="authentication" v-if="!connected">
        <button @click="connect">Authorize access</button>
      </div>
      <button @click="parse" v-if="connected">Parse it dude</button>
      <div class="ok" v-if="searchAuthorized">Connection pour recherche ok</div>
      <errormessage :error="error" v-if="error" @closemessage="error = false"></errormessage>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
import errormessage from '../components/ErrorMessage'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Search',
  components: {
    musicitem,
    errormessage
  },
  data () {
    return {
      searchValue: '',
      searchResult: [],
      error: false,
      OAUTH2_CLIENT_ID: '',
      OAUTH2_SCOPES: ['https://www.googleapis.com/auth/youtube'],
      connected: false,
      searchAuthorized: false,
      searchIn: 'youtube',
      youtubeSearchResult: '',
      gapi: null
    }
  },
  methods: {
    ...mapActions({
      addLocalFiles: 'manageStore/addLocalFiles'
    }),
    search (refresh) {
      var searchValueParsed = this.searchValue.toLowerCase()
      if (!refresh) {
        if (searchValueParsed.split(' ').join('').length < 3) {
          this.error = 'Entrez au moins 3 caractères !';
          return;
        }
      }
      if (this.searchIn === 'youtube') {
        var request = this.gapi.client.youtube.search.list({
          q: searchValueParsed,
          part: 'snippet',
          type: 'video',
          videoDuration: 'any'
        });

        var self = this;
        request.execute(function (response) {
          self.youtubeSearchResult = JSON.stringify(response.result);
        });
        return;
      }
      this.searchResult = this.getSearchResult().filter(music => (music.title.toLowerCase().indexOf(searchValueParsed) > -1 || music.author.toLowerCase().indexOf(searchValueParsed) > -1))
    },
    focusSearch () {
      if (this.searchValue.length) {
        this.search()
      } else {
        this.$refs.searchInput.focus()
      }
    },
    importMusic (e) {
      var files = e.target.files;
      var newMusics = []
      var file;
      for (var i = 0; i < files.length; i++) {
        file = files[i]
        if (true) {
          newMusics.push({id: '', url: '', title: file.name, author: '', duration: 0, thumbnail: '', plateform: 'lo', favorite: false, file: file});
        }
      }
      if (newMusics.length) {
        this.addLocalFiles(newMusics);
        var self = this;
        newMusics.map(function (music) {
          self.searchResult.push(music);
        });
      }
    },
    //YOUTUBE API
    connect () {
      console.log('connect')
      var self = this;
      this.gapi = window.gapi;
      this.gapi.auth.authorize({
        client_id: self.OAUTH2_CLIENT_ID,
        scope: self.OAUTH2_SCOPES,
        immediate: false
      }, self.handleAuthResult);
    },
    googleApiClientReady () {
      console.log('googleApiClientReady')
      var self = this;
      this.gapi = window.gapi;
      this.gapi.auth.init(function () {
        self.$nextTick(function () {
          self.checkAuth();
        });
      });
    },
    checkAuth () {
      console.log('checkAuth')
      var self = this;
      this.gapi.auth.authorize({
        client_id: self.OAUTH2_CLIENT_ID,
        scope: self.OAUTH2_SCOPES,
        immediate: true
      }, self.handleAuthResult);
    },
    handleAuthResult (authResult) {
      console.log('handleAuthResult')
      if (authResult && !authResult.error) {
        this.connected = true;
        this.loadAPIClientInterfaces();
      }
    },
    loadAPIClientInterfaces () {
      console.log('loadAPIClientInterfaces')
      var self = this;
      this.gapi.client.load('youtube', 'v3', function () {
        self.handleAPILoaded();
      });
    },
    handleAPILoaded () {
      console.log('handleAPILoaded')
      this.searchAuthorized = true;
    },
    parse () {
      this.youtubeSearchResult = JSON.parse(this.youtubeSearchResult)
      console.log(this.youtubeSearchResult);
      var self = this;
      this.youtubeSearchResult.items.forEach(function (musicInfo) {
        console.log(musicInfo)
        self.searchResult.push({id: 'yt' + musicInfo.id.videoId, videoId: musicInfo.id.videoId, title: musicInfo.title, author: musicInfo.snippet.channelTitle, duration: 0, thumbnail: musicInfo.snippet.thumbnails.default.url, plateform: 'yt', favorite: false})
      })
    }
  },
  mounted () {
    this.$refs.searchInput.focus()
  },
  computed: {
    ...mapGetters({
      getSearchResult: 'manageStore/getSearchResult'
    })
  }
}
</script>

<style>
.search-input {
  font-size: 1.8rem;
  background-color: transparent;
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  outline: none;
  color: white;
  border-bottom: 2px solid transparent;
  width: 55%;
  transition: width 0.8s;
  vertical-align: middle;
  padding: 0.1rem 2%;
  height:6vh;
  margin:2vh 2% 2vh 0;
}
.search-input.fill {
  width: 88%;
}
.search-input:focus {
  width: 88%;
  border-bottom-color: #215292;
}

#search .page-title {
  width:80%;
  max-width:none;
}

#search .page-title label {
  background-color: transparent;
  -webkit-appearance: none;
  border: none;
  vertical-align: middle;
  display: inline-block;
  height: 2rem;
  width: 2rem;
  font-size: 0;
}
#search .page-title label svg {
  vertical-align: top;
}

.search-icon {
  fill: white;
  height: 100%;
}

#filer {
  position: absolute;
  left: -99rem;
}
#filer + label {
  position:absolute;
  top:50%;
  right:1rem;
  display: inline-block;
  width: auto;
  height: 2rem;
  transform:translate(0,-50%)
}
#filer + label svg {
  height: 100%;
}
</style>
