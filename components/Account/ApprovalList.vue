<script lang="ts" setup>
import type { GroceryShareCode } from "~/schema/schema"

const props = defineProps<{
  approvalList: GroceryShareCode["toBeApproved"]
}>()

const emits = defineEmits<{
  (e: "approve" | "reject", value: GroceryShareCode["toBeApproved"][0]): void
}>()

const toast = useToast()
const confirm = useConfirm()
const confirmApprove = (user: GroceryShareCode["toBeApproved"][0]) => {
  confirm.require({
    message: `Are you sure you want to approve ${user.username ?? user.email}?`,
    header: "Confirm Approval",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Cancel",
    acceptClass: "p-button-success",
    acceptLabel: "Yes",
    accept: () => {
      toast.add({
        severity: "success",
        summary: "User approved",
        life: 3500,
      })

      emits("approve", user)
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "User approval canceled",
        life: 3500,
      })
    },
  })
}

const confirmReject = (user: GroceryShareCode["toBeApproved"][0]) => {
  confirm.require({
    message: `Are you sure you want to reject ${user.username ?? user.email}?`,
    header: "Confirm Rejection",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Cancel",
    acceptClass: "p-button-danger",
    acceptLabel: "Yes",
    accept: () => {
      toast.add({
        severity: "success",
        summary: "User rejected",
        life: 3500,
      })

      emits("reject", user)
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "User rejection canceled",
        life: 3500,
      })
    },
  })
}
</script>

<template>
  <LazyCard class="w-[95%]">
    <template #title>
      <div class="flex items-center text-lg font-semibold">Approval List</div>
    </template>

    <template #content>
      <LazyListbox
        :options="props.approvalList"
        data-key="id"
        empty-message="No user(s) to approve!"
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
            <div class="flex flex-col items-center w-[20%]">
              <Button
                class="ml-3"
                size="small"
                @click="confirmApprove(slotProps.option)"
              >
                <Icon name="radix-icons:check-circled" />
              </Button>

              <Button
                class="ml-3 mt-1"
                size="small"
                severity="danger"
                @click="confirmReject(slotProps.option)"
              >
                <Icon name="radix-icons:cross-circled" />
              </Button>
            </div>
          </div>
          <hr class="mt-3" />
        </template>
      </LazyListbox>
    </template>
  </LazyCard>
</template>
