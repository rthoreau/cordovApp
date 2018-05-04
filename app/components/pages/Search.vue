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
        v-bind:class="searchValue.length ? 'fill' : ''"><label @click="focusSearch()"><svg viewBox="0 0 23.125 23.129" class="search-icon"><use xlink:href="#icon-search"></use></svg></label>
      </span>
      <input type="file" id="filer" multiple @change="importMusic" accept="audio/*">
      <label for="filer"><svg viewBox="0 0 23.125 23.129"><use xlink:href="#icon-playlist"></use></svg></label>
    </header>
    <div class="page-content">
      <musicitem 
      v-for="(music, index) in searchResult" 
      v-bind:key="index" 
      v-bind:music="music"
      v-bind:page="'search'"
      @refresh="search(true)"></musicitem>
      <span v-if="searchResult.length === 0" class="empty-message">Pour écouter les musiques de votre téléphone, cliquez sur le dossier&nbsp;!<br><br>Pour rechercher des musiques sur Youtube, utilisez le champ de recherche&nbsp;!</span>
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
      error: false
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
  width: 56%;
  transition: width 0.8s;
  vertical-align: middle;
  padding: 0.1rem 2%;
  margin-right: 2%;
}
.search-input.fill {
  width: 70%;
}
.search-input:focus {
  width: 70%;
  border-bottom-color: #215292;
}

#search .page-title label {
  background-color: transparent;
  -webkit-appearance: none;
  border: none;
  padding: 0;
  vertical-align: middle;
  display: inline-block;
  height: 2rem;
  width: 8%;
  font-size: 0;
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
  float: right;
  vertical-align: middle;
  display: inline-block;
  width: auto;
  height: 2rem;
  margin: 0.8rem 0.5rem;
}
#filer + label svg {
  height: 100%;
}
</style>
