<template>
  <div>
    <h1>Collectie</h1>
    <h2></h2>
    <div v-for="year in Object.keys(artPiecesByYear)" :key="year">
      <h3>{{ year }}</h3>
      <div v-for="piece in artPiecesByYear[year]" :key="piece.id">
        <img v-if="piece.images" :src="getStrapiImageUrl(piece.images)" :alt="piece.images?.alternativeText || ''" />
      </div>
    </div>
    <pre>{{ artPiecesByYear }}</pre>
    <pre>{{ artist }}</pre>
  </div>
</template>

<script setup lang="ts">
  import { getStrapiImageUrl } from '~~/utils/strapi'
import { ArtistRepository } from '~~/utils/artistRepository'

  const route = useRoute()
  const artist = await new ArtistRepository().getBySlug(route.params.artist as string)

  const artPiecesByYear = computed(() => {
    return artist.art_pieces?.reduce((acc: Record<string, any[]>, piece) => {
      const year = piece.date.split('-')[0];

      if (!acc[year]) {
        acc[year] = []
      }

      acc[year].push(piece)

      return acc
    }, {} as Record<string, any[]>)
  })
</script>
