<template>
  <transition name="slide">
    <div v-if="showTunes" class="tunes">
      <div class="wrap">
        <strong class="tunes-label">Категории поиска</strong>
        <div class="search-filters">
          <my-filter v-for="type, key in searchTypes" :key="key" name="typesFilter" :value="type.key" :label="type.label" v-model="type.checked"></my-filter>
        </div>
        <div class="filter-input">
          <span class="input-label">Год выхода:</span>
          <input type="text" :value="yearFilter" maxlength="4" @input="updateYearFilter">
          <my-icon w="42" h="42" icon="search" class="logo pointer" @click="$emit('search', $event)"></my-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'tunes-component',
  emits: ['search', 'update:yearFilter'],
  props: ['searchTypes', 'showTunes', 'yearFilter'],      
  methods: {
    updateYearFilter: function(event){
      this.$emit('update:yearFilter', event.target.value)
    }      
  }
}
</script>

<style scoped>
  .slide-enter-from,
  .slide-leave-to{
    max-height: 0px;
  }
  .slide-enter-to,
  .slide-leave-from{
    max-height: 500px;
  }
  .slide-enter-active,
  .slide-leave-active{
    transition: max-height 0.25s ease;
  }
  strong.tunes-label{
    display: flex;
    padding: 5px 10px;
    color: #212529;
  }
  .tunes{
    position: fixed;
    top: 53px;
    left: 0;
    right: 0;
    border-bottom: 2px solid var(--color-gray);
    box-shadow: 0 3px 5px 1px rgba(206, 212, 218, 0.5);
    z-index: 19;
    background-color: var(--color-white);
  }
  .search-filters{
    display: flex;
    padding: 5px 10px;
    max-width: 500px;
  }

  .filter-input{
    padding: 5px 10px;
    display: flex;
    align-items: center;
  }
  .filter-input > .input-label{
    border: 1px solid var(--color-gray);
    height: 42px;
    display: flex;
    word-break: none;
    align-items: center;
    padding: 0px 5px;
    background-color: var(--color-lightgray);
    border-radius: 3px 0px 0px 3px;
  }
  .filter-input > input[type=text]{
    display: flex;
    height: 42px;
    font-size: 30px;
    width: 100px;
    border: 1px solid var(--color-gray);
    border-radius: 0px 3px 3px 0px;
    margin-left: -1px;
    padding-left: 15px;
  }
</style>
