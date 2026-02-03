<template>
    <PageHeading
        :title="artPiece.title"
        :subtitle="artist.firstName + ' ' + artist.lastName"
    />
    <div class="art-piece-details">
        <div class="art-piece-details__image-container">
            <img 
                v-if="pieceImageUrl" 
                class="art-piece-details__image" 
                :src="pieceImageUrl" 
                :srcset="imageSrcset"
                :sizes="imageSizes"
                :alt="artPiece.images[0]?.alternativeText || ''" 
            />
        </div>

        <div class="art-piece-details__content">
            <div class="art-piece-details__meta">
                <p class="art-piece-details__description">{{ artPiece.description }}</p>
                <div class="hr"></div>
                <p v-if="artPiece.size" class="art-piece-details__size"><span class="art-piece-details__meta-label">Afmetingen:</span> {{ artPiece.size }}</p>
                <p v-if="artPiece.technology" class="art-piece-details__technology"><span class="art-piece-details__meta-label">Techniek:</span> {{ artPiece.technology }}</p>
                <p v-if="artPiece.date" class="art-piece-details__date"><span class="art-piece-details__meta-label">Datum:</span> <NuxtTime :datetime="artPiece.date" locale="nl-NL" /></p>
                <div class="art-piece-details__meta-buttons">
                    <a :href="`mailto:${artist.email}`" class="button button--primary">Contact opnemen</a>
                    <NuxtLink :to="`/${artist.slug}/collectie#${artPiece.slug}`" class="button button--secondary">Bekijk in collectie</NuxtLink>
                </div>
            </div>
            <div class="art-piece-details__navigation">
                <NuxtLink v-if="previousArtPiece" :to="previousArtPiece" class="button button--tertiary art-piece-details__navigation-button art-piece-details__navigation-button--previous">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M8.5 1L4 5.5L8.5 10" stroke="#121923" stroke-width="1.2"/>
                    </svg>
                    <span class="button__text">Vorige</span>
                </NuxtLink>
                <NuxtLink v-if="nextArtPiece" :to="nextArtPiece" class="button button--tertiary art-piece-details__navigation-button art-piece-details__navigation-button--next">
                    <span class="button__text">Volgende</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 1L8.5 5.5L4 10" stroke="#121923" stroke-width="1.2"/>
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArtistBySlug } from '~~/utils/artistRepository';
import { useArtPieceBySlug, getPreviousArtPiece, getNextArtPiece } from '~~/utils/artPieceRepository';
import { getStrapiImageUrl } from '~~/utils/strapi';

const route = useRoute();
const artist = await useArtistBySlug(route.params.artist as string);
const artPiece = await useArtPieceBySlug(artist, route.params.artPiece as string);
const pieceImageUrl = computed(() => getStrapiImageUrl(artPiece.images[0]));

const previousArtPiece = computed(() => {
    const previousArtPiece = getPreviousArtPiece(artist, artPiece.slug);
    return previousArtPiece ? `/${artist.slug}/${previousArtPiece.slug}` : null;
});
const nextArtPiece = computed(() => {
    const nextArtPiece = getNextArtPiece(artist, artPiece.slug);
    return nextArtPiece ? `/${artist.slug}/${nextArtPiece.slug}` : null;
});

const imageSrcset = computed(() => {
    if (!artPiece.images[0]?.formats) return '';

    const srcsetParts: string[] = [];
    const formats = artPiece.images[0].formats;

    if (formats.thumbnail) {
        const url = useStrapiMedia(formats.thumbnail.url);
        srcsetParts.push(`${url} ${formats.thumbnail.width}w`);
    }

    if (formats.small) {
        const url = useStrapiMedia(formats.small.url);
        srcsetParts.push(`${url} ${formats.small.width}w`);
    }

    if (formats.medium) {
        const url = useStrapiMedia(formats.medium.url);
        srcsetParts.push(`${url} ${formats.medium.width}w`);
    }

    if (formats.large) {
        const url = useStrapiMedia(formats.large.url);
        srcsetParts.push(`${url} ${formats.large.width}w`);
    }

    return srcsetParts.join(', ');
});

const imageSizes = computed(() => {
    return '(max-width: 575px) 100vw, (max-width: 767px) 100vw, (max-width: 991px) 100vw, (max-width: 1199px) 100vw, 1224px';
});

</script>

<style lang="scss" scoped>
@use '../../styles/mixins/display';
@use '../../styles/mixins/media-query';

.art-piece-details {
    @include display.grid(12);
    grid-column: 1 / -1;
    row-gap: 16px;

    &__image-container {
        grid-column: span 12;

        @include media-query.up(lg) {
            grid-column: span 7;
        }

        @include media-query.up(xl) {
            grid-column: span 8;
        }
    }

    &__image {
        width: 100%;
        height: auto;
    }

    &__content {
        grid-column: span 12;
        align-self: start;
        display: flex;
        flex-direction: column;
        row-gap: 16px;

        @include media-query.up(lg) {
            grid-column: span 5;
        }

        @include media-query.up(xl) {
            grid-column: span 4;
        }
    }

    &__meta {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        padding: 12px 16px;
        border: 1px solid var(--color-accent);
    }

    &__meta-label {
        color: var(--color-gray);
    }

    &__meta-buttons {
        display: flex;
        gap: 8px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__navigation {
        display: flex;
        justify-content: space-between;
    }

    &__navigation-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    &__navigation-button--previous {
        margin-right: auto;
    }

    &__navigation-button--next {
        margin-left: auto;
    }
}

</style>
