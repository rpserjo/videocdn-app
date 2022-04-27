<template>
  <div class="header">
    <div class="wrap">
      <div class="header-line">
        <div class="search-bar">
          <transition name="scale2" mode="out-in">
            <my-icon v-if="getState('layout', 'current') == 'indexLayout'" w="42" h="42" icon="tv" class="logo" />
            <my-icon v-else w="42" h="42" icon="arrow-back" class="pointer" @click="setLayout('indexLayout')" />
          </transition>
          <input
            type="text"
            ref="search"
            :value="searchQuery"
            placeholder="Кино, сериал, ТВ-шоу"
            class="my-search-input"
            v-on:keyup.enter="$emit('search', $event)"
            @input="updateInput"
          />
          <my-icon 
            w="42" h="42" icon="tune" class="pointer" 
            :class="{'logo' : showTunes}" 
            @click="updateTunes" 
          />
        </div>
        <my-icon 
          w="42" 
          h="42" 
          icon="bookmark" 
          class="pointer" 
          :class="{'logo' : getState('layout', 'current') == 'bookmarksLayout'}" 
          @click="setLayout('bookmarksLayout')"
        />
        <my-switch v-if="(windowWidth > 790)"
          name="toggle" 
          v-model="switchValue" 
          label="Смотреть онлайн"
        />
        <div v-else>
          <transition name="scale" mode="out-in">
            <my-icon 
              v-if="watchOnline" 
              w="42" h="42" icon="play" 
              class="logo pointer" 
              @click="$emit('update:watchOnline', !watchOnline)"
            />
            <my-icon 
              v-else 
              w="42" h="42" icon="download" class="logo pointer" 
              @click="$emit('update:watchOnline', !watchOnline)"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'my-header',
  emits: ['search', 'update:showTunes', 'update:searchQuery', 'update:watchOnline'],
  props: ['searchQuery', 'showTunes', 'watchOnline', 'windowWidth'],      
  computed: {
    ...mapGetters(['getState']),
  },
  data(){
    return {
      switchValue: this.watchOnline
    }
  },
  methods: {
    ...mapMutations(['setLayout']),
    updateInput: function (event) {
      this.$emit('update:searchQuery', event.target.value)
    },
    updateTunes: function(){
      this.$emit('update:showTunes', !this.showTunes)
    },
  },
  updated() {
    this.switchValue = this.watchOnline
  },      
  watch: {
    switchValue(newValue){
      this.$emit('update:watchOnline', newValue)
    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 2px solid var(--color-gray);
}
.header-line{
  min-height: 50px;
  max-height: 50px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 5px;
}
.search-bar{
  display: flex;
  align-items: center;
  flex-grow: 1;
  border: 1px solid var(--color-gray);
  background-color: var(--color-lightgray);
  border-radius: 20px;
  margin-right: 5px;
  padding: 0px 5px;
}
input[type=text].my-search-input{
  display: flex;
  flex-grow: 1;
  color: var(--color-dark);
  border: 0px;
  outline: none;
  margin: 0px 5px 0px 5px;
  height: 42px;
  background-color: var(--color-lightgray);
  font-size: 30px;
  width: 100%;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
}
.scale-enter-from,
.scale-leave-to {
  -webkit-transform: scale(0);
  transform: scale(0);
}
/*[SCALE2]*/
.scale2-enter-active,
.scale2-leave-active {
  transition: all 0.3s ease;
}
.scale2-enter-from,
.scale2-leave-to {
  -webkit-transform: scale(0);
  transform: rotate3d(1, 1, 0, 90deg);
}
</style>
