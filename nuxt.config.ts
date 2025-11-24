import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  modules: ['@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],
  routeRules: {
    '/api/**': { proxy: 'http://edu-manage.us-east-2.elasticbeanstalk.com/api/**'}
  }
})