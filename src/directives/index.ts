import type { Directive } from 'vue'

/** 图片懒加载指令 */
export const vLazy: Directive<HTMLImageElement, string> = {
  mounted(el, binding) {
    const src = binding.value
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.src = src
            el.classList.remove('opacity-0')
            observer.unobserve(el)
          }
        })
      },
      { rootMargin: '100px' },
    )
    el.classList.add('opacity-0', 'transition-opacity', 'duration-500')
    el.dataset.src = src
    observer.observe(el)
  },
}

/** 点击外部关闭指令 */
export const vClickOutside: Directive = {
  mounted(el, binding) {
    el._clickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  },
}

/** 滚动入场指令 */
export const vReveal: Directive = {
  mounted(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove('opacity-0', 'translate-y-8')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
  },
}

declare module 'vue' {
  interface HTMLElement {
    _clickOutside?: (event: MouseEvent) => void
  }
}
