<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'
import LangSwitch from '@/components/common/LangSwitch.vue'

const route = useRoute()
const { t } = useI18n()
const menuOpen = ref(false)

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/about', label: t('nav.about') },
  { path: '/projects', label: t('nav.projects') },
  { path: '/blog', label: t('nav.blog') },
  { path: '/experience', label: t('nav.experience') },
  { path: '/media', label: t('nav.media') },
  { path: '/guestbook', label: t('nav.guestbook') },
  { path: '/friends', label: t('nav.friends') },
])

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 glass">
    <nav class="container-main flex h-16 items-center justify-between" aria-label="Main navigation">
      <RouterLink to="/" class="text-xl font-bold text-gradient" @click="closeMenu">
        SviAnL
      </RouterLink>

      <!-- Desktop Nav -->
      <div class="hidden items-center gap-1 lg:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="btn-touch rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-hover"
          :class="isActive(item.path) ? 'text-primary' : 'text-muted hover:text-foreground'"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-2">
        <LangSwitch class="hidden sm:flex" />
        <ThemeSwitch />
        <button
          class="btn-touch rounded-lg p-2 lg:hidden"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!menuOpen" stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <Transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 z-40 lg:hidden" @click="closeMenu">
        <div class="absolute inset-0 bg-black/50" />
        <aside
          class="absolute right-0 top-0 h-full w-72 bg-surface p-6 shadow-xl"
          role="dialog"
          aria-label="Mobile menu"
          @click.stop
        >
          <div class="mb-6 flex items-center justify-between">
            <span class="text-lg font-bold">Menu</span>
            <button class="btn-touch p-2" aria-label="Close menu" @click="closeMenu">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <LangSwitch class="mb-4" />
          <nav class="flex flex-col gap-1">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="btn-touch rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-surface-hover"
              :class="isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-foreground'"
              @click="closeMenu"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </aside>
      </div>
    </Transition>
  </header>
</template>
