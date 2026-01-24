<template>
  <div>
    <h1>Collectie</h1>
    <h2>{{ artist.firstName }} {{ artist.lastName }}</h2>
    <div v-if="artPieces && artPieces.length > 0">
      <div v-for="{ year, pieces } in artPiecesByYear" :key="year">
        <h3>{{ year }}</h3>
        <div v-for="piece in pieces" :key="piece.id">
          <img v-if="pieceImageUrl(piece)" :src="pieceImageUrl(piece)" :alt="(piece.images || piece.image)?.alternativeText || ''" />
        </div>
      </div>
    </div>
    <div v-else>
      No art pieces found.
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
      .map(([year, pieces]) => ({ year, pieces }))
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  })
</script>
