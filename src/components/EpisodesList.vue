<template>
    <div v-for="(episode, key) in episodes" :key="key" class="media-element">
        <media-links :translation="{translation_id: getState('translation_id', 'current'), translation_title : episode.episode_title, links : episode.links, episode_key : key, episode_code: episode.episode_code}"/>        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MediaLinks from '@/components/MediaLinks'
export default {
    components: { MediaLinks },
    computed: {
        ...mapGetters(['getState']),
        episodes: function(){
          const {id, translation_id, season_key} = this.getState(['id', 'translation_id', 'season_key'], 'current')
          if(this.getState(this.getState('source', 'current'))[id].translations[translation_id].seasons.length > 0){
            return this.getState(this.getState('source', 'current'))[id].translations[translation_id].seasons[season_key].episodes
          }else{
            return this.getState(this.getState('source', 'current'))[id].translations[translation_id].episodes
          }
        }
    }
}
</script>

<style scoped>
.media-element{
  border-bottom: 1px solid var(--color-gray);
  padding: 3px 5px;
  margin-top: -1px;
}
</style>