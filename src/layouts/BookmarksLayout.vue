<template>
	<div>
        <h3 class="bookmarks">Избранное</h3>
        <div v-if="getBookmarksList.length > 0" class="search-results">
          <div class="search-results">
            <div 
              v-for="(item) in getBookmarksList" 
              :key="item.id" 
              class="search-results-element" 
              @click="loadMedia({id: item.id, source: 'bookmarksResult'})
            ">
            <div class="media-avatar" v-bind:style="{ 'background-image' : 'url(' + item.avatar + ')' }">
              <div class="label">{{item.label}}</div>
            </div>
              <div class="media-titles">
                <div class="media-title-ru">{{item.ru_title}}</div>
                <div class="media-title-orig">{{item.orig_title}} ({{item.released}})</div>
              </div>         
            </div>            
          </div>
        </div>
        <div v-else class="empty-bookmarks">Список избранного пуст</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	computed: {
		...mapGetters(['getBookmarksList']),        
	},
	methods: {
		...mapActions(['loadBookmarks', 'loadMedia'])
	},
	mounted(){
		this.loadBookmarks()
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
h3.bookmarks{
  text-align: center;
  padding: 5px;
  margin-top: 10px;
}
.empty-bookmarks{
  border: 1px solid var(--color-lightyellow);
  padding: 5px;
  margin: 0px 5px 5px 5px;
  text-align: center;
  background-color: var(--color-lightyellow);
}
</style>