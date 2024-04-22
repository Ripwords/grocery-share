<script lang="ts" setup>
definePageMeta({
  middleware: ["auth", "joined-client"],
})

const addDialog = ref(false)

const { userCode } = useUserCode()
const { groceryTypes } = useGetGroceryTypes(userCode)
const searchValue = ref()
const items = ref<string[]>([])

const searchFilter = () => {
  items.value = groceryTypes.value
    .filter((type) =>
      type.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
    .map((type) => type.name)
}
</script>

<template>
  <div class="flex justify-center my-5">
    <!-- Add Grocery Item -->
    <Button
      class="absolute bottom-5 right-5"
      rounded
      size="large"
      icon="pi pi-plus"
      @click="addDialog = true"
    />

    <!-- Add Dialog -->
    <LazyDialog
      v-model:visible="addDialog"
      modal
      header="Add Grocery"
      class="w-[25rem]"
    >
      <FloatLabel class="flex justify-start mt-5">
        <AutoComplete
          v-model="searchValue"
          :suggestions="items"
          @complete="searchFilter"
        />
        <label for="search">Search</label>
      </FloatLabel>

      <!-- Display Selected Item -->
      <div
        v-if="items.includes(searchValue)"
        class="mt-5"
      >
        <LazyCard>
          <template #title>
            <div class="text-lg font-semibold">Selected Grocery</div>
          </template>
          <template #content>
            <LazyGroceryTypeListItem
              :labels="
                Object.values(
                  groceryTypes.find((type) => type.name === searchValue) ?? {}
                ).filter((value) => typeof value === 'string')
              "
              :icons="[
                'gridicons:types',
                'material-symbols:location-on-outline',
                'fluent:text-description-16-filled',
              ]"
            />
          </template>
        </LazyCard>
      </div>
    </LazyDialog>

    <Card class="w-[95%] max-w-[500px]">
      <template #title>
        <div class="flex items-center text-lg font-semibold">Grocery List</div>
      </template>

      <template #content> hi </template>
    </Card>
  </div>
</template>
