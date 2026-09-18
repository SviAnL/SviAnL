<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useBackTop } from '@/composables/useBackTop'

  const { visible, scrollToTop } = useBackTop()
</script>

<template>
  <Transition name="slide-left">
    <button
      v-show="visible"
      class="bg-primary hover:bg-primary/90 focus:ring-primary/50 fixed right-16 bottom-24 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-all hover:shadow-xl focus:ring-2 focus:outline-none md:bottom-8"
      aria-label="BackTop"
      @click="scrollToTop"
    >
      <Icon icon="mdi:arrow-up" />
    </button>
  </Transition>
</template>
