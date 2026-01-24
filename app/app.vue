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

<style>
:root {
    --color-text: #333333;
    --color-text-muted: #777777;
    --color-background: #FAFAF8;
    --color-cta: #5A766F;
    --color-accent: #E8E2D8;
    --color-accent-dark: #CCBFA8;

    --font-sans: 'Inter', sans-serif;
    --font-serif: 'Playfair Display', serif;
}

body {
  display: flex;
  flex-direction: column;
  margin: unset;
  font-family: var(--font-sans);
}

main {
  flex-grow: 1;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    line-height: 1.1;
}

h1 {
    font-size: 48px;
}

h2 {
    font-size: 40px;
}

h3 {
    font-size: 32px;
}

h4 {
    font-size: 28px;
}

h5 {
    font-size: 24px;
}

h6 {
    font-size: 20px;
}

p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.25;
}

p.light {
    font-weight: 300;
}

.small {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
}

.button {
    font-size: 16px;
    line-height: 1.6;
}
</style>
