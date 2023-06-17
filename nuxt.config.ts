// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@pinia/nuxt', '@unlazy/nuxt', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css', '@egjs/vue3-flicking/dist/flicking.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  build: {
    transpile: [
      '@headlessui/vue',
      '@headlessui/tailwindcss',
      '@vuepic/vue-datepicker'
    ]
  },
  unlazy: {
    ssr: false
  },
  runtimeConfig: {
    public: {
      HOST_URL: process.env.HOST_URL,
      PAY_URL: process.env.NEWEB_PAY_URL
    },
    newebMerchantId: process.env.NEWEB_MERCHANT_ID,
    newebHashKey: process.env.NEWEB_HASH_KEY,
    newebHashIV: process.env.NEWEB_HASH_IV
  }
})
