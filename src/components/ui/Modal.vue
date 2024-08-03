<script setup lang="ts">
import CloseIcon from '@/assets/icons/close.svg?skipsvgo'

defineProps({
  title: {
    type: String,
    required: true
  },
  onClose: {
    type: Function,
    required: false
  },
  actions: {
    type: Array,
    required: false
  }
})
</script>

<template>
  <div
    class="w-[80vw] min-w-[300px] max-w-[600px] rounded-[12px] bg-white text-[#303030] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]">
    <div
      class="flex items-center justify-between border-b-[1px] border-solid border-[#DEDEDE] p-[20px] dark:border-[#FFFFFF1A]">
      <div class="text-[16px] font-bold">{{ title }}</div>
      <div class="flex">
        <div
          class="cursor-pointer hover:brightness-200 dark:invert [&:not(:last-child)]:mr-[20px]"
          @click="() => onClose?.()">
          <CloseIcon />
        </div>
      </div>
    </div>
    <div class="max-h-[40vh] overflow-auto p-[20px]">
      <slot></slot>
    </div>
    <div
      class="flex justify-end border-t-[1px] border-solid border-[#DEDEDE] p-[20px] dark:border-[#FFFFFF1A]">
      <div class="flex items-center">
        <div
          v-for="(action, i) in actions"
          :key="i"
          class="[&:not(:last-child)]:mr-[20px]">
          <component :is="action" />
        </div>
      </div>
    </div>
  </div>
</template>
