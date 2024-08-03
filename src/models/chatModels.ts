export enum ChatMessageRole {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string
  date: number
  role: ChatMessageRole
  content: string
}

export interface ChatSession {
  id: string
  topic?: string
  messages: ChatMessage[]
  lastUpdateTime: number
  active: boolean
}

export interface ChatOptions {
  stream: boolean
  content: string

  onText: (text: string | null) => void
  onError?: (error: Error) => void
}
