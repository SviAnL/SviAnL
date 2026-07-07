<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useMusicStore } from '@/stores'
import { formatDuration } from '@/utils'

const musicStore = useMusicStore()
const audioRef = ref<HTMLAudioElement | null>(null)
const playerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const style = computed(() => {
  const { x, y } = musicStore.position
  if (x === -1 && y === -1) {
    return { bottom: '24px', right: '24px' }
  }
  return { bottom: 'auto', right: 'auto', left: `${x}px`, top: `${y}px` }
})

function onDragStart(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('button, input')) return
  isDragging.value = true
  const rect = playerRef.value?.getBoundingClientRect()
  if (rect) {
    dragOffset.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
}

function onDragMove(e: MouseEvent) {
  if (!isDragging.value) return
  musicStore.setPosition(e.clientX - dragOffset.value.x, e.clientY - dragOffset.value.y)
}

function onDragEnd() {
  isDragging.value = false
}

function onTimeUpdate() {
  if (audioRef.value) musicStore.setCurrentTime(audioRef.value.currentTime)
}

function onEnded() {
  musicStore.next()
}

function onSeek(e: Event) {
  const val = Number((e.target as HTMLInputElement).value)
  if (audioRef.value) {
    audioRef.value.currentTime = val
    musicStore.setCurrentTime(val)
  }
}

watch(
  () => musicStore.isPlaying,
  (playing) => {
    if (!audioRef.value) return
    if (playing) audioRef.value.play().catch(() => musicStore.pause())
    else audioRef.value.pause()
  },
)

watch(
  () => musicStore.currentIndex,
  () => {
    if (audioRef.value && musicStore.isPlaying) {
      nextTick(() => audioRef.value?.play().catch(() => {}))
    }
  },
)

watch(
  () => musicStore.volume,
  (v) => {
    if (audioRef.value) audioRef.value.volume = musicStore.isMuted ? 0 : v
  },
)

watch(
  () => musicStore.isMuted,
  (m) => {
    if (audioRef.value) audioRef.value.volume = m ? 0 : musicStore.volume
  },
)

onMounted(() => {
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
})
</script>

<template>
  <div
    ref="playerRef"
    class="fixed z-50 select-none"
    :style="style"
    role="region"
    aria-label="Music player"
  >
    <audio
      ref="audioRef"
      :src="musicStore.currentSong?.url"
      :volume="musicStore.isMuted ? 0 : musicStore.volume"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
    />

    <!-- Mini Mode -->
    <div
      v-if="!musicStore.isExpanded"
      class="flex cursor-move items-center gap-2 rounded-full border border-border bg-surface p-2 shadow-lg"
      @mousedown="onDragStart"
    >
      <img
        :src="musicStore.currentSong?.cover"
        :alt="musicStore.currentSong?.title"
        class="h-10 w-10 rounded-full object-cover"
        :class="{ 'animate-spin-slow': musicStore.isPlaying }"
      />
      <button class="btn-touch rounded-full p-2 hover:bg-surface-hover" @click="musicStore.toggle()">
        {{ musicStore.isPlaying ? '⏸' : '▶' }}
      </button>
      <button class="btn-touch rounded-full p-2 hover:bg-surface-hover" @click="musicStore.toggleExpanded()">
        ⬆
      </button>
    </div>

    <!-- Expanded Mode -->
    <div
      v-else
      class="w-72 cursor-move rounded-xl border border-border bg-surface p-4 shadow-xl"
      @mousedown="onDragStart"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm font-medium text-muted">🎵 Now Playing</span>
        <button class="btn-touch p-1 hover:text-primary" @click="musicStore.toggleExpanded()">⬇</button>
      </div>
      <div class="mb-3 flex items-center gap-3">
        <img
          :src="musicStore.currentSong?.cover"
          class="h-14 w-14 rounded-lg object-cover"
          :class="{ 'animate-spin-slow': musicStore.isPlaying }"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate font-medium">{{ musicStore.currentSong?.title }}</p>
          <p class="truncate text-sm text-muted">{{ musicStore.currentSong?.artist }}</p>
        </div>
      </div>
      <input
        type="range"
        class="mb-2 w-full accent-primary"
        :max="musicStore.currentSong?.duration || 0"
        :value="musicStore.currentTime"
        @input="onSeek"
      />
      <div class="mb-3 flex justify-between text-xs text-muted">
        <span>{{ formatDuration(musicStore.currentTime) }}</span>
        <span>{{ formatDuration(musicStore.currentSong?.duration || 0) }}</span>
      </div>
      <div class="flex items-center justify-center gap-4">
        <button class="btn-touch p-2 hover:text-primary" @click="musicStore.prev()">⏮</button>
        <button class="btn-touch rounded-full bg-primary p-3 text-white" @click="musicStore.toggle()">
          {{ musicStore.isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="btn-touch p-2 hover:text-primary" @click="musicStore.next()">⏭</button>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <button class="btn-touch text-sm" @click="musicStore.toggleMute()">
          {{ musicStore.isMuted ? '🔇' : '🔊' }}
        </button>
        <input
          type="range"
          class="flex-1 accent-primary"
          min="0"
          max="1"
          step="0.01"
          :value="musicStore.volume"
          @input="musicStore.setVolume(Number(($event.target as HTMLInputElement).value))"
        />
      </div>
    </div>
  </div>
</template>
