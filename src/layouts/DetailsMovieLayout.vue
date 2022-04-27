<template>
    <div class="media-card">
        <media-card />
        <div v-for="(translation, key) in getTranslations" :key="key" class="media-element">
            <media-links :translation="translation"/>
        </div>
    </div>
</template>

<script>
import MediaCard from '@/components/MediaCardComponent'
import MediaLinks from '@/components/MediaLinks'
import { mapGetters } from 'vuex'
export default {
    name : 'detailsMovieLayout',
    components: {MediaCard, MediaLinks},
    computed: {
        ...mapGetters(['getTranslations'])
    }
}
</script>

<style scoped>
    .media-element{
        border-bottom: 1px solid var(--color-gray);
        padding: 3px 5px;
        margin-top: -1px;
    }
</style>