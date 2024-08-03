<script setup lang="ts">
import DownIcon from '@/assets/icons/down.svg?skipsvgo'

defineProps({
  value: {
    type: String,
    required: true
  },
  onChange: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="relative max-w-fit">
    <select
      class="h-full cursor-pointer appearance-none rounded-[10px] border-[1px] border-solid border-[#DEDEDE] bg-white py-[10px] pl-[10px] pr-[35px] text-center text-[#303030] outline-none dark:border-[#FFFFFF1A] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]"
      :value="value"
      @change="e => onChange(e)">
      <slot></slot>
    </select>
    <DownIcon
      class="pointer-events-none absolute right-[10px] top-[50%] -translate-y-[50%] transform" />
  </div>
</template>
