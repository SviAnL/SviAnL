import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from '@/utils'
import type { DragOffset } from '../types'

interface Options {
  playerRef: Ref<HTMLElement | undefined>
  getPosition: () => { x: number; y: number }
  setPosition: (x: number, y: number) => void
}

export function usePlayerDrag({ playerRef, getPosition, setPosition }: Options) {
  const isDragging = ref(false)
  const dragOffset = ref<DragOffset>({ x: 0, y: 0 })
  const activePointerId = ref<number | null>(null)

  /* 边界约束 */
  function clampPosition(x: number, y: number) {
    const rect = playerRef.value?.getBoundingClientRect()
    if (!rect) return { x, y }

    const winW = window.innerWidth
    const winH = window.innerHeight
    const playerW = rect.width
    const playerH = rect.height

    const clampedX = Math.max(0, Math.min(x, Math.max(0, winW - playerW)))
    const clampedY = Math.max(0, Math.min(y, Math.max(0, winH - playerH)))
    return { x: clampedX, y: clampedY }
  }

  /** 确保播放器完整显示在可视区域内（窗口 resize / 展开时调用） */
  async function ensureVisible() {
    await nextTick()
    const rect = playerRef.value?.getBoundingClientRect()
    if (!rect) return

    const pos = getPosition()
    const winW = window.innerWidth
    const winH = window.innerHeight
    const playerW = rect.width
    const playerH = rect.height

    // 初始位置 (-1, -1)：贴到右下角
    if (pos.x === -1 && pos.y === -1) {
      const newX = Math.max(0, winW - playerW)
      const newY = Math.max(0, winH - playerH)
      setPosition(newX, newY)
      return
    }

    const { x, y } = clampPosition(pos.x, pos.y)
    if (x !== pos.x || y !== pos.y) {
      setPosition(x, y)
    }
  }

  /* 拖拽处理 */
  function onDragStart(e: PointerEvent) {
    // 忽略按钮 / 输入控件上的按下
    if ((e.target as HTMLElement).closest('button, input')) return
    if (e.button !== 0 && e.pointerType === 'mouse') return

    isDragging.value = true
    activePointerId.value = e.pointerId

    const rect = playerRef.value?.getBoundingClientRect()
    if (rect) {
      dragOffset.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    // 捕获指针，避免手指移出元素后事件丢失
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    e.preventDefault()
  }

  function onDragMove(e: PointerEvent) {
    if (!isDragging.value) return
    if (activePointerId.value !== null && e.pointerId !== activePointerId.value) return

    const rect = playerRef.value?.getBoundingClientRect()
    if (!rect) return

    const targetX = e.clientX - dragOffset.value.x
    const targetY = e.clientY - dragOffset.value.y
    const { x, y } = clampPosition(targetX, targetY)
    setPosition(x, y)

    e.preventDefault()
  }

  function onDragEnd(e?: PointerEvent) {
    if (e && activePointerId.value !== null && e.pointerId !== activePointerId.value) return
    isDragging.value = false
    activePointerId.value = null
  }

  const debouncedEnsureVisible = debounce(ensureVisible, 100)

  onMounted(() => {
    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragEnd)
    window.addEventListener('pointercancel', onDragEnd)
    window.addEventListener('resize', debouncedEnsureVisible)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onDragMove)
    window.removeEventListener('pointerup', onDragEnd)
    window.removeEventListener('pointercancel', onDragEnd)
    window.removeEventListener('resize', debouncedEnsureVisible)
  })

  return {
    isDragging,
    onDragStart,
    ensureVisible,
  }
}
