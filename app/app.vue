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
@import './styles/mixins.scss';

:root {
    --color-white: #FAFAF8;
    --color-green: #5A766F;
    --color-black: #333333;
    --color-gray: #777777;
    --color-beige: #E8E2D8;
    --color-beige-dark: #CCBFA8;

    --color-text: var(--color-black);
    --color-text-muted: var(--color-gray);
    --color-background: var(--color-white);
    --color-cta: var(--color-green);
    --color-accent: var(--color-beige);
    --color-accent-dark: var(--color-beige-dark);
    --color-on-cta: var(--color-white);

    --font-sans: 'Inter', sans-serif;
    --font-serif: 'Playfair Display', serif;
}

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
  @include grid(12);
  flex-grow: 1;
  align-content: start;
  width: min(calc(100vw - 64px), 1224px);
  padding-block: 40px;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    font-weight: 700;
    line-height: 1.1;
}

h1,
.h1 {
    font-size: 48px;
}

h2,
.h2 {
    font-size: 40px;
}

h3,
.h3 {
    font-size: 32px;
}

h4,
.h4 {
    font-size: 28px;
}

h5,
.h5 {
    font-size: 24px;
}

h6,
.h6 {
    font-size: 20px;
}

p, .paragraph {
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
    display: inline-block;
    padding: 8px 12px;
    color: var(--color-on-cta);
    background-color: var(--color-cta);
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    text-decoration: none;
    border: 2px solid var(--color-cta);
    
    &--secondary {
        color: var(--color-cta);
        background-color: var(--color-white);
        border-color: var(--color-cta);
    }
    
    &--tertiary {
        position: relative;
        padding-inline: 0;
        color: var(--color-cta);
        background-color: transparent;
        border: none;
    
        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 8px;
            height: 1px;
            background-color: var(--color-cta);
        }
    }
}
</style>
