<template>
    <input type="checkbox" class="search-filter" :name="name" :value="value" :id="value" @change="updateValue" :checked="modelValue">
    <label :for="value" class="search-filter-label">{{label}}</label>
</template>

<script>
export default {
    name: 'my-filter',
    props : ['modelValue', 'name', 'value', 'label'],
    methods : {
        updateValue : function(event){
            this.$emit('update:modelValue', event.target.checked)
        }
    }
}
</script>

<style scoped>
    .search-filters{
        display: flex;
        padding: 5px 10px;
        max-width: 500px;
    }
    .search-filter{
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    .search-filter-label{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        height: 42px;
        border: 1px solid var(--color-gray);
        text-transform: uppercase;
        transition: all 0.5s cubic-bezier(0.2, 0.85, 0.32, 1.2);
        cursor: pointer;
    }
    .search-filter-label:first-of-type{
        border-radius: 5px 0px 0px 5px;
        border-right: 0px;
    }
    .search-filter-label:last-of-type{
        border-radius: 0px 5px 5px 0px;
        border-left: 0px;
    }
    .search-filter:checked + .search-filter-label{
        background-color: var(--color-blue);
        color: var(--color-white);
        border-color: var(--color-blue);
        font-weight: 700;
    }
    .search-filter:checked + .search-filter-label{
        box-shadow: 0px 1px 0px 1px var(--color-blue), 0px -1px 0px 1px var(--color-blue);
    }
    .search-filter:checked + .search-filter-label:first-of-type{
        box-shadow: -2px 0px 0px 2px var(--color-blue);
    }
    .search-filter:checked + .search-filter-label:last-of-type{
        box-shadow: 2px 0px 0px 2px var(--color-blue);
    }
</style>