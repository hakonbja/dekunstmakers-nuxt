// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootTag: 'body',
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    prerender: {
      crawlLinks: true, // Automatically discover and pre-render all linked pages
    },
  },

  runtimeConfig: {
    strapiApiToken: process.env.STRAPI_API_TOKEN,
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    },
  },

  modules: ['@nuxtjs/strapi'],
})