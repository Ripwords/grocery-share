<script lang="ts" setup>
const props = defineProps<{
  labels: string[]
  icons: string[]
}>()
</script>

<template>
  <div class="items-center w-full">
    <div
      v-for="(label, index) in props.labels"
      :key="label"
      class="flex items-center"
    >
      <Icon :name="props.icons[index]" />
      <span class="overflow-hidden overflow-ellipsis whitespace-nowrap">
        &nbsp;: {{ label }}
      </span>
      <br />
    </div>
  </div>
</template>
