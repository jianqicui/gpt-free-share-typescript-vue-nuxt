<template>
  <div
    class="flex h-[90vh] min-h-[370px] w-[90vw] min-w-[600px] max-w-[1200px] overflow-hidden rounded-[20px] border-[1px] border-solid border-[#DEDEDE] bg-white text-[#303030] dark:border-[#FFFFFF1A] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]">
    <div class="w-[300px]">
      <Sidebar />
    </div>
    <div class="w-[calc(100%-300px)]">
      <slot></slot>
    </div>
  </div>
</template>
