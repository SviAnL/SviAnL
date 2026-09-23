import { nextTick, onMounted, watch } from 'vue'
import { PLAY_EXCEPTION_MESSAGE } from '@/constants'
import { useMusicStore } from '@/stores'
import { toastError } from '@/utils'

export function useAudioSync(audioRef: Ref<HTMLAudioElement | undefined>) {
  const musicStore = useMusicStore()

  function onError(error: unknown) {
    const name = error instanceof DOMException ? error.name : 'NotSupportedError'
    toastError(PLAY_EXCEPTION_MESSAGE[name] ?? PLAY_EXCEPTION_MESSAGE.NotSupportedError)
  }

  /** 统一的播放入口，失败时提示并回滚播放状态 */
  function tryPlay() {
    if (!audioRef.value) return
    audioRef.value.play().catch((e) => {
      onError(e)
      musicStore.pause()
    })
  }

  /* store → audio */
  watch(
    () => musicStore.isPlaying,
    (playing) => {
      if (!audioRef.value) return
      if (playing) {
        tryPlay()
      } else {
        audioRef.value.pause()
      }
    },
  )

  watch(
    () => musicStore.currentIndex,
    () => {
      if (audioRef.value && musicStore.isPlaying) {
        nextTick(tryPlay)
      }
    },
  )

  // volume 和 isMuted 合并成一个 watch，避免两条链路互相覆盖
  watch([() => musicStore.volume, () => musicStore.isMuted], ([v, muted]) => {
    if (audioRef.value) audioRef.value.volume = muted ? 0 : v
  })

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
