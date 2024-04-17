<script lang="ts" setup>
import type { GroceryShareUser } from "~/schema/schema"

const props = defineProps<{
  userList: GroceryShareUser[]
}>()

const emits = defineEmits<{
  (e: "removeUser", value: GroceryShareUser): void
}>()

const toast = useToast()
const confirm = useConfirm()
const confirmRemove = (user: GroceryShareUser) => {
  confirm.require({
    message: "Are you sure you want to remove this user?",
    header: "Confirm Remove",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Cancel",
    acceptClass: "p-button-danger",
    acceptLabel: "Yes",
    accept: () => {
      toast.add({
        severity: "success",
        summary: "User removed",
        life: 3500,
      })

      emits("removeUser", user)
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "User removal canceled",
        life: 3500,
      })
    },
  })
}

const user = useCurrentUser()
const isCreator = computed(() => {
  return user.value?.email === props.userList.find((u) => u.creator)?.email
})
</script>

<template>
  <ConfirmDialog />
  <h2>User List</h2>
  <LazyOrderList :model-value="props.userList">
    <template #item="slotProps">
      <div class="flex">
        <div class="flex flex-col">
          <div class="flex">
            <div class="w-[84px]">Username</div>
            : {{ slotProps.item.username ?? "N/A" }}
          </div>
          <div class="flex">
            <div class="w-[84px]">Email</div>
            : {{ slotProps.item.email }}
          </div>
        </div>
        <div
          v-if="slotProps.item.creator"
          class="flex items-center ml-3"
        >
          <Badge>Creator</Badge>
        </div>
        <div
          v-if="slotProps.item.id === user?.uid"
          class="flex items-center ml-3"
        >
          <Badge class="bg-blue-500">Me</Badge>
        </div>
        <div class="flex items-center">
          <Button
            v-if="isCreator && !(slotProps.item.id === user?.uid)"
            class="ml-3"
            size="small"
            @click="confirmRemove(slotProps.item)"
            >Remove
          </Button>
        </div>
      </div>
      <hr class="mt-5" />
    </template>
  </LazyOrderList>
</template>
