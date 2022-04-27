<template>
  <div id="spinner" v-show="showSpinner">
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'spinner-component',
  computed: {
    ...mapState(['showSpinner'])
  }
}
</script>

<style scoped>
  #spinner{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 10;
    overflow: hidden;
  }
  .spinner{
    height: 100px;
    width: 100px;
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    animation: rotate 2s linear infinite;
  }
  .spinner-path{
    stroke: var(--color-blue);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate{
    100%{
      transform: rotate(360deg);
    }
  }
  @keyframes dash{
    0%{
      stroke-dasharray:  1, 150;
      stroke-dashoffset: 0;
    }
    50%{
      stroke-dasharray:  90, 150;
      stroke-dashoffset: -35;
    }
    100%{
      stroke-dasharray:  90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>
