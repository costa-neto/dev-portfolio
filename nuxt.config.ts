// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: {
        default: 'min-light',
        dark: 'min-dark',
      }
    }
  },
  colorMode: {
    classSuffix: ''
  },
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
})
