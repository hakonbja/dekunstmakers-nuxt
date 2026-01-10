<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="container">
      <h1>Artists</h1>
      <div v-if="pending">Loading artists...</div>
      <div v-else-if="error" class="error">
        Error loading artists: {{ error }}
      </div>
      <div v-else-if="artists && artists.length > 0" class="artists-list">
        <div v-for="artist in artists" :key="artist.id" class="artist-card">
          <h2>{{ artist.firstName }} {{ artist.lastName }}</h2>
          <p><strong>Email:</strong> {{ artist.email }}</p>
          <p><strong>Slug:</strong> {{ artist.slug }}</p>
          <p v-if="artist.art_pieces && artist.art_pieces.length > 0">
            <strong>Art Pieces:</strong> {{ artist.art_pieces.length }}
          </p>
        </div>
      </div>
      <div v-else>
        No artists found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchStrapi } from '../utils/strapi'

interface Artist {
  id: number
  firstName: string
  lastName: string
  email: string
  slug: string
  art_pieces?: any[]
}

interface StrapiResponse {
  data: Artist[]
  meta?: any
}

const { data: artists, pending, error } = await useAsyncData<Artist[]>(
  'artists',
  async () => {
    const response = await fetchStrapi<StrapiResponse>('/artists?populate=*')
    return response.data || []
  }
)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
}

.artists-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.artist-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f9f9f9;
}

.artist-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.artist-card p {
  margin: 0.5rem 0;
  color: #666;
}

.error {
  color: red;
  padding: 1rem;
  background: #ffe6e6;
  border-radius: 4px;
}
</style>
