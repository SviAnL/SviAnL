<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores'
import type { ThemeMode } from '@/types'

const { t } = useI18n()
const themeStore = useThemeStore()

const themes: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: 'light', label: 'theme.light', icon: '☀️' },
  { mode: 'dark', label: 'theme.dark', icon: '🌙' },
  { mode: 'high-contrast', label: 'theme.highContrast', icon: '🔆' },
  { mode: 'system', label: 'theme.system', icon: '💻' },
]

const currentIcon = computed(() => themes.find((th) => th.mode === themeStore.mode)?.icon || '☀️')
</script>

<template>
  <div class="relative">
    <button
      class="btn-touch flex items-center gap-1 rounded-lg p-2 transition-colors hover:bg-surface-hover"
      :aria-label="t('theme.' + themeStore.mode.replace('-', ''))"
      @click="themeStore.cycleTheme()"
    >
      <span class="text-lg" aria-hidden="true">{{ currentIcon }}</span>
    </button>
  </div>
</template>
