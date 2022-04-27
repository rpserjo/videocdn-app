<template>
    <div class="switch-container">
        <input type="checkbox" :name="name" :id="name" :checked="modelValue" class="switch-toggle-button" @change="updateValue">
        <label :for="name" class="switch-text">{{label}}</label>
    </div>
</template>

<script>
export default {
    name : 'my-switch',
    props : ['modelValue', 'name', 'label'],
    methods : {
        updateValue : function(event){
            this.$emit('update:modelValue', event.target.checked)
        }
    }
}
</script>


<style scoped>
    .switch-container{
        display: flex;
        align-items: center;
    }
    .switch-text{
        cursor: pointer;
        margin-left: 5px;
        font-size: 24px;
    }
    .switch-toggle-button{
        position: relative;
        min-width: 50px;
        width: 50px;
        height: 30px;
        margin: 0;
        background-color: var(--color-gray);
        border: 1px solid var(--color-gray);
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        transition: all .3s cubic-bezier(0.2, 0.85, 0.35, 1.2);
    }
    .switch-toggle-button::after{
        content: "";
        position: absolute;
        left: 1px;
        top: 1px;
        width: 26px;
        height: 26px;
        background-color: var(--color-white);
        border-radius: 3px;
        transform: translateX(0);
        transition: all .3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    .switch-toggle-button:checked::after{
        transform: translateX(calc(100% - 6px));
        background-color: var(--color-white);
    }
    .switch-toggle-button:checked{
        background-color: var(--color-blue);
        border-color: var(--color-blue);
    }
</style>