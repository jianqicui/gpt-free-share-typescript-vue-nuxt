<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div
    class="flex min-h-[40px] items-center justify-between border-b-[1px] border-solid border-[#DEDEDE] px-[20px] py-[10px] last:border-none dark:border-[#FFFFFF1A]">
    <div class="text-[14px] font-bold">
      <div>{{ title }}</div>
      <div v-if="subTitle" class="text-[12px] font-normal">{{ subTitle }}</div>
    </div>
    <slot></slot>
  </div>
</template>
