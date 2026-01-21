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
body {
  display: flex;
  flex-direction: column;
  margin: unset;
}

main {
  flex-grow: 1;
}
</style>
