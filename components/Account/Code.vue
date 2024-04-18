<script lang="ts" setup>
const props = defineProps<{
  approved: boolean
}>()
</script>

<template>
  <LazyCard class="w-[95%] overflow-hidden">
    <template #title>
      <div class="flex items-center text-lg font-semibold">
        Code
        <LazyBadge
          v-if="props.approved"
          class="ml-1"
          severity="info"
          >Awaiting Approval</LazyBadge
        >
      </div>
    </template>

    <template #content>
      <slot />
    </template>
  </LazyCard>
</template>
