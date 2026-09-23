<script setup lang="ts">
  import { useMusicStore } from '@/stores'
  import { useAudioSync } from './composables/useAudioSync'
  import { usePlayerDrag } from './composables/usePlayerDrag'
  import ExpandedPlayer from './ExpandedPlayer.vue'
  import MiniPlayer from './MiniPlayer.vue'
  import type { Position } from './types'

  const musicStore = useMusicStore()

  const audioRef = ref<HTMLAudioElement>()
  const playerRef = ref<HTMLElement>()

  /**
   * 展开时的临时显示位置。
   *
   * 展开后尺寸变大，可能在屏幕边缘放不下，需要对位置做边界约束；
   * 但这个约束只是为了"让展开态可见"，不应该污染 store 里
   * "收起态的逻辑位置"。否则收起时就回不到原位了。
   *
   * 约定：
   * - 展开时 ensureVisible() 把约束后的坐标写进 expandedPosition，不动 store
   * - 展开期间用户主动拖动时，才同步写回 store（收起后 mini 跟手）
   * - 收起时清空 expandedPosition，显示自然回到 store.position
   */
  const expandedPosition = ref<Position | null>(null)

  /* 拖拽 + 边界 */
  const { isDragging, onDragStart, ensureVisible } = usePlayerDrag({
    playerRef,
    getPosition: () => {
      // 展开且已有临时位置时，以临时位置为准（保证拖动从当前位置继续）
      if (musicStore.isExpanded && expandedPosition.value) {
        return expandedPosition.value
      }
      return musicStore.position
    },
    setPosition: (x, y) => {
      if (musicStore.isExpanded) {
        // 展开态：先写临时位置
        expandedPosition.value = { x, y }
        // 只有用户真正拖动时才回写 store，自动边界约束不回写
        if (isDragging.value) {
          musicStore.setPosition(x, y)
        }
      } else {
        musicStore.setPosition(x, y)
      }
    },
  })

  /* audio 同步 */
  const { onTimeUpdate, onEnded, onSeek } = useAudioSync(audioRef)

  /* 展开 / 收起 */
  watch(
    () => musicStore.isExpanded,
    async (expanded) => {
      if (expanded) {
        // 等 ExpandedPlayer 渲染后再做边界约束
        await ensureVisible()
      } else {
        // 收起：丢弃展开态的临时位置，回到 store 里的逻辑位置
        expandedPosition.value = null
        // 用迷你尺寸再约束一次，防止窗口变小后收起超出屏幕
        await nextTick()
        ensureVisible()
      }
    },
  )

  const displayPosition = computed(() => {
    if (musicStore.isExpanded && expandedPosition.value) {
      return expandedPosition.value
    }
    return musicStore.position
  })

  const style = computed(() => {
    const { x, y } = displayPosition.value
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
