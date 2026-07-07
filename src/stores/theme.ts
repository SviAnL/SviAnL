import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ThemeMode } from '@/types'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mode = ref<ThemeMode>('system')
    const resolvedTheme = ref<'light' | 'dark' | 'high-contrast'>('light')

    const isDark = computed(() => resolvedTheme.value === 'dark')
    const isHighContrast = computed(() => resolvedTheme.value === 'high-contrast')

    function resolveTheme(): 'light' | 'dark' | 'high-contrast' {
      if (mode.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      if (mode.value === 'high-contrast') return 'high-contrast'
      return mode.value
    }

    function applyTheme(): void {
      resolvedTheme.value = resolveTheme()
      document.documentElement.setAttribute('data-theme', resolvedTheme.value)
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) {
        const colors: Record<string, string> = {
          light: '#3b82f6',
          dark: '#1e293b',
          'high-contrast': '#000000',
        }
        meta.setAttribute('content', colors[resolvedTheme.value])
      }
    }

    function setTheme(newMode: ThemeMode): void {
      mode.value = newMode
      applyTheme()
    }

    function cycleTheme(): void {
      const modes: ThemeMode[] = ['light', 'dark', 'high-contrast', 'system']
      const idx = modes.indexOf(mode.value)
      setTheme(modes[(idx + 1) % modes.length])
    }

    function init(): void {
      applyTheme()
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (mode.value === 'system') applyTheme()
      })
    }

    watch(mode, applyTheme)

    return { mode, resolvedTheme, isDark, isHighContrast, setTheme, cycleTheme, init, applyTheme }
  },
  { persist: { key: 'svianl_theme', pick: ['mode'] } },
)
