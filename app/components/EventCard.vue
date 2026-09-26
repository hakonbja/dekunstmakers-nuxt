<template>
    <NuxtLink :to="`/tentoonstellingen/${event.slug}`" class="event-card">
        <component :is="`h${headingLevel}`" class="event-card__title h5">{{ event.title }}</component>
        <p class="event-card__meta">{{ formatEventDateRange(event) }}</p>
        <p class="event-card__meta">{{ event.location }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Event } from '~~/types/Event'
import { formatEventDateRange } from '~~/utils/eventRepository'

withDefaults(defineProps<{
    event: Event;
    headingLevel?: 3 | 4 | 5 | 6;
}>(), {
    headingLevel: 3,
});
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
