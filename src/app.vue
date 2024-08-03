<script setup lang="ts">
import '@/assets/styles/main.css'
import '@/assets/styles/markdown.scss'

import BotIcon from '@/assets/icons/bot.svg?skipsvgo'
import LoadingIcon from '@/assets/icons/three-dots.svg?skipsvgo'

const loading = ref(true)

onMounted(() => {
  loading.value = false
})
</script>

<template>
  <div>
    <Head>
      <Title>GPT Free Share</Title>
      <Meta name="description" content="OpenAI API sharing solution" />
    </Head>

    <Body
      class="m-0 flex h-screen w-screen select-none items-center justify-center overflow-hidden p-0" />
    <div class="bg-[#FAFAFA] dark:bg-[#151515]">
      <div v-if="loading">
        <div
          class="fixed left-[50%] top-[50%] flex -translate-x-[50%] -translate-y-[50%] transform flex-col items-center justify-center">
          <BotIcon />
          <LoadingIcon />
        </div>
        <NuxtLayout :name="false">
          <NuxtPage name="" />
        </NuxtLayout>
      </div>
      <div v-else>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>
