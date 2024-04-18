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
  <LazyCard class="w-[95%]">
    <template #title>
      <div class="flex items-center text-lg font-semibold">Approval List</div>
    </template>

    <template #content>
      <LazyOrderList
        :model-value="props.approvalList"
        data-key="id"
      >
        <template #item="slotProps">
          <div class="flex items-center">
            <div class="flex flex-wrap">
              <div class="flex items-center basis-[80%]">
                <Icon
                  class="mr-2 w-[15px]"
                  name="ph:user-list-duotone"
                />
                : {{ slotProps.item.username ?? "N/A" }}
              </div>
              <div class="flex items-center flex-wrap">
                <Icon
                  class="mr-2 w-[15px]"
                  name="ph:envelope-duotone"
                />
                <div class="basis-[80%]">
                  : {{ slotProps.item.email }}asdfasdfasd
                  asdfasdfasdfasdfasdfasdf
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center basis-[20%]">
              <Button
                class="ml-3"
                size="small"
                @click="emits('approve', slotProps.item)"
              >
                <Icon name="radix-icons:check-circled" />
              </Button>

              <Button
                class="ml-3 mt-1"
                size="small"
                severity="danger"
                @click="emits('approve', slotProps.item)"
              >
                <Icon name="radix-icons:cross-circled" />
              </Button>
            </div>
          </div>
          <hr class="mt-3" />
        </template>
      </LazyOrderList>
    </template>
  </LazyCard>
</template>
