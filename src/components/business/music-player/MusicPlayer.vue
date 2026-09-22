<script setup lang="ts">
  import { useMusicStore } from '@/stores'
  import { useAudioSync } from './composables/useAudioSync'
  import { usePlayerDrag } from './composables/usePlayerDrag'
  import ExpandedPlayer from './ExpandedPlayer.vue'
  import MiniPlayer from './MiniPlayer.vue'

  const musicStore = useMusicStore()

  const audioRef = ref<HTMLAudioElement>()
  const playerRef = ref<HTMLElement>()

  /* 拖拽 + 边界 */
  const { onDragStart, ensureVisible } = usePlayerDrag({
    playerRef,
    getPosition: () => musicStore.position,
    setPosition: (x, y) => musicStore.setPosition(x, y),
  })

  /* audio 同步 */
  const { onTimeUpdate, onEnded, onSeek } = useAudioSync(audioRef)

  /* 展开时可见性 */
  watch(
    () => musicStore.isExpanded,
    (expanded) => {
      if (expanded) ensureVisible()
    },
  )

  const style = computed(() => {
    const { x, y } = musicStore.position
    if (x === -1 && y === -1) {
      return { bottom: '80px', right: '24px' }
    }
    return { bottom: 'auto', right: 'auto', left: `${x}px`, top: `${y}px` }
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

    <MiniPlayer v-if="!musicStore.isExpanded" @drag-start="onDragStart" />
    <ExpandedPlayer v-else :on-seek="onSeek" @drag-start="onDragStart" />
  </div>
</template>
