<template>
    <PageHeading
        title="Collectie"
        :subtitle="artist.firstName + ' ' + artist.lastName"
    />
    <div class="collection">
        <div class="collection__content" v-if="artPieces && artPieces.length > 0">
            <div v-for="{ year, pieces } in artPiecesByYear" :key="year" class="collection__year">
                <div class="collection__year-label-container">
                    <h3 :id="year" class="collection__year-label h4">{{ year }}</h3>
                </div>
                <div class="collection__year-pieces">
                    <div v-for="piece in pieces" :key="piece.id" :id="piece.slug" class="collection__art-piece">
                        <NuxtLink v-if="pieceImageUrl(piece)" :to="`/${artist.slug}/${piece.slug}`" class="collection__art-piece-link">
                            <img class="collection__art-piece-image" :src="pieceImageUrl(piece)" :alt="(piece.images || piece.image)?.alternativeText || ''" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { getStrapiImageUrl } from '~~/utils/strapi'
    import { useArtistBySlug } from '~~/utils/artistRepository'

    const route = useRoute()
    const artist = await useArtistBySlug(route.params.artist as string)
    
    // Use art_pieces from artist data (already populated with images)
    const artPieces = computed(() => artist.art_pieces || [])

    const pieceImageUrl = (piece: any): string | undefined => {
        // Check all possible image field names
        let images = piece.images || piece.image || piece.photo || piece.picture || 
                     piece.media || piece.thumbnail || piece.cover ||
                     piece.data?.attributes?.images || piece.data?.attributes?.image
        
        // If images is an array, get the first one
        if (Array.isArray(images)) {
            images = images[0]
        }
        
        // If images is wrapped in data.attributes, unwrap it
        if (images?.data?.attributes) {
            images = images.data.attributes
        }
        
        if (!images) return undefined
        
        const url = getStrapiImageUrl(images)
        return url ?? undefined
    }

    const artPiecesByYear = computed((): Array<{ year: string; pieces: any[] }> => {
        if (!artPieces.value) return []
        
        const grouped = artPieces.value.reduce((acc: Record<string, any[]>, piece) => {
            const year = piece.date?.split('-')[0];

            if (!year) return acc

            if (!acc[year]) {
                acc[year] = []
            }

            acc[year].push(piece)

            return acc
        }, {} as Record<string, any[]>)
        
        return Object.entries(grouped)
            .map(([year, pieces]) => ({ 
                year, 
                pieces: pieces.sort((a, b) => {
                    const dateA = a.date || ''
                    const dateB = b.date || ''
                    return dateB.localeCompare(dateA)
                })
            }))
            .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    })
</script>

<style lang="scss" scoped>
@use '../../styles/mixins/display';
@use '../../styles/mixins/media-query';

.collection {
    grid-column: 1 / -1;

    &__content {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(275px, 1fr) );
        column-gap: var(--grid-column-gap);
        row-gap: var(--grid-column-gap);
    }

    &__year {
        position: relative;
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
    }

    &__year-label-container {
        position: sticky;
        top: 0;
    }

    &__year-label {
        width: min-content;
        padding-right: 8px;
        padding-bottom: 8px;
        color: var(--color-black);
        background-color: rgb(from var(--color-background) r g b / 65%);
    }

    @include media-query.up(lg) {
        &__year-label-container {
            position: absolute;
            height: 100%;
            left: -69px;
        }

        &__year-label {
            position: sticky;
            top: 0;
        }
    }
    
    &__year-pieces {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: subgrid;
        row-gap: var(--grid-column-gap);
    }

    &__art-piece {
        grid-column: span 1;
    }

    &__art-piece-link {
        height: auto;
        display: block;
        line-height: 0;
    }

    &__art-piece-image {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }
}
</style>
