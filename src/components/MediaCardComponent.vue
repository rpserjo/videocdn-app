<template>
<div class="media-card-info">
    <div class="media-card-avatar">
        <img :src="getMediaInfo('avatar')">
    </div>
    <div class="media-card-titles">
        <span class="media-card-ru-title">{{getMediaInfo('ru_title')}}</span>
        <span class="media-card-orig-title">
            {{getMediaInfo('orig_title')}} ({{getMediaInfo('released')}})
        </span>
    </div>
    <div class="media-card-right">
        <my-icon w="36" h="36" :icon="(isBookmarked) ? 'bookmark-off' : 'bookmark'" class="logo pointer" @click="bookmark"></my-icon>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name : 'MediaCard',
    computed: {
        ...mapGetters(['getIsBookmarked', 'getMediaInfo', 'getState']),
        isBookmarked: function() {
            const id = this.getState('id', 'current')
            return this.getIsBookmarked(id)
        }
    },
    methods: {
        ...mapMutations(['toggleBookmark']),
        bookmark: function(){
            const id = this.getState('id', 'current')
            this.toggleBookmark(id)
        }
    }
}
</script>

<style scoped>
    .media-card-ru-title{
        display: block;
        font-size: 22px;
        padding: 3px;
    }
    .media-card-orig-title{
        display: block;
        font-size: 18px;
        padding: 3px;
    }
    .media-card-info{
        margin: 5px 0px;
        padding: 5px;
        border-bottom: 2px solid var(--color-gray);
        display: flex;
    }
    .media-card-avatar{
        border: 1px solid var(--color-gray);
        padding: 3px;
        border-radius: 5px;
        display: inline-block;
        font-size: 0px;
    }
    .media-card-avatar > img{
        max-width: 200px;
        max-height: 200px;
    }
    .media-card-variant{
        padding: 5px;
        border-bottom: 1px solid var(--color-gray);
    }
    .media-card-titles{
        flex-grow: 1;
    }
</style>