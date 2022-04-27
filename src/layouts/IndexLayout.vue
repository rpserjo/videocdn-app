<template>
  <div class="search-results">
    <div 
      v-for="(item) in currentList" 
      :data-id="item.id" 
      :key="item.id" 
      class="search-results-element" 
      @click="loadMedia({id: item.id})
    ">
    <div class="media-avatar" v-bind:style="{ 'background-image' : 'url(' + item.avatar + ')' }">
      <div class="label">{{item.label}}</div>
    </div>
      <div class="media-titles">
        <div class="media-title-ru">{{item.ru_title}}</div>
        <div class="media-title-orig">{{item.orig_title}} ({{item.released}})</div>
      </div>         
    </div>
    <div ref="observer" class="observer" style="height: 0px; width: 100%;">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name : 'indexLayout',
  beforeUnmount() {
    this.observer.disconnect()
  },
  computed: {
    ...mapGetters(['getSortedList']),
    currentList: function(){
      return this.getSortedList.slice(this.currentPosition, this.currentPosition + this.limit)
    }
  },
  data() {
    return {
      i: 0,
      currentPosition: 0,
      limit: 5,
      observer: null
    }
  },
  methods: {
    ...mapActions(['loadMedia'])
  },      
  mounted() {
    if(this.$refs.observer != undefined){
      const options = {
        rootMargin: '100px',
        threshold: 1.0
      }
      const callback = (entries) => {
        if(entries[0].isIntersecting){
          this.limit  = this.limit + 5
        }          
      }
      this.observer = new IntersectionObserver(callback, options)
      this.observer.observe(this.$refs.observer)
    }
  } 
}
</script>

<style scoped>
.search-results{
  padding: 5px;
}
.search-results-element{
  border: 1px solid var(--color-gray);
  padding: 3px;
  margin:  3px 0px;
  display: flex;
  cursor: pointer;
}
.search-results-element:hover{
  background-color: var(--color-lightgray);
}
.media-avatar{
  border: 1px solid var(--color-gray);
  height: 100px;
  width: 75px;
  border-radius: 3px;
  background-color: var(--color-lightgray);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 75px;
  font-size: 0px;
  position: relative;
}
.media-avatar > img{
  max-width: 150px;
  max-height: 100px;
}
.media-avatar > div.label{
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: var(--color-blue);
  height: 20px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 5px 0px 2px;
  padding: 3px 5px;
}
.media-titles{
  padding: 3px;
}
.media-title-ru{
  padding: 3px;
  font-size: 22px;
}
.media-title-orig{
  padding: 3px;
  font-size: 18px;
}
</style>