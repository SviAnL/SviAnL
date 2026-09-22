import { onMounted, watch } from 'vue'
import { PLAY_EXCEPTION_MESSAGE } from '@/constants'
import { useMusicStore } from '@/stores'
import { toastError } from '@/utils'

export function useAudioSync(audioRef: Ref<HTMLAudioElement | undefined>) {
  const musicStore = useMusicStore()

  function onError(error: DOMException) {
    toastError(PLAY_EXCEPTION_MESSAGE[error.name ?? 'NotSupportedError'])
  }

  /* store → audio */
  watch(
    () => musicStore.isPlaying,
    (playing) => {
      if (!audioRef.value) return
      if (playing) {
        audioRef.value.play().catch((e) => {
          onError(e)
          musicStore.pause()
        })
      } else {
        audioRef.value.pause()
      }
    },
  )

  watch(
    () => musicStore.currentIndex,
    () => {
      if (audioRef.value && musicStore.isPlaying) {
        nextTick(() => audioRef.value?.play())
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

  /* audio → store */
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

  onMounted(() => {
    // 挂载时同步一次音量，避免初始值不同步
    if (audioRef.value) {
      audioRef.value.volume = musicStore.isMuted ? 0 : musicStore.volume
    }
  })

  return { onTimeUpdate, onEnded, onSeek }
}
