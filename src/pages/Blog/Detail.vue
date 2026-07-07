<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { blogApi } from '@/api'
import { useReadingProgress } from '@/composables/useScroll'
import BaseCard from '@/components/common/BaseCard.vue'
import Loading from '@/components/common/Loading.vue'
import { sanitizeHtml, formatDate } from '@/utils'
import type { BlogPost } from '@/types'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { progress } = useReadingProgress()

const loading = ref(true)
const post = ref<BlogPost | null>(null)
const related = ref<BlogPost[]>([])

const toc = computed(() => {
  if (!post.value) return []
  const headings = post.value.content.match(/<h[23][^>]*>(.*?)<\/h[23]>/g) || []
  return headings.map((h, i) => ({
    id: `heading-${i}`,
    text: h.replace(/<[^>]+>/g, ''),
    level: h.startsWith('<h2') ? 2 : 3,
  }))
})

onMounted(async () => {
  const id = route.params.id as string
  try {
    const [detail, rel] = await Promise.all([blogApi.getDetail(id), blogApi.getRelated(id)])
    post.value = detail
    related.value = rel
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="py-12">
    <!-- Reading Progress Bar -->
    <div class="fixed left-0 top-16 z-40 h-1 w-full bg-border">
      <div class="h-full bg-primary transition-all duration-150" :style="{ width: `${progress}%` }" />
    </div>

    <div class="container-main">
      <Loading v-if="loading" fullscreen />
      <template v-else-if="post">
        <article class="mx-auto max-w-4xl">
          <header class="mb-8 text-center" v-reveal>
            <span class="text-sm text-primary">{{ post.category }}</span>
            <h1 class="mt-2 text-3xl font-bold md:text-4xl">{{ post.title }}</h1>
            <div class="mt-4 flex items-center justify-center gap-4 text-sm text-muted">
              <span>{{ formatDate(post.createdAt) }}</span>
              <span>{{ post.readTime }} {{ t('common.minutes') }}</span>
              <span>{{ post.views }} {{ t('common.views') }}</span>
            </div>
            <img v-lazy="post.cover" :alt="post.title" class="mx-auto mt-6 max-h-80 rounded-xl object-cover" />
          </header>

          <div class="grid gap-8 lg:grid-cols-4">
            <!-- TOC Sidebar -->
            <aside v-if="toc.length" class="hidden lg:block">
              <div class="sticky top-24">
                <BaseCard :title="t('blog.toc')" padding="sm">
                  <nav class="space-y-2">
                    <a
                      v-for="item in toc"
                      :key="item.id"
                      :href="`#${item.id}`"
                      class="block text-sm text-muted transition-colors hover:text-primary"
                      :class="item.level === 3 ? 'pl-4' : ''"
                    >
                      {{ item.text }}
                    </a>
                  </nav>
                </BaseCard>
              </div>
            </aside>

            <div class="prose max-w-none text-foreground lg:col-span-3" v-html="sanitizeHtml(post.content)" v-reveal />
          </div>

          <!-- Related Posts -->
          <section v-if="related.length" class="mt-12">
            <h2 class="mb-6 text-2xl font-bold" v-reveal>{{ t('blog.related') }}</h2>
            <div class="grid gap-4 md:grid-cols-3">
              <BaseCard
                v-for="rel in related"
                :key="rel.id"
                hoverable
                class="cursor-pointer"
                v-reveal
                @click="router.push(`/blog/${rel.id}`)"
              >
                <h3 class="font-semibold line-clamp-2">{{ rel.title }}</h3>
                <p class="mt-1 line-clamp-2 text-sm text-muted">{{ rel.summary }}</p>
              </BaseCard>
            </div>
          </section>
        </article>
      </template>
    </div>
  </div>
</template>
