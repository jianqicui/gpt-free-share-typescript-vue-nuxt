import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

import { StoreKey } from '@/constants'
import {
  type ChatMessage,
  ChatMessageRole,
  type ChatSession
} from '@/models/chatModels'
import { chat } from '@/client/chatClient'
import { prettyObject } from '@/utils'

const createEmptySession = (): ChatSession => {
  return {
    id: nanoid(),
    messages: [],
    lastUpdateTime: Date.now(),
    active: true
  }
}

const getActiveSession = (sessions: ChatSession[]) => {
  return sessions.find(s => s.active)!
}

const setActiveSession = (sessions: ChatSession[], sessionId: string) => {
  const foundSession = sessions.find(session => session.id === sessionId)

  if (foundSession) {
    sessions.forEach(session => {
      session.active = session.id === sessionId
    })
  }
}

const createMessage = (role: ChatMessageRole, content: string): ChatMessage => {
  return {
    id: nanoid(),
    date: Date.now(),
    role,
    content
  }
}

const setBotMessageContent = (messages: ChatMessage[], content: string) => {
  messages.pop()

  const botMessage = createMessage(ChatMessageRole.BOT, content)
  messages.push(botMessage)
}

const AppendBotMessageContent = (messages: ChatMessage[], content: string) => {
  const lastMessage = messages.pop()!

  const botMessage = createMessage(
    ChatMessageRole.BOT,
    lastMessage.content + content
  )
  messages.push(botMessage)
}

const useChatStore = defineStore('chat', {
  state: () => {
    return {
      sessions: [createEmptySession()]
    }
  },
  actions: {
    activeSession() {
      return getActiveSession(this.sessions)
    },

    selectSession(sessionId: string) {
      setActiveSession(this.sessions, sessionId)

      this.$persist()
    },

    deleteSession(sessionId: string) {
      const filteredSessions = this.sessions.filter(
        session => session.id !== sessionId
      )

      if (filteredSessions.length === 0) {
        filteredSessions.push(createEmptySession())
      } else {
        filteredSessions[0].active = true
      }

      this.sessions = filteredSessions

      this.$persist()
    },

    newSession() {
      const session = createEmptySession()

      this.sessions.unshift(session)

      setActiveSession(this.sessions, session.id)

      this.$persist()
    },

    setSessionTitle(topicContent: string) {
      const session = getActiveSession(this.sessions)

      const persist = this.$persist

      const options = {
        stream: false,
        content: topicContent,

        onText(text: string | null) {
          if (text) {
            session.topic = text

            persist()
          }
        }
      }

      chat(options)
    },

    chatUserInput(userContent: string) {
      const session = getActiveSession(this.sessions)
      const messages = session.messages

      const userMessage = createMessage(ChatMessageRole.USER, userContent)
      const botMessage = createMessage(ChatMessageRole.BOT, '')

      messages.push(userMessage, botMessage)

      const persist = this.$persist

      const options = {
        stream: true,
        content: userContent,

        onText(text: string | null) {
          if (text) {
            setBotMessageContent(messages, text)
          } else {
            session.lastUpdateTime = Date.now()
          }

          persist()
        },

        onError(error: Error) {
          AppendBotMessageContent(
            messages,
            '\n\n' +
              prettyObject({
                error: true,
                message: error.message
              })
          )

          persist()
        }
      }

      chat(options)
    },

    reset() {
      this.$reset()
    }
  },
  persist: {
    key: StoreKey.Chat,
    storage: localStorage
  }
})

export default useChatStore
