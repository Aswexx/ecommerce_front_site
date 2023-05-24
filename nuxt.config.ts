// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@pinia/nuxt', '@unlazy/nuxt'],
  css: ['~/assets/css/main.css', '@egjs/vue3-flicking/dist/flicking.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  build: {
    transpile: ['@headlessui/vue', '@headlessui/tailwindcss']
  },
  unlazy: {
    ssr: false
  }
})
