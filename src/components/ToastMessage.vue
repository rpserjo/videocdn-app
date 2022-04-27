<template>
    <transition name="slide-down" mode="in-out">
        <div id="toast" v-if="getState('show', 'toastMessage')">{{getState('message', 'toastMessage')}}</div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'toast-message',
    computed: {
        ...mapGetters(['getState'])
    }
}
</script>

<style scoped>
#toast{
  background-color: #ffe69c; 
  position: fixed; 
  width: 300px; 
  border: 1px solid #ffc107; 
  border-radius: 5px; 
  margin-left: -150px; 
  left: 50%; 
  bottom: 30px; 
  padding: 10px; 
  text-align: center;
  z-index: 30;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s cubic-bezier(0.2, 0.85, 0.32, 1.2);
}
</style>