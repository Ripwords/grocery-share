<script lang="ts" setup>
const prop = defineProps<{
  label: string
}>()
const value = defineModel({ type: String, required: true })
</script>

<template>
  <div class="flex align-items-center gap-3 mb-3">
    <label
      for="name"
      class="font-semibold w-6rem flex items-center"
    >
    {{ prop.label }}
    </label>
    <InputText
      id="name"
      v-model="value"
      class="flex-auto"
      autocomplete="off"
    />
  </div>
</template>
