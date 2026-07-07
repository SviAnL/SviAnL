<script setup lang="ts">
import { useBackTop } from '@/composables/useScroll'

const { visible, scrollToTop } = useBackTop()
</script>

<template>
  <Transition name="fade">
    <button
      v-show="visible"
      class="btn-touch fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 md:bottom-8"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8l-6 6h12l-6-6z" />
      </svg>
    </button>
  </Transition>
</template>
