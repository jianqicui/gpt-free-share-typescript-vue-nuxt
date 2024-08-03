<script setup lang="ts">
import useChatStore from '@/store/chatStore'
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Theme } from '@/models/settingsModels'
import { Path } from '@/constants'
import Button from '@/components/ui/Button.vue'
import AddIcon from '@/assets/icons/add.svg?skipsvgo'
import ChatGptIcon from '@/assets/icons/chatgpt.svg?skipsvgo'
import SettingsIcon from '@/assets/icons/settings.svg?skipsvgo'

const AsyncChatList = defineAsyncComponent(
  () => import('@/components/ChatList.vue')
)

const useSwitchTheme = () => {
  const settingsStore = useSettingsStore()

  watch(
    () => settingsStore.theme,
    theme => {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.remove('dark-mode')

      if (theme === Theme.Light) {
        document.documentElement.classList.add('light-mode')
      } else if (theme === Theme.Dark) {
        document.documentElement.classList.add('dark-mode')
      }

      document.body.setAttribute('data-theme', theme)
    },
    {
      immediate: true
    }
  )
}

const useHtmlLang = () => {
  const settingsStore = useSettingsStore()

  const { defaultLocale, getLang } = useTranslation()

  watch(
    () => settingsStore.locale,
    locale => {
      let lang

      if (locale) {
        lang = getLang(locale)
      } else {
        settingsStore.setLocale(defaultLocale)

        lang = getLang(defaultLocale)
      }

      const htmlLang = document.documentElement.lang

      if (lang !== htmlLang) {
        document.documentElement.lang = lang
      }
    },
    {
      immediate: true
    }
  )
}

useSwitchTheme()
useHtmlLang()

const settingsStore = useSettingsStore()
const chatStore = useChatStore()

const { t } = useTranslation()

const locale = computed(() => settingsStore.locale)

const startChat = async () => {
  chatStore.newSession()

  await navigateTo(Path.Home)
}
</script>

<template>
  <div
    class="flex h-full w-full flex-col bg-[#E7F8FF] p-[20px] dark:bg-[#1B262A]">
    <div class="flex justify-between pb-[20px] pt-[20px]">
      <div>
        <div class="text-[20px] font-bold">GPT Free Share</div>
        <div class="text-[12px] font-normal">OpenAI API sharing solution.</div>
      </div>
      <ChatGptIcon />
    </div>
    <div class="flex-1 overflow-auto overflow-x-hidden">
      <AsyncChatList />
    </div>
    <div class="flex justify-between pt-[20px]">
      <div class="inline-flex">
        <div class="[&:not(:last-child)]:mr-[15px]">
          <NuxtLink :to="Path.Settings">
            <Button>
              <template #icon>
                <SettingsIcon />
              </template>
            </Button>
          </NuxtLink>
        </div>
      </div>
      <div>
        <Button :text="t(locale, 'Home.NewChat')" :onClick="() => startChat()">
          <template #icon>
            <AddIcon />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>
