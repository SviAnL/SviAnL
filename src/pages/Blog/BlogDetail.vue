<script setup lang="ts">
  import { blogApi } from '@/api'
  import BaseCard from '@/components/common/BaseCard.vue'
  import { sanitizeHtml, formatDate } from '@/utils'
  import type { BlogPost } from '@/types'

  const route = useRoute()

  const router = useRouter()

  const { t } = useI18n()

  const post = ref<BlogPost>()

  const related = ref<BlogPost[]>([])

  const parsed = computed(() => {
    if (!post.value) return { html: '', toc: [] as { id: string; text: string; level: number }[] }

    const container = document.createElement('div')
    container.innerHTML = post.value.content

    const headings = Array.from(container.querySelectorAll('h2, h3'))
    const toc = headings.map((el, i) => {
      const id = `blog-heading-${i}`
      el.id = id
      return {
        id,
        text: el.textContent?.trim() ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      }
    })

    return { html: container.innerHTML, toc }
  })

  const toc = computed(() => parsed.value.toc)

  const contentHtml = computed(() => sanitizeHtml(parsed.value.html))

  function scrollToHeading(e: MouseEvent, id: string) {
    e.preventDefault()

    const el = document.getElementById(id)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })

    history.replaceState(null, '', `#${id}`)
  }

  function scrollToHash() {
    const hash = decodeURIComponent(location.hash.slice(1))
    if (!hash) return

    const el = document.getElementById(hash)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'auto' })
  }

  watch(
    () => parsed.value.html,
    () => nextTick(scrollToHash),
  )

  onMounted(async () => {
    const id = route.params.id as string
    const [detail, rel] = await Promise.all([blogApi.getDetail(id), blogApi.getRelated(id)])
    post.value = detail
    related.value = rel

    nextTick(scrollToHash)
    window.addEventListener('load', scrollToHash)
  })

  onUnmounted(() => {
    window.removeEventListener('load', scrollToHash)
  })
</script>

<template>
  <div>
    <article v-if="post">
      <header v-reveal class="mb-8 text-center">
        <h1 class="text-3xl font-bold md:text-4xl">{{ post.title }}</h1>
        <div class="text-muted mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <span class="text-secondary">{{ post.category }}</span>
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="bg-primary/10 text-primary rounded-full px-3 py-1"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center justify-center gap-4 whitespace-nowrap">
            <span>{{ formatDate(post.createdAt) }}</span>
            <span>{{ post.readTime }}{{ t('common.minutes') }}</span>
            <span>{{ post.views }}{{ t('common.views') }}</span>
          </div>
        </div>
        <img
          v-lazy="post.cover"
          :alt="post.title"
          class="mx-auto mt-6 h-100 max-h-80 w-full rounded-xl object-cover"
        />
      </header>

      <div class="grid gap-8 lg:grid-cols-4">
        <aside v-if="toc.length" v-reveal class="hidden lg:block">
          <div class="sticky top-24">
            <BaseCard :title="t('blog.toc')" padding="sm">
              <nav class="space-y-2">
                <a
                  v-for="item in toc"
                  :key="item.id"
                  :href="`#${item.id}`"
                  class="text-muted hover:text-primary block text-sm transition-colors"
                  :class="item.level === 3 ? 'pl-4' : ''"
                  @click="scrollToHeading($event, item.id)"
                >
                  {{ item.text }}
                </a>
              </nav>
            </BaseCard>
          </div>
        </aside>

        <div v-reveal class="prose max-w-none min-w-0 lg:col-span-3" v-html="contentHtml"></div>
      </div>

      <section v-if="related.length" class="mt-12">
        <h2 v-reveal class="mb-6 text-2xl font-bold">
          {{ t('blog.related') }}
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <BaseCard
            v-for="rel in related"
            :key="rel.id"
            v-reveal
            class="cursor-pointer"
            @click="router.push(`/blog/${rel.id}`)"
          >
            <h3 class="line-clamp-1 font-semibold break-all">
              {{ rel.title }}
            </h3>
            <p class="text-muted mt-1 line-clamp-2 text-sm break-all">
              {{ rel.summary }}
            </p>
          </BaseCard>
        </div>
      </section>
    </article>
  </div>
</template>
