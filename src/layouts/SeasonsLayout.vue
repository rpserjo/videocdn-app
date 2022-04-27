<template>
    <div>
        <div class="media-card-seasons" @click="setLayout('detailsTvLayout')">
            <div><my-icon :w="36" :h="36" icon="folder-up" class="dark"/></div>
            <div class="media-folder-up">
                <div class="media-folder-up-first">{{ru_title}}</div>
                <div class="media-folder-up-second">{{translation_title}}</div>
            </div>
        </div>
        <template v-if="seasons.length > 0">
            <div 
                v-for="(season, season_key) in seasons" 
                class="media-card-seasons" @click="loadSeason(season_key)"
                :key="season_key"
            >
                <my-icon :w="36" :h="36" icon="folder"/>
                <div>{{ season.season_title }}</div>            
            </div>
        </template>
        <template v-else>
            <episodes-list/>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import EpisodesList from '@/components/EpisodesList'
export default {
    components: { EpisodesList },
    computed: {
        ...mapGetters(['getState']),
        ru_title: function(){
          return this.getState(this.getState('source', 'current'))[this.getState('id', 'current')].ru_title
        },
        seasons: function(){
          const {id, translation_id}= this.getState(['id', 'translation_id'], 'current')
          return this.getState(this.getState('source', 'current'))[id].translations[translation_id].seasons
        },
        translation_title: function(){
          return this.getState('translations')[this.getState('translation_id', 'current')]
        }        
    },
    methods: {
        ...mapMutations(['setCurrent', 'setLayout']),
        loadSeason: function(season_key){
            this.setCurrent({layout: 'episodesLayout', season_key: season_key})
        }
    }
}
</script>

<style scoped>
.media-folder-up{
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
}
.media-folder-up-first{
  font-size: 1.25rem;
}
.media-folder-up-second{
  font-size: 1rem;
}
.media-card-seasons{
  border-bottom: 1px solid var(--color-gray);
  padding: 3px 5px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  /*height: 24px;*/
}
</style>