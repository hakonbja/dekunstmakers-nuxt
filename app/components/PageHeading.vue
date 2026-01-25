<template>
    <div class="page-heading">
        <h1>{{ title }}</h1>
        <h2 class="page-heading__subtitle">{{ subtitle }}</h2>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    subtitle: string;
}>();
</script>

<style lang="scss" scoped>
@use '../styles/mixins/media-query';

.page-heading {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    margin-block: 12px 20px;

    @include media-query.up(sm) {
        row-gap: 12px;
        margin-block: 28px 20px;
    }

    &__subtitle {
        color: var(--color-accent-dark);
    }

}
</style>
