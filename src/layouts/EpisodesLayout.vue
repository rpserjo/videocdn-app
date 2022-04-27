<template>
    <div>        
        <div class="media-card-seasons" @click="setLayout('seasonsLayout')">
            <div>
                <my-icon :w="36" :h="36" icon="folder-up" class="dark"/>
            </div>
            <div class="media-folder-up">
                <div class="media-folder-up-first">{{ru_title}}</div>
                <div class="media-folder-up-second">
                    {{season_title}} / {{translation_title}}
                </div>
            </div>
        </div>
        <episodes-list/>        
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
        season_title: function(){
          const {id, translation_id, season_key} = this.getState(['id', 'translation_id', 'season_key'], 'current')
          return this.getState(this.getState('source', 'current'))[id].translations[translation_id].seasons[season_key].season_title
        },
        translation_title: function(){
          return this.getState('translations')[this.getState('translation_id', 'current')]
        }
    },
    methods: {
        ...mapMutations(['setCurrent', 'setLayout'])
    }
}
</script>

<style scoped>
.media-card-seasons{
  border-bottom: 1px solid var(--color-gray);
  padding: 3px 5px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  /*height: 24px;*/
}
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
</style>