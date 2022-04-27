<template>
    <div class="media-card">
        <media-card/>
        <div 
            v-for="(translation) in getTranslations" 
            :key="translation.translation_id"
            class="media-card-translations" 
            @click="loadTranslation(translation.translation_id)"
        >
            <div><my-icon :w="36" :h="36" icon="folder"/></div>
            <div>{{translation.translation_title}}</div>
        </div>       
    </div>
</template>

<script>
import MediaCard from '@/components/MediaCardComponent'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: { MediaCard },
    computed: {
        ...mapGetters(['getTranslations'])
    },
    methods: {
        ...mapMutations(['setCurrent']),
        loadTranslation: function(translation_id) {
            this.setCurrent({layout: 'seasonsLayout', translation_id: translation_id})
        }
    }
}
</script>

<style scoped>
    .media-card-translations, .media-card-seasons{
        border-bottom: 1px solid var(--color-gray);
        padding: 3px 5px;
        font-size: 22px;
        cursor: pointer;
        display: flex;
        align-items: center;
        /*height: 24px;*/
    }
</style>