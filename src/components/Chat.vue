<script setup lang="ts">
import { ChatMessageRole } from '@/models/chatModels'
import Button from '@/components/ui/Button.vue'
import BotIcon from '@/assets/icons/bot.svg?skipsvgo'
import LoadingIcon from '@/assets/icons/three-dots.svg?skipsvgo'
import SendWhiteIcon from '@/assets/icons/send-white.svg?skipsvgo'

const useChatStore = await import('@/store/chatStore')
const useSettingsStore = await import('@/store/settingsStore')
const useTranslation = await import('@/i18n')

const AsyncMarkdown = defineAsyncComponent(
  () => import('@/components/ui/Markdown.vue')
)

const useScrollToBottom = (scrollRef: Ref<HTMLDivElement | null>) => {
  const scrollDomToBottom = () => {
    const dom = scrollRef.value

    if (dom) {
      requestAnimationFrame(() => {
        dom.scrollTo(0, dom.scrollHeight)
      })
    }
  }

  onMounted(() => {
    scrollDomToBottom()
  })

  onUpdated(() => {
    scrollDomToBottom()
  })

  return {
    scrollDomToBottom
  }
}

const settingsStore = useSettingsStore.default()
const chatStore = useChatStore.default()

const { t } = useTranslation.default()

const locale = computed(() => settingsStore.locale)

const session = computed(() => chatStore.activeSession())
const messages = computed(() => session.value.messages)

const userInputRef = ref<HTMLTextAreaElement | null>(null)
const userInput = ref('')

const scrollRef = ref<HTMLDivElement | null>(null)
const { scrollDomToBottom } = useScrollToBottom(scrollRef)

const scrollToBottom = () => {
  scrollDomToBottom()
}

const onUserInput = (text: string) => {
  userInput.value = text
}

const onUserInputKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    doSubmit()
    e.preventDefault()
  }
}

const doSubmit = () => {
  if (userInput.value.trim() === '') {
    return
  }

  if (messages.value.length === 0) {
    const topicContent =
      userInput.value + '\n' + t(locale.value, 'Store.Prompt.Topic')

    chatStore.setSessionTitle(topicContent)
  }

  chatStore.chatUserInput(userInput.value)

  userInput.value = ''
  userInputRef.value?.focus()
}

onMounted(() => {
  watch(
    () => session.value.id,
    () => {
      userInputRef.value?.focus()
    },
    {
      immediate: true
    }
  )
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div
      class="flex items-center justify-between border-b-[1px] border-solid border-[#0000001A] px-[20px] py-[14px]">
      <div class="max-w-[calc(100%-100px)] overflow-hidden">
        <div
          class="max-w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-bold">
          {{ session.topic || t(locale, 'Store.DefaultTopic') }}
        </div>
      </div>
    </div>
    <div
      ref="scrollRef"
      class="pb-[40px flex-1 overflow-auto overflow-x-hidden overscroll-none p-[20px]"
      @mousedown="() => userInputRef?.blur()">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'flex',
          message.role === ChatMessageRole.USER
            ? 'flex-row-reverse'
            : 'flex-row'
        ]">
        <div
          :class="[
            'flex max-w-[80%] flex-col',
            message.role === ChatMessageRole.USER ? 'items-end' : 'items-start'
          ]">
          <div
            v-if="message.role === ChatMessageRole.BOT"
            class="mt-[20px] flex items-center">
            <BotIcon />
          </div>
          <div
            :class="[
              'mt-[10px] max-w-full select-text break-all rounded-[10px] border-[#DEDEDE] p-[10px] text-[14px] transition-all duration-300 ease-in-out dark:border-[#FFFFFF1A]',
              message.role === ChatMessageRole.USER &&
                'bg-[#E7F8FF] dark:bg-[#1B262A]'
            ]">
            <LoadingIcon v-if="message.content.length === 0" />
            <AsyncMarkdown v-else :content="message.content" />
          </div>
          <div
            class="duration-600 z-1 pointer-events-none w-full whitespace-nowrap pr-[10px] text-right text-[12px] text-[#303030] opacity-20 transition-all ease-in-out dark:text-[#BBBBBB]">
            {{ new Date(message.date).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative w-full flex-col border-t-[1px] border-solid border-[#DEDEDE] p-[20px] pt-[10px] dark:border-[#FFFFFF1A]">
      <label
        class="flex flex-1 cursor-text rounded-[10px] border-[1px] border-solid border-[#DEDEDE] dark:border-[#FFFFFF1A]"
        htmlFor="chat-input">
        <textarea
          id="chat-input"
          ref="userInputRef"
          class="h-full min-h-[68px] w-full resize-none rounded-[10px] border bg-white py-[10px] pl-[14px] pr-[90px] text-[#303030] outline-none focus:border-[#1D93AB] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]"
          :value="userInput"
          :placeholder="t(locale, 'Chat.Input')"
          @input="
            e => {
              const htmlTextAreaElement = e.currentTarget as HTMLTextAreaElement
              onUserInput(htmlTextAreaElement.value)
            }
          "
          @keydown="onUserInputKeyDown"
          @focus="scrollToBottom"
          @click="scrollToBottom"></textarea>
        <Button
          :text="t(locale, 'Chat.Send')"
          className="border-[#1D93AB] absolute right-[30px] bottom-[36px]"
          type="primary"
          :onClick="() => doSubmit()">
          <template #icon>
            <div class="dark:invert">
              <SendWhiteIcon class="fill-white" />
            </div>
          </template>
        </Button>
      </label>
    </div>
  </div>
</template>
