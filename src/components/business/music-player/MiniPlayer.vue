<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useMusicStore } from '@/stores'

  defineEmits<{ 'drag-start': [e: PointerEvent] }>()

  const musicStore = useMusicStore()
</script>

<template>
  <div
    class="border-border bg-surface flex cursor-move touch-none items-center gap-2 rounded-full border p-2 shadow-lg"
    @pointerdown="$emit('drag-start', $event)"
  >
    <img
      class="pointer-events-none h-10 w-10 rounded-full object-cover"
      :class="{ 'animate-spin-slow': musicStore.isPlaying }"
      :src="musicStore.currentSong?.cover"
      :alt="musicStore.currentSong?.title"
    />
    <button
      class="hover:bg-surface-hover cursor-pointer rounded-full p-2"
      @click="musicStore.toggle()"
    >
      <Icon :icon="musicStore.isPlaying ? 'mdi:pause' : 'mdi:play'" />
    </button>
    <button
      class="hover:bg-surface-hover cursor-pointer rounded-full p-2"
      @click="musicStore.toggleExpanded()"
    >
      <Icon icon="mdi:arrow-up" />
    </button>
  </div>
</template>
