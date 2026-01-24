// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap' },
      ],
    },
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
    strapi: {
      token: process.env.STRAPI_API_TOKEN,
    },
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    },
  },

  modules: ['@nuxtjs/strapi'],

  strapi: {
    url: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    token: process.env.STRAPI_API_TOKEN,
    version: 'v4',
  },
})
