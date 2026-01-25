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
@import '../styles/mixins.scss';

.hero-title {
    grid-column: span 12;
    margin-bottom: 40px;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    line-height: 1.25;
}

.artist-cards {
    @include grid(8);
    grid-column: 3 / span 8;
    align-content: stretch;
}
</style>
