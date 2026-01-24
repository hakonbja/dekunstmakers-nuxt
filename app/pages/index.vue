<template>
    <div>
        <h1>Home</h1>
        <div class="container">
            <h1>Artists</h1>
            <div v-if="pending">Loading artists...</div>
            <div v-else-if="error" class="error">
                Error loading artists: {{ error }}
                <pre v-if="error">{{ JSON.stringify(error, null, 2) }}</pre>
            </div>
            <div v-else-if="artists && artists.length > 0" class="artists-list">
                <div v-for="artist in artists" :key="artist.id" class="artist-card">
                    <h2>{{ artist.firstName }} {{ artist.lastName }}</h2>
                    <p><strong>Email:</strong> {{ artist.email }}</p>
                    <p><strong>Slug:</strong> {{ artist.slug }}</p>
                    <p v-if="artist.art_pieces && artist.art_pieces.length > 0">
                        <strong>Art Pieces:</strong> {{ artist.art_pieces.length }}
                    </p>
                    <NuxtLink :to="`/${artist.slug}`">View Artist</NuxtLink>
                </div>
            </div>
            <div v-else>
                No artists found.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArtists } from '~~/utils/artistRepository'

interface Artist {
    id: number
    firstName: string
    lastName: string
    email: string
    slug: string
    art_pieces?: any[]
}

const { data: artists, pending, error } = await useArtists()
</script>
