<script lang="ts" setup>
import type { GroceryShareCode } from "~/schema/schema"

const props = defineProps<{
  approvalList: GroceryShareCode["toBeApproved"]
}>()

const emits = defineEmits<{
  (e: "approve", value: GroceryShareCode["toBeApproved"][0]): void
}>()
</script>

<template>
  <h2>Approval List</h2>
  <LazyOrderList :model-value="props.approvalList">
    <template #item="slotProps">
      <div class="flex items-center">
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
        <div class="flex items-center">
          <Button
            class="ml-3"
            size="small"
            @click="emits('approve', slotProps.item)"
            >Approve</Button
          >
        </div>
      </div>
      <hr />
    </template>
  </LazyOrderList>
</template>
