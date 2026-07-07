import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/** 滚动入场动画观察器 */
export function useScrollReveal(threshold = 0.1) {
  const elements = ref<HTMLElement[]>([])

  let observer: IntersectionObserver | null = null

  function register(el: HTMLElement | null) {
    if (el && !elements.value.includes(el)) {
      elements.value.push(el)
      observer?.observe(el)
    }
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    elements.value.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => observer?.disconnect())

  return { register }
}

/** 阅读进度条 */
export function useReadingProgress() {
  const progress = ref(0)

  function update() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
    update()
  })

  onUnmounted(() => window.removeEventListener('scroll', update))

  return { progress }
}

/** 数字滚动动画 */
export function useCountUp(target: number, duration = 2000) {
  const current = ref(0)
  let animationId: number | null = null

  function start() {
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      current.value = Math.floor(eased * target)
      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }
    animationId = requestAnimationFrame(animate)
  }

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
  })

  return { current, start }
}

/** 返回顶部可见性 */
export function useBackTop(threshold = 300) {
  const visible = ref(false)

  function onScroll() {
    visible.value = window.scrollY > threshold
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { visible, scrollToTop }
}

/** 分页逻辑 */
export function usePagination(fetchFn: (page: number, pageSize: number) => Promise<void>) {
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const loading = ref(false)

  async function load() {
    loading.value = true
    try {
      await fetchFn(page.value, pageSize.value)
    } finally {
      loading.value = false
    }
  }

  function goTo(p: number) {
    page.value = p
    load()
  }

  function changePageSize(size: number) {
    pageSize.value = size
    page.value = 1
    load()
  }

  return { page, pageSize, total, loading, load, goTo, changePageSize }
}

/** 拖拽功能 */
export function useDraggable(containerRef: Ref<HTMLElement | null>) {
  const position = ref({ x: 0, y: 0 })
  const isDragging = ref(false)
  let startX = 0
  let startY = 0
  let initialX = 0
  let initialY = 0

  function onMouseDown(e: MouseEvent) {
    isDragging.value = true
    startX = e.clientX
    startY = e.clientY
    initialX = position.value.x
    initialY = position.value.y
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging.value) return
    position.value = {
      x: initialX + e.clientX - startX,
      y: initialY + e.clientY - startY,
    }
  }

  function onMouseUp() {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  })

  return { position, isDragging, onMouseDown }
}
