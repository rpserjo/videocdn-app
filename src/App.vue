<template>
  <spinner/>
  
  <MyHeader 
    :window-width="windowWidth" 
    v-model:search-query="searchQuery" 
    v-model:show-tunes="showTunes" 
    v-model:watch-online="watchOnline" 
    @search="search"
  />
  <tunes 
    v-model:search-types="searchTypes" 
    v-model:year-filter="yearFilter" 
    :show-tunes="showTunes" 
    @search="search"
  />
  <div class="content">        
    <div class="wrap">
      <transition name="component-fade" mode="out-in" @before-enter="scrollToTop">
        <component :is="getState('layout', 'current')"></component>
      </transition>
    </div>
  </div>
  <media-dialog/>
  <video-player/>
  <toast-message/>
</template>

<script>
import Spinner from '@/components/Spinner'
import MyHeader from '@/components/Header'
import Tunes from '@/components/Tunes'
import IndexLayout from '@/layouts/IndexLayout'
import BookmarksLayout from '@/layouts/BookmarksLayout'
import DetailsMovieLayout from '@/layouts/DetailsMovieLayout'
import DetailsTvLayout from '@/layouts/DetailsTvLayout'
import SeasonsLayout from '@/layouts/SeasonsLayout'
import EpisodesLayout from '@/layouts/EpisodesLayout'
import MediaDialog from '@/components/MediaDialog'
import VideoPlayer from '@/components/VideoPlayer'
import ToastMessage from '@/components/ToastMessage'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  components: { 
    Spinner, 
    MyHeader, 
    Tunes, 
    IndexLayout,
    BookmarksLayout,
    DetailsMovieLayout, 
    DetailsTvLayout,
    SeasonsLayout,
    EpisodesLayout,
    MediaDialog,
    VideoPlayer,
    ToastMessage
  },
  computed:{
    ...mapGetters(['getState']),
    watchOnline: {
      get() {
        return this.getState('watchOnline')
      },
      set(value) {
        this.setState({watchOnline: value})
      }
    }
  },
  data() {
    return {
      searchQuery : (window.localStorage.getItem('lastSearchQuery') != null) ? window.localStorage.getItem('lastSearchQuery') : '',
      windowWidth : window.innerWidth,
      showTunes : false,
      searchTypes : [
        {key : 'movies', label : 'Кино', checked : true},
        {key : 'show-tv-series', label : 'ТВ-шоу', checked : true},
        {key : 'tv-series', label : 'Сериалы', checked : true},            
      ],
      yearFilter : '',
    }
  },   
  methods : {
    ...mapMutations(['loadBookmarks', 'loadWatchHistory', 'setState', 'showToastMessage']),
    ...mapActions(['searchMedia', 'updateTranslations']),
    onResize: function(){
      this.windowWidth = window.innerWidth
      this.setState({isMobile: false})
      if(window.innerWidth < 500 || window.innerHeight < 900){
        this.setState({isMobile: true})
      }
    },
    scrollToTop(){
      window.scrollTo(0, 0)
    },
    search(event){
      event.target.blur()
      if(this.searchQuery.length > 2){
        let types = []
        this.searchTypes.forEach((type) => {
          if(type.checked == true){
            types.push(type.key)
          }
        })
        if(types.length > 0){
          window.localStorage.setItem('lastSearchQuery', this.searchQuery)
          this.showTunes = false
          this.searchMedia({types: types, searchQuery: this.searchQuery, yearFilter: this.yearFilter})
        }else{
          this.showToastMessage('Необходимо выбрать категорию поиска')
        }
      }else{
        this.showToastMessage('Необходимо ввести поисковый запрос')
      }
    }
  },
  mounted(){
    window.addEventListener('resize', this.onResize)
    this.updateTranslations()
    this.loadBookmarks()
    this.loadWatchHistory()
    document.title = '[CDN] App'
  },  
  watch: {
    watchOnline: function(){
      window.localStorage.setItem('watchOnline', this.watchOnline)
    }
  }
}
</script>

<style>
:root {
  --color-white: #ffffff;
  --color-blue: #2196f3;
  --color-dark: #212529;
  --color-gray: #ced4da;
  --color-lightgray: #fbfbfb;
  --color-warning: #dc3545;
  --color-lightyellow: #ffe69c;
  --color-yellow: #ffc107;
}
*{
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
}
.wrap{
  margin: 0 auto;
  width: 100%;
  max-width: 1320px;
}
.content{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /*border: 1px solid indigo;*/
}
/*[COMPONENT FADE]*/
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.3s ease;
}
.component-fade-enter-from,
.component-fade-leave-to {
  transform: translateX(100vw);
}
</style>