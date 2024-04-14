// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-vuefire',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@stefanobartoletti/nuxt-social-share',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-icon',
    'nuxt-primevue',
  ],
  pages: true,
  tailwindcss: {
    editorSupport: true,
  },
  eslint: {
    config: { stylistic: true },
  },
  primevue: {
    directives: {
      include: ['FocusTrap'],
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  css: ['primevue/resources/themes/aura-light-green/theme.css'],
  vuefire: {
    auth: { enabled: true },
    config: {
      apiKey: 'AIzaSyAvTFnFWFKpXmF0SLIkMNbHHZtudxkz0Zg',
      authDomain: 'grocery-share-d71c3.firebaseapp.com',
      projectId: 'grocery-share-d71c3',
      storageBucket: 'grocery-share-d71c3.appspot.com',
      messagingSenderId: '1006595755188',
      appId: '1:1006595755188:web:be084aeb82b721e6fcdbe1',
      measurementId: 'G-BSRD1BDWMV',
    },
  },
  pwa: {
    manifest: {
      name: 'Grocery Share',
      short_name: 'Grocery Share',
      description: 'Grocery Share is a platform for sharing lists with anyone!',
      lang: 'en',
      theme_color: '#4DBA87',
      background_color: '#4DBA87',
      display: 'standalone',
      icons: [
        {
          src: 'public/images/icons/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'public/images/icons/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'public/images/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'public/images/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },
})
