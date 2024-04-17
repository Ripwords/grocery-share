<script lang="ts" setup>
await useAuthWatcher()
</script>

<template>
  <div>
    <UtilitySEO />
    <Toast />
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
