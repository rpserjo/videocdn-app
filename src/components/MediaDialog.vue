<template>
  <transition name="scale" mode="in-out">
    <div v-if="getState('show', 'mediaDialog')" class="media-dialog-wrapper" @click="setMediaDialog({show: false})">
      <div id="media-dialog"           
        :style="'top: ' + getState('position', 'mediaDialog').y + 'px; left: ' + getState('position', 'mediaDialog').x + 'px;'"
        :class="{'absolute' : !getState('isMobile')}"
        @click.stop
      >
        <h3>
          <my-icon v-if="$store.state.watchOnline" :w="36" :h="36" icon="play" class="logo"/>
          <my-icon v-else :w="36" :h="36" icon="download" class="logo"/>
          {{getState('title', 'mediaDialog')}}
        </h3>
        <div v-for="(source, key) in getState('sources', 'mediaDialog')" :key="key" class="media-dialog-element">
          <a v-if="getState('watchOnline')" @click="openPlayer(source, key)" class="media-dialog-element play">{{key}}p</a>
          <a v-else :href="source" @click="downloadClick" class="media-dialog-element download">{{key}}p</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'media-dialog',
  computed: {
    ...mapGetters(['getCurrentCode', 'getState']),
  },
  methods: {
    ...mapMutations(['pushWatchHistory', 'setCurrent', 'setMediaDialog']),
    ...mapActions(['playVideo']),
    openPlayer: function(source, quality){
        this.setMediaDialog({show: false})
        this.playVideo({src: source, quality: quality})
    },
    downloadClick: function(){
      this.setMediaDialog({show: false})        
      this.pushWatchHistory(this.getCurrentCode)
    }
  }    
}
</script>

<style scoped>
.media-dialog-wrapper{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(3px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
#media-dialog{
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  width: 300px;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
}
#media-dialog.absolute{
  position: absolute;
}
#media-dialog > h3{
  padding: 5px;
  border-bottom: 1px solid var(--color-gray);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.media-dialog-element{
  margin: 5px;
}
a.media-dialog-element{
  display: block;
  text-align: center;
  padding: 10px 5px;
  background-color: var(--color-blue);
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
}
</style>