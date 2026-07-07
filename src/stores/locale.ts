import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LocaleType } from '@/types'
import { i18n } from '@/locales/setup'

const LOCALE_MAP: Record<LocaleType, string> = {
  'zh-CN': 'zh-CN',
  'en-US': 'en-US',
  'ko-KR': 'ko-KR',
}

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const locale = ref<LocaleType>('zh-CN')

    function detectBrowserLocale(): LocaleType {
      const browserLang = navigator.language
      if (browserLang.startsWith('zh')) return 'zh-CN'
      if (browserLang.startsWith('ko')) return 'ko-KR'
      return 'en-US'
    }

    function setLocale(newLocale: LocaleType): void {
      locale.value = newLocale
      i18n.global.locale.value = LOCALE_MAP[newLocale]
      document.documentElement.lang = newLocale
    }

    function init(): void {
      const stored = localStorage.getItem('svianl_locale')
      if (stored && ['zh-CN', 'en-US', 'ko-KR'].includes(stored)) {
        setLocale(stored as LocaleType)
      } else {
        setLocale(detectBrowserLocale())
      }
    }

    return { locale, setLocale, init, detectBrowserLocale }
  },
  { persist: { key: 'svianl_locale', pick: ['locale'] } },
)
