<template>
  <div id="search">
    <header class="page-header">
      <div class="select-container">
        <input type="file" id="filer" multiple @change="importMusic" accept="audio/*" ref="fold">
        <btn v-if="source !== 'fold' && source !== 'search'" :click="() => search()" class="source-icon" key="i"><svgfile :icon="source === 'none' ? 'search' : source"></svgfile></btn>
        <btn v-if="source === 'none'" :click="() => select()" class="select-sources" key="s">{{sourcesText[source]}}</btn>
        <span class="input-container" v-if="source === 'search' || source === 'yt'" 
          :style="source === 'yt' && !connected ? 'opacity:0' : ''">
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
      v-if="searchResult.length && (source !== 'search' || compare(music))"
      :key="keyValue(index, music.title)" 
      :music="music"
      :page="'search'"
      :forcedfavorite="source === 'yt' || source === 'fold'"
      @refresh="search"></musicitem>
      <span v-if="searchResult.length === 0 && source === 'none'" class="empty-message">Sélectionnez une source pour rechercher vos musiques</span>
      <span v-if="searchResult.length === 0 && source === 'fold'" class="empty-message">Cliquez sur le dossier pour ouvrir l'exlorateur de fichiers&nbsp;</span>
      <span v-if="searchResult.length === 0 && source === 'yt' && connected" class="empty-message">Écrivez vos mots clés puis validez afin de voir les résultats&nbsp;!</span>
      <span v-if="searchValue.length && source === 'search'" class="empty-message center">Aucun résultat pour "{{searchValue}}"&nbsp;!</span>
      <span v-if="searchResult.length === 0 && source === 'yt' && !searchAuthorized" class="empty-message">La recherche sur Youtube ne fonctionne pas sur l'application pour le moment&nbsp;!<br><br>Vous pouvez cependant<br><btn :click="() => parse()" v-if="(location === 'localhost' || !searchAuthorized) && source === 'yt'" class="blue borders">Simuler un résultat de recherche</btn></span>
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
      OAUTH2_CLIENT_ID: '950123233154-7fbmpjgek656qv3mbvd3jgf3n57otb2a.apps.googleusercontent.com',
      OAUTH2_SCOPES: ['https://www.googleapis.com/auth/youtube'],
      connected: false,
      searchAuthorized: false,
      youtubeSearchResult: '{"kind": "youtube#searchListResponse","etag": "95M1zlW0txkV42I4OG1Zscxrg5A/pR85xSUYsctjpvj3tCENwe6Td6c","nextPageToken": "CAUQAA","regionCode": "FR","pageInfo": {"totalResults": 302170,"resultsPerPage": 5},"items": [{"kind": "youtube#searchResult","etag": "95M1zlW0txkV42I4OG1Zscxrg5A/aYCHz1COoSHWTXiBZanqNLoko7I","id": {"kind": "youtube#video","videoId": "vdaXWg3TfuY"},"snippet": {"publishedAt": "2017-09-17T05:17:03.000Z","channelId": "UCJPp8C9j1vIUWA4dSksfZ0g","title": "OVERWERK - Funeral","description": "Continuing his tradition of riveting dance music, OVERWERK presents his first full-length album, State. - Share to support! Spotify : http://spoti.fi/2fc1vgk Apple ...","thumbnails": {"default": {"url": "https://i.ytimg.com/vi/vdaXWg3TfuY/default.jpg","width": 120,"height": 90},"medium": {"url": "https://i.ytimg.com/vi/vdaXWg3TfuY/mqdefault.jpg","width": 320,"height": 180},"high": {"url": "https://i.ytimg.com/vi/vdaXWg3TfuY/hqdefault.jpg","width": 480,"height": 360}},"channelTitle": "OVERWERK","liveBroadcastContent": "none"}},{"kind": "youtube#searchResult","etag": "95M1zlW0txkV42I4OG1Zscxrg5A/08FJgmg1k24mE6Ydbs0kfEFJHrA","id": {"kind": "youtube#video","videoId": "6KKKGpAZHAA"},"snippet": {"publishedAt": "2012-10-17T14:17:41.000Z","channelId": "UCkeJqeBQOwpN3MsomDAKy1g","title": "OVERWERK - Daybreak (GoPro Edit) [Electro House]","description": "EMH Music / Electro, Minimal House » Subscribe for more music: http://bit.ly/EMHmusic » Facebook: https://facebook.com/EMHmusicPromo » Soundcloud: ...","thumbnails": {"default": {"url": "https://i.ytimg.com/vi/6KKKGpAZHAA/default.jpg","width": 120,"height": 90},"medium": {"url": "https://i.ytimg.com/vi/6KKKGpAZHAA/mqdefault.jpg","width": 320,"height": 180},"high": {"url": "https://i.ytimg.com/vi/6KKKGpAZHAA/hqdefault.jpg","width": 480,"height": 360}},"channelTitle": "EMH Music","liveBroadcastContent": "none"}},{"kind": "youtube#searchResult","etag": "95M1zlW0txkV42I4OG1Zscxrg5A/d4fbnRKBcgFhU8p2dhv-wCC8mu4","id": {"kind": "youtube#video","videoId": "N-sDbJSXnYc"},"snippet": {"publishedAt": "2018-03-16T10:31:52.000Z","channelId": "UCJPp8C9j1vIUWA4dSksfZ0g","title": "OVERWERK - Reign (Official Video)","description": "Reign from OVERWERKs debut album, State Spotify : http://spoti.fi/2fc1vgk Apple Music : http://apple.co/2xbC1pq Google Play : https://goo.gl/xZyjqY Director ...","thumbnails": {"default": {"url": "https://i.ytimg.com/vi/N-sDbJSXnYc/default.jpg","width": 120,"height": 90},"medium": {"url": "https://i.ytimg.com/vi/N-sDbJSXnYc/mqdefault.jpg","width": 320,"height": 180},"high": {"url": "https://i.ytimg.com/vi/N-sDbJSXnYc/hqdefault.jpg","width": 480,"height": 360}},"channelTitle": "OVERWERK","liveBroadcastContent": "none"}},{"kind": "youtube#searchResult","etag": "95M1zlW0txkV42I4OG1Zscxrg5A/EqxzaH_o4EYlj6zcxuaDST28-AA","id": {"kind": "youtube#video","videoId": "DWpX4We62dg"},"snippet": {"publishedAt": "2015-11-03T08:00:01.000Z","channelId": "UCJPp8C9j1vIUWA4dSksfZ0g","title": "OVERWERK - Canon","description": "OVERWERKs new EP, Canon is OUT NOW! iTunes/Apple Music : http://apple.co/1P8yig3 Google Play : http://bit.ly/1MgqQwU Spotify : http://bit.ly/1MbBzVZ ...","thumbnails": {"default": {"url": "https://i.ytimg.com/vi/DWpX4We62dg/default.jpg","width": 120,"height": 90},"medium": {"url": "https://i.ytimg.com/vi/DWpX4We62dg/mqdefault.jpg","width": 320,"height": 180},"high": {"url": "https://i.ytimg.com/vi/DWpX4We62dg/hqdefault.jpg","width": 480,"height": 360}},"channelTitle": "OVERWERK","liveBroadcastContent": "none"}},{"kind": "youtube#searchResult","etag": "95M1zlW0txkV42I4OG1Zscxrg5A/63VruFI-xOre0YbZaT2_S4rE36g","id": {"kind": "youtube#video","videoId": "ycfM6XGBE30"},"snippet": {"publishedAt": "2015-05-05T07:30:01.000Z","channelId": "UCJPp8C9j1vIUWA4dSksfZ0g","title": "OVERWERK - Toccata","description": "OVERWERKs new EP, Canon is OUT NOW! iTunes/Apple Music : http://apple.co/1P8yig3 Google Play : http://bit.ly/1MgqQwU Spotify : http://bit.ly/1MbBzVZ ...","thumbnails": {"default": {"url": "https://i.ytimg.com/vi/ycfM6XGBE30/default.jpg","width": 120,"height": 90},"medium": {"url": "https://i.ytimg.com/vi/ycfM6XGBE30/mqdefault.jpg","width": 320,"height": 180},"high": {"url": "https://i.ytimg.com/vi/ycfM6XGBE30/hqdefault.jpg","width": 480,"height": 360}},"channelTitle": "OVERWERK","liveBroadcastContent": "none"}}]}',
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
      this.$refs.searchInput.blur();
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
          videoDuration: 'any',
          maxResults: 10
        });

        var self = this;
        request.execute(function (response) {
          self.youtubeSearchResult = JSON.stringify(response.result);
          self.parse();
        });
        return;
      }
    },
    compare (music) {
      var valueParsed = this.norm(this.searchValue);
      return (this.norm(music.title).indexOf(valueParsed) > -1 || this.norm(music.author).toLowerCase().indexOf(valueParsed) > -1);
    },
    norm (val) {
      return val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    keyValue (index, val) {
      val = val.substr(val.length - 5);
      return index + '-' + val.charCodeAt(0) + val.charCodeAt(1) + val.charCodeAt(2) + val.charCodeAt(3) + val.charCodeAt(4);
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
      if (!this.connected) {
        if (this.location !== 'localhost') {
          this.gapi.auth.authorize({
            client_id: self.OAUTH2_CLIENT_ID,
            scope: self.OAUTH2_SCOPES,
            immediate: false
          }, self.handleAuthResult);
        } else {
          this.error = 'La connection à l\'API a échoué';
        }
      }
    },
    handleAuthResult (authResult) {
      if (authResult && !authResult.error && !authResult.message) {
        this.connected = true;
        window.connected = true;
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
      window.searchAuthorized = true;
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
        this.searchValue = '';
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
          this.$refs.fold.click();
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
  mounted () {
    this.searchAuthorized = window.searchAuthorized || false;
    this.connected = window.connected || false;
    this.gapi = window.gapi;
  }
}
</script>

<style>
#search .page-header{
  padding:0 1.4rem;
  font-size:0;
}
.select-container{
  background: linear-gradient(to top, #207cd28a 0%, #207cd28a 0.1rem, transparent 0.1rem, transparent 100%),
    linear-gradient(to left, #207cd28a 0%, #207cd28a 0.1rem, transparent 0.1rem, transparent 100%),
    linear-gradient(to right, #207cd28a 0%, #207cd28a 0.1rem, transparent 0.1rem, transparent 100%),
    linear-gradient(to bottom, #207cd28a 0%, #207cd28a 0.1rem, transparent 0.1rem, transparent 100%);
  margin-top:0.5rem;
}
.source-icon{
  height:auto;
  width:1.7rem;
  vertical-align: top;
  margin:0.5rem 4% 0;
}

.source-icon + .select-sources {
  width: calc(92% - 4.3rem);
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
  font-size:0;
}
.select-icon i{
  display:inline-block;
  width:0;
  height:0;
  border-width:0.7rem;
  margin:1rem 0 0 0.2rem;
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
  width: calc(100% - 2.8rem);
  max-width:none;
  padding:0 2%;
}
.source-icon + .input-container {
  width: calc(92% - 4.7rem);
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
  font-size:1.1rem;
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
.button.blue{
  color:#207bd2;
}
</style>
