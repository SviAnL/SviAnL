import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Song } from '@/types'

const DEFAULT_PLAYLIST: Song[] = [
  {
    id: '1',
    title: 'Spring Day',
    artist: 'BTS',
    cover: 'https://picsum.photos/seed/music1/200/200',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 348,
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://picsum.photos/seed/music2/200/200',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 200,
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://picsum.photos/seed/music3/200/200',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 203,
  },
  {
    id: '4',
    title: 'Stay',
    artist: 'The Kid LAROI',
    cover: 'https://picsum.photos/seed/music4/200/200',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 141,
  },
  {
    id: '5',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    cover: 'https://picsum.photos/seed/music5/200/200',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 178,
  },
]

export const useMusicStore = defineStore(
  'music',
  () => {
    const playlist = ref<Song[]>(DEFAULT_PLAYLIST)
    const currentIndex = ref(0)
    const isPlaying = ref(false)
    const currentTime = ref(0)
    const volume = ref(0.7)
    const isMuted = ref(false)
    const isExpanded = ref(false)
    const wasPlayingBeforeVideo = ref(false)
    const position = ref({ x: -1, y: -1 })

    const currentSong = computed(() => playlist.value[currentIndex.value])
    const progress = computed(() => {
      if (!currentSong.value?.duration) return 0
      return (currentTime.value / currentSong.value.duration) * 100
    })

    function play(): void {
      isPlaying.value = true
    }

    function pause(): void {
      isPlaying.value = false
    }

    function toggle(): void {
      isPlaying.value = !isPlaying.value
    }

    function next(): void {
      currentIndex.value = (currentIndex.value + 1) % playlist.value.length
      currentTime.value = 0
    }

    function prev(): void {
      currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
      currentTime.value = 0
    }

    function setVolume(v: number): void {
      volume.value = Math.max(0, Math.min(1, v))
      isMuted.value = v === 0
    }

    function toggleMute(): void {
      isMuted.value = !isMuted.value
    }

    function setCurrentTime(t: number): void {
      currentTime.value = t
    }

    function toggleExpanded(): void {
      isExpanded.value = !isExpanded.value
    }

    function pauseForVideo(): void {
      wasPlayingBeforeVideo.value = isPlaying.value
      pause()
    }

    function resumeAfterVideo(autoResume = true): void {
      if (autoResume && wasPlayingBeforeVideo.value) {
        play()
      }
    }

    function setPosition(x: number, y: number): void {
      position.value = { x, y }
    }

    return {
      playlist,
      currentIndex,
      isPlaying,
      currentTime,
      volume,
      isMuted,
      isExpanded,
      position,
      currentSong,
      progress,
      play,
      pause,
      toggle,
      next,
      prev,
      setVolume,
      toggleMute,
      setCurrentTime,
      toggleExpanded,
      pauseForVideo,
      resumeAfterVideo,
      setPosition,
    }
  },
  {
    persist: {
      key: 'svianl_music',
      pick: ['currentIndex', 'volume', 'isMuted', 'position'],
    },
  },
)
