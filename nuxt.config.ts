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
    exposeConfig: true,
  },
  primevue: {
    directives: {
      include: ['FocusTrap'],
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  css: ['primevue/resources/themes/aura-light-green/theme.css', 'primeicons/primeicons.css'],
  vuefire: {
    auth: { enabled: true, persistence: ["browserLocal", "inMemory", "indexedDBLocal", "browserSession"] },
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
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/"
    },
    base: '/',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    manifest: {
      name: 'Grocery Share',
      short_name: 'Grocery Share',
      description: 'Grocery Share is a platform for sharing lists with anyone!',
      lang: 'en',
      theme_color: '#b9bba5',
      background_color: '#b9bba5',
      display: 'standalone',
      icons: [
        {
          src: 'img/icons/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'img/icons/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'img/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'img/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },
})
