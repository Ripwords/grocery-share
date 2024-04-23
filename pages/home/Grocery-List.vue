<script lang="ts" setup>
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import type { GroceryListItem } from "~/schema/schema"

definePageMeta({
  middleware: ["auth", "joined-client"],
})

const addDialog = ref(false)
watch(addDialog, () => {
  if (!addDialog.value) {
    reset()
  }
})

const reset = () => {
  searchValue.value = ""
  locationValue.value = ""
  quantity.value = 1
  remarks.value = ""
  addDialog.value = false
}

const quantity = ref(1)
const remarks = ref("")

const { userCode } = useUserCode()
const { groceryList } = useGetGroceryList(userCode)
const { groceryTypes } = useGetGroceryTypes(userCode)

const searchValue = ref()
const locationValue = ref("")
watch(searchValue, () => {
  if (items.value.includes(searchValue.value)) {
    locationValue.value =
      groceryTypes.value.find((type) => type.name === searchValue.value)
        ?.location ?? ""
  } else {
    locationValue.value = ""
  }
})

const items = ref<string[]>([])

const searchFilter = () => {
  items.value = groceryTypes.value
    .filter((type) =>
      type.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
    .map((type) => type.name)

  if (items.value.length === 0) {
    items.value = [searchValue.value]
  }
}

const addGrocery = async () => {
  const db = useFirestore()

  let grocery = groceryTypes.value.find(
    (type) => type.name === searchValue.value
  )

  if (!grocery) {
    const newTypeID = await addDoc(
      collection(db, "codes", userCode.value, "types"),
      {
        name: searchValue.value,
        location: locationValue.value,
      }
    )

    grocery = {
      id: newTypeID.id,
      name: searchValue.value,
      location: locationValue.value,
    }
  }

  const groceryEntry:
    | GroceryListItem
    | {
        item: ReturnType<typeof doc>
      } = {
    item: doc(db, "codes", userCode.value, "types", grocery.id),
    remarks: remarks.value,
    quantity: quantity.value,
    locationOverride:
      locationValue.value !== grocery.location
        ? locationValue.value
        : undefined,
  }

  await addDoc(
    collection(db, "codes", userCode.value, "list"),
    filteredObj(groceryEntry)
  )

  reset()
}

const purchasedGrocery = (grocery: GroceryListItem) => {
  const db = useFirestore()
  deleteDoc(doc(db, "codes", userCode.value, "list", grocery.id))
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
      <FloatLabel class="flex justify-start">
        <AutoComplete
          v-model="searchValue"
          :suggestions="items"
          force-selection
          @complete="searchFilter"
        />
        <label for="search">Search</label>
      </FloatLabel>

      <!-- Display Selected Item -->
      <div class="mt-5">
        <LazyCard>
          <template #title>
            <div class="text-lg font-semibold">Selected Grocery</div>
          </template>
          <template #content>
            <div class="flex">
              <div class="flex flex-wrap w-[80%] items-center">
                <LazyGroceryTypeListItem
                  :labels="[
                    `${searchValue ?? ''}`,
                    `${locationValue}`,
                    `${remarks}`,
                  ]"
                  :icons="[
                    'gridicons:types',
                    'material-symbols:location-on-outline',
                    'fluent:text-description-16-filled',
                  ]"
                />
              </div>
              <div class="flex flex-wrap w-[20%]">
                <InputNumber
                  v-model="quantity"
                  showButtons
                  buttonLayout="vertical"
                  style="width: 3rem"
                  :min="1"
                >
                  <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                  </template>
                  <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                  </template>
                </InputNumber>
              </div>
            </div>
          </template>

          <template #footer>
            <InputText
              v-model="locationValue"
              placeholder="location"
              class="mb-3 w-full"
            />
            <InputText
              v-model="remarks"
              placeholder="Remarks"
              class="mb-3 w-full"
            />
            <Button
              class="w-full"
              label="Add"
              :disabled="!searchValue"
              @click="addGrocery"
            />
          </template>
        </LazyCard>
      </div>
    </LazyDialog>

    <Card class="w-[95%] max-w-[500px]">
      <template #title>
        <div class="flex items-center text-lg font-semibold">Grocery List</div>
      </template>

      <template #content>
        <div v-if="groceryList.length <= 0">
          <div class="flex justify-center items-center h-[10rem]">
            <div class="text-lg">No Groceries</div>
          </div>
        </div>
        <div v-else>
          <LazyCard
            v-for="grocery in groceryList"
            :key="grocery.id"
            class="mb-5"
          >
            <template #title>
              <div class="text-lg font-semibold">{{ grocery.item.name }}</div>
            </template>
            <template #content>
              <div class="flex">
                <div class="flex flex-wrap w-[80%] items-center">
                  <LazyGroceryTypeListItem
                    :labels="[
                      `${grocery.quantity}`,
                      `${grocery.locationOverride ?? grocery.item.location}`,
                      `${grocery.remarks ?? ''}`,
                    ]"
                    :icons="[
                      'ic:twotone-numbers',
                      'material-symbols:location-on-outline',
                      'fluent:text-description-16-filled',
                    ]"
                  />
                </div>
                <div class="flex w-[20%] justify-end">
                  <Button
                    icon="pi pi-check"
                    class="p-button-rounded p-button-success p-button-outlined"
                    @click="purchasedGrocery(grocery)"
                  />
                </div>
              </div>
            </template>
          </LazyCard>
        </div>
      </template>
    </Card>
  </div>
</template>
