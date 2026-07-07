<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import BackTop from '@/components/common/BackTop.vue'
import MusicPlayer from '@/components/business/MusicPlayer.vue'
import { useAppStore } from '@/stores'

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()

const transitionName = computed(() => route.meta.transition || 'fade')

watch(
  () => route.meta.titleKey,
  (key) => {
    if (key) {
      document.title = `${t(key)} | ${import.meta.env.VITE_APP_TITLE}`
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <BackTop />
    <MusicPlayer />

    <!-- 全局错误提示 -->
    <Transition name="fade">
      <div
        v-if="appStore.showErrorToast"
        class="fixed left-1/2 top-4 z-[9999] -translate-x-1/2 rounded-lg bg-error px-6 py-3 text-white shadow-lg"
        role="alert"
      >
        {{ appStore.errorMessage }}
      </div>
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
