<template>
    <div class="artist-card">
        <NuxtLink :to="`/${artist.slug}/collectie`" class="artist-card__main-link">
            <img v-if="coverImageUrl" class="artist-card__cover-image" :src="coverImageUrl" :alt="artist.coverImage?.alternativeText" />
        </NuxtLink>
        <div class="artist-card__bordered">
            <NuxtLink :to="`/${artist.slug}/collectie`" class="artist-card__content">
                <h2 class="artist-card__name h4">{{ artist.firstName }} {{ artist.lastName }}</h2>
                <p class="artist-card__title">{{ artist.title }}</p>
                <p class="artist-card__intro">{{ artist.intro }}</p>
            </NuxtLink>
            <div class="artist-card__buttons">
                <NuxtLink :to="`/${artist.slug}/collectie`" class="button"><span class="button__text">Collectie bekijken</span></NuxtLink>
                <NuxtLink :to="`/${artist.slug}`" class="button button--secondary">Over {{artist.firstName}}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Artist } from '~~/types/Artist';
import { getStrapiImageUrl } from '~~/utils/strapi';

const props = defineProps<{
    artist: Artist;
}>();

const coverImageUrl = computed(() => getStrapiImageUrl(props.artist.coverImage, 'small'));
</script>

<style lang="scss" scoped>
@use '../styles/mixins/media-query';

.artist-card {
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include media-query.up(md) {
        grid-column: span 6;
    }

    &__main-link {
        display: block;
        text-decoration: none;
        color: inherit;
    }

    &__cover-image {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }

    &__bordered {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 12px 16px;
        border: 1px solid var(--color-accent);
    }

    &__content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        text-decoration: none;
        color: inherit;
    }

    &__title {
        margin-bottom: 8px;
        color: var(--color-gray);
    }

    &__intro {
        margin-bottom: 20px;
    }

    &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 8px;
    }
}
</style>
