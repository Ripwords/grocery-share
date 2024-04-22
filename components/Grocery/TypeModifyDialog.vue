<script lang="ts" setup>
const props = defineProps<{
  header: string
}>()

const visible = defineModel("visible", {
  type: Boolean,
  required: true,
})

const typeData = defineModel("typeData", {
  type: Object,
  required: true,
})
</script>

<template>
  <LazyDialog
    v-model:visible="visible"
    modal
    :header="props.header"
    class="w-[25rem]"
  >
    <LazyGroceryTypeEditField
      v-model="typeData.name"
      label="Name"
    />
    <LazyGroceryTypeEditField
      v-model="typeData.location"
      label="Location"
    />
    <LazyGroceryTypeEditField
      v-model="typeData.remarks"
      label="Remarks"
    />
    <slot />
  </LazyDialog>
</template>
