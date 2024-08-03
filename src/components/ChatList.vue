<script setup lang="ts">
import useChatStore from '@/store/chatStore'
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Path } from '@/constants'

const settingsStore = useSettingsStore()
const chatStore = useChatStore()

const { t } = useTranslation()

const locale = computed(() => settingsStore.locale)
</script>

<template>
  <div>
    <ChatItem
      v-for="session in chatStore.sessions"
      :key="session.id"
      :title="session.topic || t(locale, 'Store.DefaultTopic')"
      :messageCount="session.messages.length"
      :time="new Date(session.lastUpdateTime).toLocaleString()"
      :selected="session.active"
      :onClick="
        async () => {
          await navigateTo(Path.Home)

          chatStore.selectSession(session.id)
        }
      "
      :onDelete="
        () => {
          chatStore.deleteSession(session.id)
        }
      " />
  </div>
</template>
