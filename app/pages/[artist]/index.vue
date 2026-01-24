<template>
    <div>
      <h1>{{ artist.firstName }} {{ artist.lastName }}</h1>
      <h2>{{ artist.title }}</h2>
      <img v-if="coverImageUrl" :src="coverImageUrl" :alt="artist.biographyImage.alternativeText" />
      <NuxtLink :to="`/${artist.slug}/collectie`">Collectie bekijken</NuxtLink>
      <pre>{{ artist }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ArtistRepository } from '~~/utils/artistRepository'
    import { getStrapiImageUrl } from '~~/utils/strapi'
  
    const route = useRoute()
    const artist = await new ArtistRepository().getBySlug(route.params.artist as string)
    
    const coverImageUrl = computed(() => getStrapiImageUrl(artist.biographyImage))
  </script>
  