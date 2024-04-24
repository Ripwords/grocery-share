<script lang="ts" setup>
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"
import type { GroceryItemType } from "~/schema/schema"

definePageMeta({
  middleware: ["auth", "joined-client"],
})

const toast = useToast()
const confirm = useConfirm()

const addDialog = ref(false)

const editDialog = ref(false)
const editDialogId = ref("")

const typeData = reactive({
  name: "",
  location: "",
})

const { userCode } = useUserCode()
const { groceryTypes } = useGetGroceryTypes(userCode)

const cancelUpdate = () => {
  typeData.name = ""
  typeData.location = ""
  editDialog.value = false
  addDialog.value = false
}

const addType = () => {
  const db = useFirestore()
  const typesCol = collection(db, "codes", userCode.value, "types")

  addDoc(typesCol, {
    name: typeData.name,
    location: typeData.location,
  })
    .then(() => {
      typeData.name = ""
      typeData.location = ""

      toast.add({
        severity: "success",
        summary: "Grocery type added",
        life: 3500,
      })
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Error adding document",
        life: 3500,
      })
    })
    .finally(() => {
      addDialog.value = false
    })
}

const editType = (e: GroceryItemType) => {
  editDialogId.value = e.id
  typeData.location = e.location
  typeData.name = e.name
  editDialog.value = true
}

const removeConfirm = (id: string) => {
  confirm.require({
    header: "Remove Grocery Type",
    message: "Are you sure you want to remove this grocery type?",
    icon: "pi pi-exclamation-triangle",
    accept: () => removeType(id),
  })
}

const updateType = () => {
  const db = useFirestore()
  const typeDoc = doc(db, "codes", userCode.value, "types", editDialogId.value)

  updateDoc(typeDoc, {
    name: typeData.name,
    location: typeData.location,
  })
    .then(() => {
      typeData.name = ""
      typeData.location = ""

      toast.add({
        severity: "success",
        summary: "Grocery type updated",
        life: 3500,
      })
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Error updating document",
        life: 3500,
      })
      console.error("Error updating document: ", error)
    })
    .finally(() => {
      editDialog.value = false
    })
}

const removeType = (id: string) => {
  const db = useFirestore()
  const typeDoc = doc(db, "codes", userCode.value, "types", id)

  deleteDoc(typeDoc)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Grocery type removed",
        life: 3500,
      })
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Error removing document",
        life: 3500,
      })
      console.error("Error removing document: ", error)
    })
    .finally(() => {
      editDialog.value = false
    })
}

watch([addDialog, editDialog], () => {
  if (!addDialog.value && !editDialog.value) {
    cancelUpdate()
  }
})
</script>

<template>
  <div class="flex justify-center my-5">
    <!-- Add Type -->
    <Button
      class="absolute bottom-5 right-5"
      rounded
      size="large"
      icon="pi pi-plus"
      @click="addDialog = true"
    />

    <!-- Add Dialog -->
    <LazyGroceryTypeModifyDialog
      v-model:visible="addDialog"
      v-model:type-data="typeData"
      header="Add Grocery Type"
    >
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="addDialog = false"
        />
        <Button
          type="button"
          label="Add"
          @click="addType"
        />
      </div>
    </LazyGroceryTypeModifyDialog>

    <!-- Edit Dialog -->
    <LazyGroceryTypeModifyDialog
      v-model:visible="editDialog"
      v-model:type-data="typeData"
      header="Edit Grocery Type"
    >
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="editDialog = false"
        />
        <Button
          type="button"
          label="Save"
          @click="updateType"
        />
      </div>
    </LazyGroceryTypeModifyDialog>

    <!-- Remove Confirm -->
    <LazyConfirmDialog />

    <!-- {{ groceryTypes }} -->
    <LazyCard class="w-[95%] max-w-[500px]">
      <template #title>
        <div class="flex items-center text-lg font-semibold">Grocery Types</div>
      </template>

      <template #content>
        <LazyListbox
          :options="groceryTypes"
          data-key="id"
          empty-message="No groceries added!"
        >
          <template #option="slotProps">
            <div class="flex items-center max-w-[240px]">
              <div class="flex flex-wrap w-[80%]">
                <LazyGroceryTypeListItem
                  :labels="[slotProps.option.name, slotProps.option.location]"
                  :icons="[
                    'gridicons:types',
                    'material-symbols:location-on-outline',
                  ]"
                />
              </div>
              <div class="flex w-[20%]">
                <Button
                  class="ml-3"
                  size="small"
                  icon="pi pi-pencil"
                  @click="editType(slotProps.option)"
                />
                <Button
                  class="ml-3"
                  size="small"
                  severity="danger"
                  icon="pi pi-trash"
                  @click="removeConfirm(slotProps.option.id)"
                />
              </div>
            </div>
            <hr class="mt-3" />
          </template>
        </LazyListbox>
      </template>
    </LazyCard>
  </div>
</template>
