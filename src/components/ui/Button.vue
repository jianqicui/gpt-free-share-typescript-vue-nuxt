<script setup lang="ts">
type ButtonType = 'primary' | 'danger'

const buttonTypeClassName = {
  primary: 'bg-[#1D93AB] text-white',
  danger: 'bg-[#FF00001A] text-[#FF0000CC]'
}

const props = defineProps({
  text: {
    type: String,
    required: false
  },
  bordered: {
    type: Boolean,
    required: false
  },
  className: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false,
    validator(value) {
      return value === 'primary' || value === 'danger'
    }
  },
  autoFocus: {
    type: Boolean,
    required: false
  },
  onClick: {
    type: Function,
    required: false
  }
})

const { autoFocus } = toRefs(props)

const buttonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  if (autoFocus.value) {
    buttonRef.value?.focus()
  }
})
</script>

<template>
  <button
    ref="buttonRef"
    :class="[
      'flex cursor-pointer select-none items-center justify-between overflow-hidden rounded-[10px] p-[10px] outline-none transition-all duration-300 ease-in-out hover:brightness-90 focus:brightness-95',
      bordered &&
        'border-[1px] border-solid border-[#DEDEDE] dark:border-[#FFFFFF1A]',
      className,
      type
        ? buttonTypeClassName[type as ButtonType]
        : 'bg-white text-[#303030] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]'
    ]"
    role="button"
    @click="() => onClick?.()">
    <div v-if="$slots.icon" class="h-[16px] w-[16px] dark:invert">
      <slot name="icon"></slot>
    </div>
    <div
      v-if="text"
      class="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] [&:not(:first-child)]:ml-[5px]">
      {{ text }}
    </div>
  </button>
</template>
