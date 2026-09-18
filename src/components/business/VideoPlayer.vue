<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import {
    VIDEO_PLAYBACK_RATES,
    VIDEO_PROGRESS_STORAGE_KEY,
    MEDIA_ERROR_MESSAGE,
  } from '@/constants'
  import { useMusicStore } from '@/stores'
  import { formatDuration, toastError } from '@/utils'

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
    videoId: '',
  })

  const emit = defineEmits<{ play: []; pause: []; ended: [] }>()

  const { t } = useI18n()

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

  const storageKey = computed(() => `${VIDEO_PROGRESS_STORAGE_KEY}${props.videoId || props.src}`)

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

  function videoPlay() {
    isPlaying.value = true
    musicStore.pauseForVideo()
  }

  function videoEnded() {
    emit('ended')
    musicStore.resumeAfterVideo(props.autoResumeMusic)
  }

  function videoTimeUpdate() {
    currentTime.value = videoRef.value?.currentTime || 0
    saveProgress()
  }

  function videoLoadedMetadata() {
    duration.value = videoRef.value?.duration || 0
    loadProgress()
  }

  function showControlsTemporarily() {
    showControls.value = true
    if (controlsTimer) clearTimeout(controlsTimer)
    controlsTimer = setTimeout(() => {
      if (isPlaying.value) showControls.value = false
    }, 3000)
  }

  function videoError(e: Event) {
    const videoEl = e.target as HTMLVideoElement
    const code = videoEl.error?.code ?? 0
    const message = MEDIA_ERROR_MESSAGE[code] || t('video.unknownVideoError')
    toastError(message)
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
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
      class="aspect-video h-full w-full"
      :src="src"
      :poster="poster"
      :title="title"
      playsinline
      webkit-playsinline
      @play="videoPlay"
      @pause="isPlaying = false"
      @ended="videoEnded"
      @timeupdate="videoTimeUpdate"
      @loadedmetadata="videoLoadedMetadata"
      @waiting="isBuffering = true"
      @canplay="isBuffering = false"
      @click="togglePlay"
      @dblclick="toggleFullscreen"
      @error="videoError"
    ></video>

    <div v-if="isBuffering" class="absolute inset-0 flex items-center justify-center bg-black/50">
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white"
      ></div>
    </div>

    <div
      class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 transition-opacity"
      :class="showControls ? 'opacity-100' : 'opacity-0'"
    >
      <input
        type="range"
        class="accent-primary mb-2 w-full cursor-pointer"
        :max="duration"
        :value="currentTime"
        @input="seek"
      />
      <div class="flex items-center justify-between text-white">
        <div class="flex items-center gap-2">
          <button
            class="cursor-pointer p-1"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            @click="togglePlay"
          >
            <Icon :icon="isPlaying ? 'mdi:pause' : 'mdi:play'" />
          </button>
          <button class="cursor-pointer p-1" @click="toggleMute">
            <Icon
              :icon="isMuted ? 'mdi:volume-off' : 'mdi:volume'"
              :class="isMuted ? 'text-error' : ''"
            />
          </button>
          <input
            type="range"
            class="accent-primary w-20 cursor-pointer"
            min="0"
            max="1"
            step="0.01"
            :value="volume"
            @input="setVolume"
          />
          <span class="text-xs">
            {{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <select
            class="cursor-pointer rounded bg-white/20 px-2 py-1 text-xs text-white"
            :value="playbackRate"
            @change="setRate(Number(($event.target as HTMLSelectElement).value))"
          >
            <option
              v-for="rate in VIDEO_PLAYBACK_RATES"
              :key="rate"
              :value="rate"
              class="text-foreground bg-primary-foreground cursor-pointer"
            >
              {{ rate }}x
            </option>
          </select>
          <button class="cursor-pointer p-1" aria-label="Fullscreen" @click="toggleFullscreen">
            <Icon :icon="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
