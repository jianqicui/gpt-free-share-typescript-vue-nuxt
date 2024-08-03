import { defineStore } from 'pinia'

import { StoreKey } from '@/constants'
import { Locale, Theme } from '@/models/settingsModels'

const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      theme: Theme.Light,
      locale: undefined as unknown as Locale
    }
  },
  actions: {
    setTheme(newTheme: Theme) {
      this.theme = newTheme

      this.$persist()
    },

    setLocale(newLocale: Locale) {
      this.locale = newLocale

      this.$persist()
    },

    reset() {
      this.$reset()
    }
  },
  persist: {
    key: StoreKey.Settings,
    storage: localStorage
  }
})

export default useSettingsStore
