<template>
    <div class="artist-details">
        <PageHeading
            :title="artist.firstName + ' ' + artist.lastName"
            :subtitle="artist.title"
        />
        <div class="artist-details__content">
            <img v-if="coverImageUrl" class="artist-details__cover-image" :src="coverImageUrl" :alt="artist.biographyImage.alternativeText" />
            <div class="artist-details__bio" v-html="formattedBiography"></div>
        </div>
        <NuxtLink :to="`/${artist.slug}/collectie`" class="artist-details__button button">Collectie bekijken</NuxtLink>
    </div>
</template>

<script setup lang="ts">
    import { useArtistBySlug } from '~~/utils/artistRepository'
    import { getStrapiImageUrl } from '~~/utils/strapi'
    import { markdownToHtml } from '~~/utils/markdownFormatter'

    const route = useRoute()
    const artist = await useArtistBySlug(route.params.artist as string)

    const coverImageUrl = computed(() => getStrapiImageUrl(artist.biographyImage))
    const formattedBiography = computed(() => markdownToHtml(artist.biography));
</script>

<style lang="scss">
@use '../../styles/mixins/media-query';

.artist-details {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;

    &__cover-image {
        width: 100%;
        margin-bottom: 16px;

        @include media-query.up(md) {
            width: calc(50% - var(--grid-column-gap) / 2);
            margin-left: var(--grid-column-gap);
            margin-bottom: 8px;
            float: right;
        }
    }
    
    &__bio {
        margin-bottom: 24px;

        h1, h2, h3, h4, h5, h6 {
            font-size: var(--font-size-h5);
            margin-block: 12px 8px;
        }

        p + p {
            margin-top: 8px;

            @include media-query.up(md) {
                margin-top: 12px;
            }
        }
    }

    &__button {
        align-self: stretch;

        @include media-query.up(sm) {
            align-self: flex-start;
        }
    }
}
</style>
