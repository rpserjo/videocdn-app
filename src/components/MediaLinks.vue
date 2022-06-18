<template>
    <div class="media-title" @click="click($event, translation)">
        <my-icon :w="36" :h="36" icon="movie" :class="{'watched' : isWatched(translation.episode_code)}"/>
        <div class="media-link-group pointer">
            <div class="media-link-title">{{translation.translation_title}}</div>
            <div class="media-link-qualities">
                <span v-for="(quality, key) in translation.links.qualities" :key="key">{{quality}}p</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'media-links',
    props: ['translation'],
    methods: {
        ...mapMutations(['setCurrent', 'setMediaDialog']),
        click: function(event, translation) {
            this.setCurrent({episode_key: translation.episode_key, episode_code: translation.episode_code})
            let position = {x: 0, y: 0}
            position.x = ((event.clientX-150) < 0) ? 20 : ((event.clientX + 150) > window.innerWidth) ? window.innerWidth - 320 : event.clientX - 150
            position.y = ((event.clientY-125) < 0) ? position.y = 55 : ((event.clientY + 125) > window.innerHeight) ? window.innerHeight - 250 : event.clientY - 125
            let sources = {}
            for(let quality of translation.links.qualities){
              let dn = this.getCurrentTitle              
              dn = dn + '_[' + quality + '].mp4'
              sources[quality] = translation.links.links[quality] + '?dn=' + dn
            }
            this.setMediaDialog({
                position: position,
                title: translation.translation_title,
                sources: sources
            })
            this.setMediaDialog({show: true})
        },
        isWatched: function(episode_code) {
            const id = this.getState('id', 'current')
            const key = [id, episode_code].join('::')
            return this.getIsWatched(key)
        }
    },
    computed: {
        ...mapGetters(['getState', 'getIsWatched', 'getCurrentTitle'])        
    }
}
</script>

<style scoped>
.links-download{
  position: relative;
}
.links-download-links{
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: -300px;
  background-color: var(--color-white);
  padding: 5px;
}
.media-title{
  font-size: 22px;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  cursor: pointer;
}
.media-link-group{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.media-link-title{
  font-size: 18px;
}
.media-link-qualities{
  display: flex;
}
.media-link-qualities > span{
  font-size: 12px;
}
.media-link-qualities > span:not(:first-of-type):before{
  content: ", ";
}
.icon.watched > svg{
  fill: #8b8b8b;
}
</style>