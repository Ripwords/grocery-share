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
    message: `Are you sure you want to remove ${user.username ?? user.email}?`,
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
  <div>
    <ConfirmDialog />
    <LazyCard class="w-[95%]">
      <template #title>
        <div class="flex items-center text-lg font-semibold">User List</div>
      </template>

      <template #content>
        <LazyListbox
          :options="props.userList"
          data-key="id"
        >
          <template #option="slotProps">
            <div class="flex items-center">
              <div class="flex flex-wrap w-[80%]">
                <div class="flex items-center w-full">
                  <Icon
                    class="mr-2"
                    name="ph:user-list-duotone"
                  />
                  <span
                    class="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[80%]"
                  >
                    : {{ slotProps.option.username }}
                    <Badge v-if="slotProps.option.creator">Creator</Badge>
                  </span>
                </div>
                <div class="flex items-center w-full">
                  <Icon
                    class="mr-2"
                    name="ph:envelope-duotone"
                  />
                  <span
                    class="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[80%]"
                  >
                    : {{ slotProps.option.email }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap justify-center w-[20%]">
                <Badge
                  v-if="slotProps.option.id === user?.uid"
                  class="bg-blue-500"
                  >Me</Badge
                >
                <div class="flex items-center">
                  <Button
                    v-if="isCreator && !(slotProps.option.id === user?.uid)"
                    size="small"
                    severity="danger"
                    @click="confirmRemove(slotProps.option)"
                  >
                    <Icon name="radix-icons:cross-circled" />
                  </Button>
                </div>
              </div>
            </div>
            <hr class="mt-5" />
          </template>
        </LazyListbox>
      </template>
    </LazyCard>
  </div>
</template>
