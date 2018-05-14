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
          :class="searchValue.length ? 'fill' : ''">
          <btn :click="() => focusSearch()"><svgfile icon="search"></svgfile></btn>
          <transition name="slideAppear">
            <i v-if="source === 'yt' || source === 'search'"></i>
          </transition>
        </span>
        <label for="filer" v-if="source === 'fold'" class="filler"><svgfile icon="fold"></svgfile>Explorateur de fichiers</label>
        <btn :click="() => select()" class="select-icon" key="p"><i></i></btn>
        <div class="sources" v-if="selectSources">
          <btn
          v-for="(text, value) in sourcesText"
          :key="value"
          :click="() => select(value)"
          class="source"
          v-if="value !== 'search' || getSearchResult().length !== 0"
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
      <span v-if="searchResult.length === 0 && source === 'none'" class="empty-message">Sélectionnez une source pour rechercher vos musiques.<br><br>Une fois trouvées, cliquez dessus pour les écouter&nbsp;!</span>
      <span v-if="searchResult.length === 0 && source === 'fold'" class="empty-message">Cliquez sur le dossier pour ouvrir l'exlorateur de fichiers&nbsp;</span>
      <span v-if="searchResult.length === 0 && source === 'yt'" class="empty-message">Écrivez vos mots clés puis validez afin de voir les résultats&nbsp;!</span>
      <span v-if="searchValue.length && source === 'search'" class="empty-message center">Aucun résultat pour "{{searchValue}}"&nbsp;!</span>
      <span v-if="source === 'yt'" class="empty-message center">hostname : {{location}}<br><btn :click="() => parse()" v-if="(location === 'localhost' || !searchAuthorized) && source === 'yt'">Simuler un résultat de recherche</btn></span>
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
      youtubeSearchResult: '',
      gapi: null,
      location: window.location.hostname
    }
  },
  methods: {
    ...mapActions({
      addLocalFiles: 'manageStore/addLocalFiles'
    }),
    search (refresh) {
      if (this.source === 'none') {
        this.select();
        return;
      }
      var searchValueParsed = this.searchValue.toLowerCase()
      if (this.source === 'yt') {
        if (!refresh) {
          if (searchValueParsed.split(' ').join('').length < 3) {
            this.error = 'Entrez au moins 3 caractères !';
            return;
          }
        }
        var request = this.gapi.client.youtube.search.list({
          q: searchValueParsed,
          part: 'snippet',
          type: 'video',
          videoDuration: 'any'
        });

        var self = this;
        request.execute(function (response) {
          self.youtubeSearchResult = JSON.stringify(response.result);
          self.parse();
        });
        return;
      }
    },
    focusSearch () {
      if (this.searchValue.length) {
        this.search()
      } else {
        this.$nextTick(function () {
          this.$refs.searchInput.nextSibling.nextSibling.blur()
          this.$refs.searchInput.focus()
        })
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
      var self = this;
      this.gapi = window.gapi;
      if (this.location !== 'localhost' && !this.connected) {
        this.gapi.auth.authorize({
          client_id: self.OAUTH2_CLIENT_ID,
          scope: self.OAUTH2_SCOPES,
          immediate: false
        }, self.handleAuthResult);
      } else {
        this.error = 'La connection à l\'API a échoué';
      }
    },
    handleAuthResult (authResult) {
      if (authResult && !authResult.error && !authResult.message) {
        this.connected = true;
        this.loadAPIClientInterfaces();
      } else {
        this.error = 'La connection à l\'API a échoué';
      }
    },
    loadAPIClientInterfaces () {
      var self = this;
      this.gapi.client.load('youtube', 'v3', function () {
        self.handleAPILoaded();
      });
    },
    handleAPILoaded () {
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
        if (value === 'yt') {
          this.searchResult = [];
          this.focusSearch();
          //if (!this.searchAuthorized && this.location !== 'localhost') {
          if (!this.searchAuthorized) {
            this.connect();
          }
          return;
        }
        if (value === 'fold') {
          this.searchResult = [];
        }
        if (value === 'search') {
          this.searchResult = this.getSearchResult();
          this.focusSearch();
          return;
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getSearchResult: 'manageStore/getSearchResult'
    })
  },
  watch: {
    searchValue: function (value) {
      if (this.source === 'search') {
        if (value.length === 0) {
          this.searchResult = this.getSearchResult();
        }
        var searchValueParsed = value.toLowerCase();
        this.searchResult = this.getSearchResult().filter(music => (music.title.toLowerCase().indexOf(searchValueParsed) > -1 || music.author.toLowerCase().indexOf(searchValueParsed) > -1));
      }
    }
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
  height:auto;
  width:1.7rem;
  vertical-align: top;
  margin:0.5rem 4% 0;
}

.source-icon + .select-sources {
  width: calc(92% - 4.2rem);
}
.select-sources{
  font-size: 1.5rem;
  text-align:left;
  color: #c8d6e8;
  width: calc(100% - 2.5rem);
  padding: 0.2rem 4%;
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
  margin:1rem 0.5rem 0;
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
  width: 100%;
  transition: width 0.8s;
  vertical-align: top;
  padding: 0.4rem 18% 0 4%;
  line-height:1.15;
  height:2.5rem;
}

.input-container {
  vertical-align: top;
  display:inline-block;
  position:relative;
  width: calc(100% - 2.5rem);
  max-width:none;
  padding:0 2%;
}
.source-icon + .input-container {
  width: calc(100% - 5.8rem);
}

.input-container .button {
  position:absolute;
  background-color: transparent;
  -webkit-appearance: none;
  border: none;
  vertical-align: top;
  display: inline-block;
  height: 1.7rem;
  width: 1.7rem;
  font-size: 0;
  right:0.4rem;
  top:55%;
  transform:translate(0,-50%);
}
.input-container i{
  content:'';
  width:0%;
  height:0.1rem;
  position:absolute;
  bottom:0;
  left:2%;
  transition: width 0.6s;
  background-color:#c8d6e8;
}

.input-container .search-input:focus ~ i{
  width:96%;
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
