<script setup lang="ts">
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Path } from '@/constants'
import DeleteIcon from '@/assets/icons/delete.svg'

defineProps({
  title: {
    type: String,
    required: true
  },
  messageCount: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  },
  onClick: {
    type: Function,
    required: true
  },
  onDelete: {
    type: Function,
    required: true
  }
})

const settingsStore = useSettingsStore()

const { t } = useTranslation()

const locale = computed(() => settingsStore.locale)

const route = useRoute()
</script>

<template>
  <div
    :class="[
      'group relative mb-[10px] cursor-pointer rounded-[10px] border-solid bg-white px-[14px] py-[10px] hover:bg-[#f3f3f3] dark:bg-[#1E1E1E] dark:hover:bg-[#323232]',
      selected && route.path === Path.Home && 'border-[2px] border-[#1D93AB]'
    ]"
    @click="
      () => {
        onClick()
      }
    ">
    <div
      class="w-[calc(100%-15px)] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold">
      {{ title }}
    </div>
    <div class="mt-[8px] flex justify-between text-[12px] text-[#A6A6A6]">
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ t(locale, 'ChatItem.ChatItemCount')(messageCount) }}
      </div>
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ time }}
      </div>
    </div>
    <div
      class="absolute right-[4px] top-[4px] cursor-pointer opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-x-[2px] group-hover:transform group-hover:opacity-50 group-hover:hover:opacity-100"
      @click="
        e => {
          onDelete()
          e.stopPropagation()
        }
      ">
      <DeleteIcon />
    </div>
  </div>
</template>
