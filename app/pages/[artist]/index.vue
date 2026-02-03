<template>
    <PageHeading
        :title="artist.firstName + ' ' + artist.lastName"
        :subtitle="artist.title"
    />
    <div class="artist-details">
        <div class="artist-details__content">
            <img v-if="bioImageUrl" class="artist-details__cover-image" :src="bioImageUrl" :alt="artist.biographyImage.alternativeText" />
            <div class="artist-details__bio" v-html="formattedBiography"></div>
        </div>
        <NuxtLink :to="`/${artist.slug}/collectie`" class="artist-details__button button"><span class="button__text">Collectie bekijken</span></NuxtLink>
    </div>

    <div class="hr my-8"></div>

    <div class="recent-art-pieces" v-if="lastArtPieces && lastArtPieces.length > 0">
        <div class="recent-art-pieces__grid">
            <div v-for="(piece, index) in lastArtPieces" :key="piece.id" class="recent-art-pieces__art-piece">
                <NuxtLink 
                    v-if="pieceImageUrl(piece)" 
                    :to="index === lastArtPieces.length - 1 ? `/${artist.slug}/collectie` : `/${artist.slug}/${piece.slug}`" 
                    class="recent-art-pieces__art-piece-link"
                    :class="{ 'recent-art-pieces__art-piece-link--last': index === lastArtPieces.length - 1 }"
                >
                    <img class="recent-art-pieces__art-piece-image" :src="pieceImageUrl(piece)" :alt="piece.images[0]?.alternativeText || ''" />
                    <div v-if="index === lastArtPieces.length - 1" class="recent-art-pieces__overlay">
                        <span class="recent-art-pieces__cta-text">Collectie bekijken</span>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
    import { useArtistBySlug } from '~~/utils/artistRepository'
    import { getStrapiImageUrl } from '~~/utils/strapi'
    import { markdownToHtml } from '~~/utils/markdownFormatter'

    const route = useRoute()
    const artist = await useArtistBySlug(route.params.artist as string)

    const bioImageUrl = computed(() => getStrapiImageUrl(artist.biographyImage))
    const formattedBiography = computed(() => markdownToHtml(artist.biography));

    const artPieces = computed(() => artist.art_pieces || [])

    const pieceImageUrl = (piece: any): string | undefined => {
        let images = piece.images || piece.image || piece.photo || piece.picture || 
                     piece.media || piece.thumbnail || piece.cover ||
                     piece.data?.attributes?.images || piece.data?.attributes?.image
        
        if (Array.isArray(images)) {
            images = images[0]
        }
        
        if (images?.data?.attributes) {
            images = images.data.attributes
        }
        
        if (!images) return undefined
        
        const url = getStrapiImageUrl(images, 'small')
        return url ?? undefined
    }

    const lastArtPieces = computed(() => {
        if (!artPieces.value || artPieces.value.length === 0) return []
        
        return [...artPieces.value]
            .sort((a, b) => {
                const dateA = a.date || ''
                const dateB = b.date || ''
                return dateB.localeCompare(dateA)
            })
            .slice(0, 4)
    })
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

.recent-art-pieces {
    grid-column: 1 / -1;

    &__grid {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(275px, 1fr) );
        column-gap: var(--grid-column-gap);
        row-gap: var(--grid-column-gap);
    }

    &__art-piece {
        grid-column: span 1;
    }

    &__art-piece-link {
        height: auto;
        display: block;
        line-height: 0;
        position: relative;

        &--last {
            overflow: hidden;
        }
    }

    &__art-piece-image {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }

    &__overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50%;
        background: linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-cta) 70%, transparent) 60%);
    }

    &__cta-text {
        color: var(--color-on-cta);
        line-height: 1.6;
        font-size: 24px;
        font-family: var(--font-serif);
        font-weight: 700;
        line-height: 1.1;
    }
}
</style>
