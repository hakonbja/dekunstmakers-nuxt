<template>
  <div>
    <h1>Artist</h1>
    {{ artist }}
  </div>
</template>

<script setup lang="ts">
  import { ArtistRepository } from '../../utils/artistRepository'

  const route = useRoute()
  const artist = await new ArtistRepository().getBySlug(route.params.artist as string)
</script>
