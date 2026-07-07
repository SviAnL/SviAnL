<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useMusicStore } from '@/stores'
import { formatDuration } from '@/utils'
import { PLAYBACK_RATES } from '@/constants'

interface Props {
  src: string
  poster?: string
  title?: string
  autoResumeMusic?: boolean
  videoId?: string
}

const props = withDefaults(defineProps<Props>(), {
  poster: '',
  title: '',
  autoResumeMusic: true,
})

const emit = defineEmits<{ play: []; pause: []; ended: [] }>()

const musicStore = useMusicStore()
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isMuted = ref(false)
const playbackRate = ref(1)
const isFullscreen = ref(false)
const isBuffering = ref(false)
const showControls = ref(true)
let controlsTimer: ReturnType<typeof setTimeout> | null = null

const storageKey = computed(() => `video_progress_${props.videoId || props.src}`)

function saveProgress() {
  if (videoRef.value) {
    localStorage.setItem(storageKey.value, String(videoRef.value.currentTime))
  }
}

function loadProgress() {
  const saved = localStorage.getItem(storageKey.value)
  if (saved && videoRef.value) {
    videoRef.value.currentTime = Number(saved)
  }
}

function togglePlay() {
  if (!videoRef.value) return
  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    musicStore.pauseForVideo()
    videoRef.value.play()
  }
}

function toggleMute() {
  isMuted.value = !isMuted.value
  if (videoRef.value) videoRef.value.muted = isMuted.value
}

function setVolume(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  volume.value = v
  if (videoRef.value) {
    videoRef.value.volume = v
    isMuted.value = v === 0
  }
}

function seek(e: Event) {
  const t = Number((e.target as HTMLInputElement).value)
  if (videoRef.value) {
    videoRef.value.currentTime = t
    currentTime.value = t
  }
}

function setRate(rate: number) {
  playbackRate.value = rate
  if (videoRef.value) videoRef.value.playbackRate = rate
}

function toggleFullscreen() {
  const container = videoRef.value?.parentElement
  if (!container) return
  if (!document.fullscreenElement) {
    container.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (!videoRef.value) return
  switch (e.key) {
    case ' ':
      e.preventDefault()
      togglePlay()
      break
    case 'ArrowRight':
      videoRef.value.currentTime += 5
      break
    case 'ArrowLeft':
      videoRef.value.currentTime -= 5
      break
    case 'f':
      toggleFullscreen()
      break
    case 'm':
      toggleMute()
      break
  }
}

function showControlsTemporarily() {
  showControls.value = true
  if (controlsTimer) clearTimeout(controlsTimer)
  controlsTimer = setTimeout(() => {
    if (isPlaying.value) showControls.value = false
  }, 3000)
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  saveProgress()
  if (controlsTimer) clearTimeout(controlsTimer)
})

watch(isPlaying, (playing) => {
  if (playing) emit('play')
  else {
    emit('pause')
    musicStore.resumeAfterVideo(props.autoResumeMusic)
  }
})
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-xl bg-black"
    @mousemove="showControlsTemporarily"
    @mouseleave="isPlaying && (showControls = false)"
  >
    <video
      ref="videoRef"
      class="aspect-video w-full"
      :src="src"
      :poster="poster"
      :title="title"
      playsinline
      @play="isPlaying = true; musicStore.pauseForVideo()"
      @pause="isPlaying = false"
      @ended="emit('ended'); musicStore.resumeAfterVideo(autoResumeMusic)"
      @timeupdate="currentTime = videoRef?.currentTime || 0; saveProgress()"
      @loadedmetadata="duration = videoRef?.duration || 0; loadProgress()"
      @waiting="isBuffering = true"
      @canplay="isBuffering = false"
      @click="togglePlay"
    />

    <div v-if="isBuffering" class="absolute inset-0 flex items-center justify-center bg-black/50">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>

    <div
      class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity"
      :class="showControls ? 'opacity-100' : 'opacity-0'"
    >
      <input
        type="range"
        class="mb-2 w-full accent-primary"
        :max="duration"
        :value="currentTime"
        @input="seek"
      />
      <div class="flex items-center justify-between text-white">
        <div class="flex items-center gap-2">
          <button class="btn-touch p-1" :aria-label="isPlaying ? 'Pause' : 'Play'" @click="togglePlay">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="btn-touch p-1" @click="toggleMute">{{ isMuted ? '🔇' : '🔊' }}</button>
          <input type="range" class="w-20 accent-primary" min="0" max="1" step="0.01" :value="volume" @input="setVolume" />
          <span class="text-xs">{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <select
            class="rounded bg-white/20 px-2 py-1 text-xs text-white"
            :value="playbackRate"
            @change="setRate(Number(($event.target as HTMLSelectElement).value))"
          >
            <option v-for="rate in PLAYBACK_RATES" :key="rate" :value="rate">{{ rate }}x</option>
          </select>
          <button class="btn-touch p-1" aria-label="Fullscreen" @click="toggleFullscreen">⛶</button>
        </div>
      </div>
    </div>
  </div>
</template>
