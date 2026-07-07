<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { blogApi } from '@/api'
import BaseCard from '@/components/common/BaseCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import Empty from '@/components/common/Empty.vue'
import { formatDate } from '@/utils'
import type { BlogPost } from '@/types'

const { t } = useI18n()
const router = useRouter()

const loading = ref(true)
const posts = ref<BlogPost[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(9)
const keyword = ref('')
const category = ref('')
const categories = ref<string[]>([])

async function fetchPosts() {
  loading.value = true
  try {
    const res = await blogApi.getList({
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
      category: category.value || undefined,
    })
    posts.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  categories.value = await blogApi.getCategories()
  await fetchPosts()
})

watch([page, category], fetchPosts)

let searchTimer: ReturnType<typeof setTimeout>
watch(keyword, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; fetchPosts() }, 300)
})
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <h1 class="mb-8 text-3xl font-bold" v-reveal>{{ t('blog.title') }}</h1>

      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center" v-reveal>
        <input
          v-model="keyword"
          type="search"
          :placeholder="t('blog.search')"
          class="flex-1 rounded-lg border border-border bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div class="flex flex-wrap gap-2">
          <button
            class="rounded-lg px-3 py-1.5 text-sm transition-colors"
            :class="!category ? 'bg-primary text-white' : 'bg-surface-hover'"
            @click="category = ''; page = 1"
          >{{ t('common.all') }}</button>
          <button
            v-for="cat in categories"
            :key="cat"
            class="rounded-lg px-3 py-1.5 text-sm transition-colors"
            :class="category === cat ? 'bg-primary text-white' : 'bg-surface-hover'"
            @click="category = cat; page = 1"
          >{{ cat }}</button>
        </div>
      </div>

      <div v-if="loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton v-for="i in 6" :key="i" />
      </div>
      <Empty v-else-if="!posts.length" />
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="post in posts"
          :key="post.id"
          hoverable
          class="cursor-pointer"
          v-reveal
          @click="router.push(`/blog/${post.id}`)"
        >
          <img v-lazy="post.cover" :alt="post.title" class="mb-3 h-40 w-full rounded-lg object-cover" />
          <span class="text-xs text-primary">{{ post.category }}</span>
          <h3 class="mt-1 font-semibold line-clamp-2">{{ post.title }}</h3>
          <p class="mt-1 line-clamp-2 text-sm text-muted">{{ post.summary }}</p>
          <div class="mt-3 flex items-center gap-3 text-xs text-muted">
            <span>{{ formatDate(post.createdAt) }}</span>
            <span>{{ post.readTime }} {{ t('common.minutes') }}</span>
            <span>{{ post.views }} {{ t('common.views') }}</span>
          </div>
        </BaseCard>
      </div>

      <Pagination v-model:page="page" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>
