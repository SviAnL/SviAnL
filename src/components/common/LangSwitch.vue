<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores'
import type { LocaleType } from '@/types'

const { t: _t } = useI18n()
const localeStore = useLocaleStore()

const locales: { code: LocaleType; label: string }[] = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'EN' },
  { code: 'ko-KR', label: '한국어' },
]
</script>

<template>
  <div class="flex items-center gap-1 rounded-lg border border-border p-1">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="btn-touch rounded-md px-2 py-1 text-xs font-medium transition-colors"
      :class="localeStore.locale === loc.code ? 'bg-primary text-white' : 'text-muted hover:text-foreground'"
      :aria-pressed="localeStore.locale === loc.code"
      @click="localeStore.setLocale(loc.code)"
    >
      {{ loc.label }}
    </button>
  </div>
</template>
