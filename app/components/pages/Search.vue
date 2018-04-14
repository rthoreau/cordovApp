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
    </header>
    <div class="page-content">
      <musicitem 
      v-for="(music, index) in searchResult" 
      v-bind:key="index" 
      v-bind:music="music"
      v-bind:page="'search'"
      @refresh="search(true)"></musicitem>
      <p v-if="searchResult.length === 0">You just want your music ?<br> Change source to your phone !</p>
      <errormessage :error="error" v-if="error" @closemessage="error = false"></errormessage>
    </div>
  </div>
</template>

<script>
import musicitem from '../components/MusicItem'
import errormessage from '../components/ErrorMessage'
import {mapGetters} from 'vuex'
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

<style lang="sass">
  .search-input{
    font-size:1.8rem;
    background-color:transparent;
    -webkit-appearance: none;
    box-shadow: none;
    border:none;
    outline:none;
    color:white;
    border-bottom:2px solid transparent;
    width:56%;
    transition:width 0.8s;
    vertical-align: middle;
    padding:0.1rem 2%;
    margin-right:2%;
    &.fill{
      width:80%;
    }
    &:focus{
      width:80%;
      border-bottom-color:#215292;
    }
  }
  #search .page-title label{
    background-color:transparent;
    -webkit-appearance: none;
    border:none;
    padding:0;
    vertical-align: middle;
    display:inline-block;
    height:2rem;
    width:8%;
    font-size:0;
  }
  .search-icon{
    fill:white;
    height:100%;
  }
  #search .page-content{
    text-align:center;
  }
</style>
