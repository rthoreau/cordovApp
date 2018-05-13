<template>
  <div id="search">
    <header class="page-header">
      <div class="select-container">
        <input type="file" id="filer" multiple @change="importMusic" accept="audio/*">
        <btn v-if="source !== 'fold' && source !== 'search'" :click="() => search()" class="source-icon" key="i"><svgfile :icon="source === 'none' ? 'search' : source"></svgfile></btn>
        <btn v-if="source === 'none'" :click="() => select()" class="select-sources" key="s">{{sourcesText[source]}}</btn>
        <span class="input-container" v-if="source === 'search' || source === 'yt'">
          <input 
          placeholder="Recherche..." 
          class="search-input" 
          ref="searchInput" 
          v-model="searchValue"
          @keyup.enter="search()"
          :class="searchValue.length ? 'fill' : ''"><label @click="focusSearch()"><svgfile icon="search"></svgfile></label>
        </span>
        <label for="filer" v-if="source === 'fold'" class="filler"><svgfile icon="fold"></svgfile>Explorateur de fichiers</label>
        <btn :click="() => select()" class="select-icon" key="p"><i></i></btn>
        <div class="sources" v-if="selectSources">
          <btn
          v-for="(text, value) in sourcesText"
          :key="value"
          :click="() => select(value)"
          class="source"
          :class="source === value ? 'selected' : ''"
          ><svgfile v-if="value !== 'none'" :icon="value"></svgfile>{{sourcesText[value]}}</btn>
        </div>
      </div>
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
        <btn :click="() => connect">Authorize access</btn>
      </div>
      <btn :click="() => parse" v-if="connected">Parse it dude</btn>
      <div class="ok" v-if="searchAuthorized">Connection pour recherche ok</div>
      <errormessage :error="error" v-if="error" @closemessage="error = false"></errormessage>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
import errormessage from '../components/ErrorMessage'
import {mapGetters, mapActions} from 'vuex'
import btn from '../components/Bouton'
import { mixin as clickaway } from 'vue-clickaway'
import svgfile from '../components/SvgFile'
export default {
  name: 'Search',
  mixins: [ clickaway ],
  components: {
    musicitem,
    errormessage,
    btn,
    svgfile
  },
  data () {
    return {
      searchValue: '',
      source: 'none',
      selectSources: false,
      sourcesText: {'none': 'Chercher dans...', 'yt': 'Youtube', 'fold': 'Mes musiques', 'search': 'Recherches déjà effectuées'},
      searchResult: [],
      error: false,
      OAUTH2_CLIENT_ID: '',
      OAUTH2_SCOPES: ['https://www.googleapis.com/auth/youtube'],
      connected: true,
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
          newMusics.push({id: '', url: '', title: file.name.substring(0, file.name.lastIndexOf('.')), author: '', duration: 0, thumbnail: '', plateform: 'lo', favorite: false, file: file});
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
      this.youtubeSearchResult = JSON.parse(this.youtubeSearchResult);
      var parsedResult = [];
      this.youtubeSearchResult.items.forEach(function (musicInfo) {
        parsedResult.push({id: 'yt' + musicInfo.id.videoId, videoId: musicInfo.id.videoId, title: musicInfo.snippet.title, author: musicInfo.snippet.channelTitle, duration: 0, thumbnail: musicInfo.snippet.thumbnails.default.url, plateform: 'yt', favorite: false})
      })
      this.addLocalFiles(parsedResult);
      this.searchResult = parsedResult;
    },
    select (value) {
      this.selectSources = !this.selectSources;
      if (value) {
        this.source = value;
        if (value === 'search' || value === 'yt') {
          this.focusSearch();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getSearchResult: 'manageStore/getSearchResult'
    })
  }
}
</script>

<style>
#search .page-header{
  padding:0 1.4rem;
  font-size:0;
}
.select-container{
  border:0.1rem solid #207cd28a;
  margin-top:0.5rem;
}
.source-icon{
  padding: 0 4%;
  height:auto;
  width:3.29rem;
  vertical-align: top;
  margin-top:0.5rem;
}
.source-icon + .select-sources {
  width: calc(100% - 5.8rem);
}
.select-sources{
  font-size: 1.5rem;
  text-align:left;
  color: #c8d6e8;
  width: calc(100% - 2.5rem);
  padding: 0.1rem 4%;
  height:2.7rem;
  vertical-align: top;
}
.select-icon{
  display:inline-block;
  height:2.7rem;
  width:2.5rem;
  border-left:0.1rem solid #207cd28a;
  overflow:hidden;
}
.select-icon i{
  display:inline-block;
  width:0;
  height:0;
  border-width:0.7rem;
  margin:0.8rem 0.5rem 0;
  border-style:solid;
  border-color:#c8d6e8 transparent transparent transparent;
}
.sources{
  position:absolute;
  top:3.4rem;
  display:block;
  background-color:#0c1d29;
  width: calc(100% - 2.8rem);
  left:1.4rem;
  padding:0.3rem 0;
}
.source{
  display:block;
  font-size:1rem;
  padding: 0.3rem 4%;
  text-align:left;
}
.source.selected{
  background-color:#173f5a;
}
.source svg{
  display:inline-block;
  width:1.2rem;
  height:auto;
  vertical-align: middle;
  margin-right:0.5rem;
}
.search-input {
  font-size: 1.4rem;
  background-color: transparent;
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  outline: none;
  color: #c8d6e8;
  border-bottom: 2px solid transparent;
  width: 100%;
  transition: width 0.8s;
  vertical-align: top;
  padding: 0.4rem 18% 0 4%;
  line-height:1.15;
  height:2.3rem;
}
.search-input:focus {
  border-bottom-color: #215292;
}

#search .input-container {
  vertical-align: top;
  display:inline-block;
  position:relative;
  width: calc(100% - 2.5rem);
  max-width:none;
}
#search .source-icon + .input-container {
  width: calc(100% - 5.8rem);
}

#search .input-container label {
  position:absolute;
  background-color: transparent;
  -webkit-appearance: none;
  border: none;
  vertical-align: top;
  display: inline-block;
  height: 1.7rem;
  width: 1.7rem;
  font-size: 0;
  right:0.3rem;
  top:55%;
  transform:translate(0,-50%);
}
#search .input-container label svg {
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
label.filler{
  display:inline-block;
  font-size:1.2rem;
  width:calc(100% - 2.5rem);
  padding: 0.1rem 2%;
  line-height:1.15;
  margin-top:0.5rem;
  vertical-align: top;
}
label.filler svg {
  display:inline-block;
  width:1.2rem;
  height:auto;
  vertical-align: top;
  margin:0 0.8rem 0 0.5rem;
}
</style>
