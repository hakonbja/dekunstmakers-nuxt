<template>
    <h1 class="hero-title">Ontdek de kunst van<br>Erik Blok en Marja Schaefers</h1>
    <div v-if="artists && artists.length > 0" class="artist-cards">
        <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>
</template>

<script setup lang="ts">
import { useArtists } from '~~/utils/artistRepository'

const { data: artists } = await useArtists()
</script>

<style lang="scss" scoped>
@use '../styles/mixins/display';
@use '../styles/mixins/media-query';

.hero-title {
    grid-column: span 12;
    margin-block: 12px 28px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    line-height: 1.25;
    
    @include media-query.up(sm) {
        margin-block: 40px;
        font-size: 40px;
    }
}

.artist-cards {
    @include display.grid(12);
    grid-column: span 12;
    row-gap: 32px;
    align-content: stretch;

    @include media-query.up(lg) {
        grid-column: 2 / -2;
    }
}
</style>
