<template>
    <NuxtRouteAnnouncer />
    <PageHeader />
    <main>
        <NuxtPage />
    </main>
    <PageFooter />
</template>

<script setup lang="ts">
    import PageHeader from './components/PageHeader.vue'
    import PageFooter from './components/PageFooter.vue'
</script>

<style lang="scss">
    @use './styles/reset.css';
    @use './styles/root-vars';
    @use './styles/mixins/display';
    @use './styles/mixins/media-query';
    @use './styles/components/button';
    @use './styles/typography';

    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: unset;
        height: 100vh;
        font-family: var(--font-sans);
        color: var(--color-text);
        background-color: var(--color-background);
    }

    main {
        @include display.grid(12);
        flex-grow: 1;
        align-content: start;
        width: min(calc(100vw - var(--container-padding) * 2), 1224px);
        padding-block: 12px 16px;
        
        @include media-query.up(sm) {
            padding-block: 40px;
        }
    }
</style>
