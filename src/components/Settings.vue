<script setup lang="ts">
import { Path } from '@/constants'
import { LangOptions, Locale, Theme } from '@/models/settingsModels'
import { showModal } from '@/utils'
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/Select.vue'
import List from '@/components/ui/List.vue'
import ListItem from '@/components/ui/ListItem.vue'
import CloseIcon from '@/assets/icons/close.svg?skipsvgo'

const useChatStore = await import('@/store/chatStore')
const useSettingsStore = await import('@/store/settingsStore')
const useTranslation = await import('@/i18n')

const chatStore = useChatStore.default()
const settingsStore = useSettingsStore.default()

const { defaultLocale, t } = useTranslation.default()

const locale = computed(() => settingsStore.locale)

const confirmButtonText = t(locale.value, 'UI.Confirm')
const cancelButtonText = t(locale.value, 'UI.Cancel')

const resetConfirmText = t(locale.value, 'Settings.Danger.Reset.Confirm')
const clearConfirmText = t(locale.value, 'Settings.Danger.Clear.Confirm')
</script>

<template>
  <div
    class="flex items-center justify-between border-b-[1px] border-solid border-[#0000001A] px-[20px] py-[14px]">
    <div class="max-w-[calc(100%-100px)] overflow-hidden">
      <div
        class="max-w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-bold">
        {{ t(locale, 'Settings.Title') }}
      </div>
    </div>
    <div class="inline-flex">
      <div class="[&:not(:first-child)]:ml-[10px]">
        <Button bordered :onClick="async () => await navigateTo(Path.Home)">
          <template #icon>
            <CloseIcon />
          </template>
        </Button>
      </div>
    </div>
  </div>
  <div class="overflow-auto p-[20px]">
    <List>
      <ListItem :title="t(locale, 'Settings.Theme')">
        <Select
          :value="settingsStore.theme"
          :onChange="
            (e: MouseEvent) => {
              const htmlSelectElement = e.target as HTMLSelectElement
              settingsStore.setTheme(htmlSelectElement.value as Theme)
            }
          ">
          <option v-for="v in Object.values(Theme)" :key="v" :value="v">
            {{ v }}
          </option>
        </Select>
      </ListItem>
      <ListItem :title="t(locale, 'Settings.Lang')">
        <Select
          :value="locale"
          :onChange="
            (e: MouseEvent) => {
              const htmlSelectElement = e.target as HTMLSelectElement
              settingsStore.setLocale(htmlSelectElement.value as Locale)
            }
          ">
          <option v-for="v in Object.values(Locale)" :key="v" :value="v">
            {{ LangOptions[v] }}
          </option>
        </Select>
      </ListItem>
    </List>
    <List>
      <ListItem
        :title="t(locale, 'Settings.Danger.Reset.Title')"
        :subTitle="t(locale, 'Settings.Danger.Reset.SubTitle')">
        <Button
          :text="t(locale, 'Settings.Danger.Reset.Action')"
          type="danger"
          :onClick="
            async () => {
              if (
                await showModal(
                  resetConfirmText,
                  confirmButtonText,
                  cancelButtonText
                )
              ) {
                settingsStore.reset()

                if (defaultLocale !== locale) {
                  settingsStore.setLocale(defaultLocale)
                }
              }
            }
          "></Button>
      </ListItem>
      <ListItem
        :title="t(locale, 'Settings.Danger.Clear.Title')"
        :subTitle="t(locale, 'Settings.Danger.Clear.SubTitle')">
        <Button
          :text="t(locale, 'Settings.Danger.Clear.Action')"
          type="danger"
          :onClick="
            async () => {
              if (
                await showModal(
                  clearConfirmText,
                  confirmButtonText,
                  cancelButtonText
                )
              ) {
                chatStore.reset()
              }
            }
          "></Button>
      </ListItem>
    </List>
  </div>
</template>
