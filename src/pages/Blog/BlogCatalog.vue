<script setup lang="ts">
  import { blogApi } from '@/api'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseEmpty from '@/components/common/BaseEmpty.vue'
  import BasePagination from '@/components/common/BasePagination.vue'
  import BaseSkeleton from '@/components/common/BaseSkeleton.vue'
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

  function categoryChange(value: string) {
    category.value = value
    page.value = 1
  }

  onMounted(async () => {
    categories.value = await blogApi.getCategories()
    await fetchPosts()
  })

  watch([page, category], fetchPosts)

  let searchTimer: ReturnType<typeof setTimeout>
  watch(keyword, () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      page.value = 1
      fetchPosts()
    }, 300)
  })
</script>

<template>
  <div>
    <h1 v-reveal class="mb-8 text-3xl font-bold">
      {{ t('blog.title') }}
    </h1>

    <div v-reveal class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
      <input
        v-model="keyword"
        type="search"
        :placeholder="t('common.searchKeyWord')"
        class="border-border bg-surface focus:border-primary focus:ring-primary/30 flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
      />
      <div class="flex flex-wrap gap-2">
        <button
          class="cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="!category ? 'bg-primary text-white' : 'bg-surface-hover'"
          @click="categoryChange('')"
        >
          {{ t('common.all') }}
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="category === cat ? 'bg-primary text-white' : 'bg-surface-hover'"
          @click="categoryChange(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BaseSkeleton v-for="i in 6" :key="i" />
    </div>

    <BaseEmpty v-else-if="!posts.length" />

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BaseCard
        v-for="post in posts"
        :key="post.id"
        v-reveal
        class="cursor-pointer"
        @click="router.push(`/blog/${post.id}`)"
      >
        <img
          v-lazy="post.cover"
          :alt="post.title"
          class="mb-3 h-40 w-full rounded-lg object-cover"
        />
        <div class="text-primary flex items-center justify-between text-xs">
          <span class="text-secondary">{{ post.category }}</span>
          <div class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag" class="bg-primary/10 rounded-full px-3 py-1">
              {{ tag }}
            </span>
          </div>
        </div>
        <h3 class="mt-1 line-clamp-2 font-semibold break-all">
          {{ post.title }}
        </h3>
        <p class="text-muted mt-1 line-clamp-2 text-sm break-all">
          {{ post.summary }}
        </p>
        <div class="text-muted mt-3 flex items-center gap-3 text-xs">
          <span>{{ formatDate(post.createdAt) }}</span>
          <span>{{ post.readTime }}{{ t('common.minutes') }}</span>
          <span>{{ post.views }}{{ t('common.views') }}</span>
        </div>
      </BaseCard>
    </div>

    <BasePagination v-model:page="page" :total="total" :page-size="pageSize" />
  </div>
</template>
