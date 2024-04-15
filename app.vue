<script lang="ts" setup>
useAuthWatcher()
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
