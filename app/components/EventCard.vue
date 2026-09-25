<template>
    <NuxtLink :to="`/tentoonstellingen/${event.slug}`" class="event-card">
        <h3 class="event-card__title h5">{{ event.title }}</h3>
        <p class="event-card__meta">{{ formatEventDateRange(event) }}</p>
        <p class="event-card__meta">{{ event.location }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Event } from '~~/types/Event'
import { formatEventDateRange } from '~~/utils/eventRepository'

defineProps<{
    event: Event;
}>();
</script>

<style lang="scss" scoped>
.event-card {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    padding: 12px 16px;
    border: 1px solid var(--color-accent);
    text-decoration: none;
    color: var(--color-text);
    transition: border-color 0.2s ease;

    &:hover {
        border-color: var(--color-cta);
    }

    &__title {
        color: var(--color-text);
    }

    &__meta {
        color: var(--color-gray);
    }
}
</style>
