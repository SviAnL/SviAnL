<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useMusicStore } from '@/stores'
  import { formatDuration } from '@/utils'

  defineProps<{ onSeek: (e: Event) => void }>()
  defineEmits<{ 'drag-start': [e: PointerEvent] }>()

  const { t } = useI18n()
  const musicStore = useMusicStore()
</script>

<template>
  <div
    class="border-border bg-surface w-72 cursor-move touch-none rounded-xl border p-4 shadow-xl"
    @pointerdown="$emit('drag-start', $event)"
  >
    <div class="mb-3 flex items-center justify-between">
      <span class="text-muted inline-flex items-center gap-1 text-sm font-medium">
        <Icon icon="mdi:music-note-eighth" />
        {{ t('music.nowPlaying') }}
      </span>
      <button class="hover:text-primary cursor-pointer p-1" @click="musicStore.toggleExpanded()">
        <Icon icon="mdi:arrow-down" />
      </button>
    </div>

    <div class="mb-3 flex items-center gap-3">
      <img
        class="pointer-events-none h-14 w-14 rounded-lg object-cover"
        :class="{ 'animate-spin-slow': musicStore.isPlaying }"
        :src="musicStore.currentSong?.cover"
      />
      <div class="min-w-0 flex-1">
        <p class="truncate font-medium">{{ musicStore.currentSong?.title }}</p>
        <p class="text-muted truncate text-sm">{{ musicStore.currentSong?.artist }}</p>
      </div>
    </div>

    <input
      type="range"
      class="accent-primary mb-2 w-full cursor-pointer"
      :max="musicStore.currentSong?.duration || 0"
      :value="musicStore.currentTime"
      @input="onSeek"
    />
    <div class="text-muted mb-3 flex justify-between text-xs">
      <span>{{ formatDuration(musicStore.currentTime) }}</span>
      <span>{{ formatDuration(musicStore.currentSong?.duration || 0) }}</span>
    </div>

    <div class="flex items-center justify-center gap-4">
      <button class="hover:text-primary cursor-pointer p-2" @click="musicStore.prev()">
        <Icon icon="mdi:skip-backward" />
      </button>
      <button
        class="bg-primary cursor-pointer rounded-full p-2.5 text-white transition-transform active:scale-95"
        @click="musicStore.toggle()"
      >
        <Icon :icon="musicStore.isPlaying ? 'mdi:pause' : 'mdi:play'" />
      </button>
      <button class="hover:text-primary cursor-pointer p-2" @click="musicStore.next()">
        <Icon icon="mdi:skip-forward" />
      </button>
    </div>

    <div class="mt-3 flex items-center gap-2 max-sm:hidden">
      <button class="cursor-pointer text-sm" @click="musicStore.toggleMute()">
        <Icon
          :icon="musicStore.isMuted ? 'mdi:volume-off' : 'mdi:volume'"
          :class="musicStore.isMuted ? 'text-error' : ''"
        />
      </button>
      <input
        type="range"
        class="accent-primary flex-1 cursor-pointer"
        min="0"
        max="1"
        step="0.01"
        :value="musicStore.volume"
        @input="musicStore.setVolume(Number(($event.target as HTMLInputElement).value))"
      />
    </div>
  </div>
</template>
