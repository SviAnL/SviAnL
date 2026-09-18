<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useMusicStore } from '@/stores'
  import { formatDuration, debounce } from '@/utils'

  const { t } = useI18n()

  const musicStore = useMusicStore()
  const audioRef = ref<HTMLAudioElement | null>(null)
  const playerRef = ref<HTMLElement | null>(null)
  const isDragging = ref(false)
  const dragOffset = ref({ x: 0, y: 0 })

  const style = computed(() => {
    const { x, y } = musicStore.position
    if (x === -1 && y === -1) {
      return { bottom: '80px', right: '24px' }
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
    const rect = playerRef.value?.getBoundingClientRect()
    if (!rect) return

    // 计算目标坐标
    let targetX = e.clientX - dragOffset.value.x
    let targetY = e.clientY - dragOffset.value.y

    // 边界限制
    const winW = window.innerWidth
    const winH = window.innerHeight
    const playerW = rect.width
    const playerH = rect.height

    // 最小0，最大 窗口宽 - 元素宽
    targetX = Math.max(0, Math.min(targetX, winW - playerW))
    targetY = Math.max(0, Math.min(targetY, winH - playerH))

    musicStore.setPosition(targetX, targetY)
  }

  function onDragEnd() {
    isDragging.value = false
  }

  function fixPositionBoundary() {
    const rect = playerRef.value?.getBoundingClientRect()
    if (!rect) return
    const winW = window.innerWidth
    const winH = window.innerHeight
    const playerW = rect.width
    const playerH = rect.height
    const pos = musicStore.position
    const newX = Math.max(0, Math.min(pos.x, winW - playerW))
    const newY = Math.max(0, Math.min(pos.y, winH - playerH))
    musicStore.setPosition(newX, newY)
  }

  const debouncedFixBoundary = debounce(fixPositionBoundary, 100)

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
    window.addEventListener('resize', debouncedFixBoundary)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('resize', debouncedFixBoundary)
  })
</script>

<template>
  <div
    ref="playerRef"
    class="fixed z-50 select-none"
    role="region"
    aria-label="Music player"
    :style="style"
  >
    <audio
      ref="audioRef"
      :src="musicStore.currentSong?.url"
      :volume="musicStore.isMuted ? 0 : musicStore.volume"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
    ></audio>

    <div
      v-if="!musicStore.isExpanded"
      class="border-border bg-surface flex cursor-move items-center gap-2 rounded-full border p-2 shadow-lg"
      @mousedown="onDragStart"
    >
      <img
        class="h-10 w-10 rounded-full object-cover"
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

    <div
      v-else
      class="border-border bg-surface w-72 cursor-move rounded-xl border p-4 shadow-xl"
      @mousedown="onDragStart"
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
          class="h-14 w-14 rounded-lg object-cover"
          :class="{ 'animate-spin-slow': musicStore.isPlaying }"
          :src="musicStore.currentSong?.cover"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate font-medium">
            {{ musicStore.currentSong?.title }}
          </p>
          <p class="text-muted truncate text-sm">
            {{ musicStore.currentSong?.artist }}
          </p>
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
      <div class="mt-3 flex items-center gap-2">
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
  </div>
</template>
