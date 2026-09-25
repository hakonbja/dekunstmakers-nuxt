<template>
    <PageHeading
        :title="event.title"
        :subtitle="formatEventDateRange(event)"
    />
    <div class="event-details">
        <p class="event-details__location"><span class="event-details__meta-label">Locatie:</span> {{ event.location }}</p>
        <div class="event-details__description" v-html="formattedDescription"></div>
        <a v-if="event.website" :href="event.website" target="_blank" rel="noopener noreferrer" class="event-details__website button button--secondary">Meer informatie</a>
    </div>

    <div class="event-art-pieces" v-if="sortedArtPieces.length > 0">
        <div class="hr my-8"></div>
        <div class="event-art-pieces__grid">
            <div v-for="piece in sortedArtPieces" :key="piece.id" class="event-art-pieces__item">
                <NuxtLink v-if="piece.artist && pieceImageUrl(piece)" :to="`/${piece.artist.slug}/${piece.slug}`" class="event-art-pieces__link">
                    <img class="event-art-pieces__image" :src="pieceImageUrl(piece)" :alt="piece.images[0]?.alternativeText || ''" />
                    <p class="event-art-pieces__artist-name">{{ piece.artist.firstName }} {{ piece.artist.lastName }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventBySlug, formatEventDateRange } from '~~/utils/eventRepository'
import { getStrapiImageUrl } from '~~/utils/strapi'
import { markdownToHtml } from '~~/utils/markdownFormatter'
import type { ArtPiece } from '~~/types/ArtPiece'

const route = useRoute()
const event = await useEventBySlug(route.params.slug as string)
const formattedDescription = computed(() => markdownToHtml(event.description))

const sortedArtPieces = computed(() => {
    return [...(event.art_pieces || [])].sort((a, b) => {
        const dateA = a.date || ''
        const dateB = b.date || ''
        return dateB.localeCompare(dateA)
    })
})

const pieceImageUrl = (piece: ArtPiece): string | undefined => {
    const url = getStrapiImageUrl(piece.images?.[0], 'small')
    return url ?? undefined
}
</script>

<style lang="scss" scoped>
@use '../../styles/mixins/media-query';
@use '../../styles/mixins/focus';
@use '../../styles/mixins/hover-effect';

.event-details {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    &__meta-label {
        color: var(--color-gray);
    }

    &__description :deep(p + p) {
        margin-top: 8px;

        @include media-query.up(md) {
            margin-top: 12px;
        }
    }

    &__website {
        align-self: stretch;

        @include media-query.up(sm) {
            align-self: flex-start;
        }
    }
}

.event-art-pieces {
    grid-column: 1 / -1;

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
        column-gap: var(--grid-column-gap);
        row-gap: var(--grid-column-gap);
    }

    &__link {
        @include focus.image();
        @include hover-effect.image();
        display: block;
    }

    &__image {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }

    &__artist-name {
        margin-top: 8px;
        color: var(--color-gray);
    }
}
</style>
