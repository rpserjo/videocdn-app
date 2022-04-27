<template>
    <transition name="scale" mode="in-out">
        <div v-if="getState('showPlayer')" class="player-mask" @click="closePlayer">
          <div class="player-wrapper">
            <div>
              <video id="video" controls autoplay="true" @click.stop @ended="videoEnded" @timeupdate="timeUpdate($event)">
                <source :src="getState('playerVideoSrc')" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
      ...mapGetters(['getCurrentCode', 'getState'])
    },
    methods : {
      ...mapMutations(['pushWatchHistory', 'setState']),
      ...mapActions(['playNextVideo']),
      closePlayer : function(){
        this.setState({showPlayer: false})

      },
      videoEnded : function(){
        if(this.getState('type', 'current') == 'tv') this.playNextVideo()
      },
      timeUpdate : function(event){
        let current = event.target.currentTime
        let duration = event.target.duration
        let progress = Math.floor((current/duration)*100)
        if(progress > 90){
          this.pushWatchHistory(this.getCurrentCode)
        }
      }
    }
}
</script>

<style scoped>
.player-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.player-wrapper {
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
#video{
  max-width: 90vw; 
  max-height: 90vh; 
  margin: 0 auto;
}
</style>