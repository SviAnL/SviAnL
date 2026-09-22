<script setup lang="ts">
  import { projectApi } from '@/api'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseEmpty from '@/components/common/BaseEmpty.vue'
  import BasePagination from '@/components/common/BasePagination.vue'
  import BaseSkeleton from '@/components/common/BaseSkeleton.vue'
  import type { Project } from '@/types'

  const { t } = useI18n()

  const router = useRouter()

  const loading = ref(true)

  const projects = ref<Project[]>([])

  const total = ref(0)

  const page = ref(1)

  const pageSize = ref(9)

  const keyword = ref('')

  const category = ref('')

  const categories = ref<string[]>([])

  async function fetchProjects() {
    loading.value = true
    try {
      const res = await projectApi.getList({
        page: page.value,
        pageSize: pageSize.value,
        keyword: keyword.value || undefined,
        category: category.value || undefined,
      })
      projects.value = res.list
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
    categories.value = await projectApi.getCategories()
    await fetchProjects()
  })

  watch([page, category], fetchProjects)

  let searchTimer: ReturnType<typeof setTimeout>

  watch(keyword, () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      page.value = 1
      fetchProjects()
    }, 300)
  })
</script>

<template>
  <div>
    <h1 v-reveal class="mb-8 text-3xl font-bold">
      {{ t('projects.title') }}
    </h1>

    <div v-reveal class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
      <input
        v-model="keyword"
        type="search"
        class="border-border bg-surface focus:border-primary focus:ring-primary/30 flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
        :placeholder="t('common.searchKeyWord')"
      />
      <div class="flex flex-wrap gap-2">
        <button
          class="cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="
            !category
              ? 'bg-primary text-white'
              : 'bg-surface-hover text-muted hover:text-foreground'
          "
          @click="categoryChange('')"
        >
          {{ t('common.all') }}
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="
            category === cat
              ? 'bg-primary text-white'
              : 'bg-surface-hover text-muted hover:text-foreground'
          "
          @click="categoryChange(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseSkeleton v-for="i in 6" :key="i" />
    </div>

    <BaseEmpty v-else-if="!projects.length" />

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard
        v-for="project in projects"
        :key="project.id"
        v-reveal
        class="cursor-pointer overflow-hidden p-0!"
        @click="router.push(`/projects/${project.id}`)"
      >
        <img
          v-lazy="project.cover"
          class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          :alt="project.title"
        />
        <div class="p-4">
          <span class="text-primary text-xs">{{ project.category }}</span>
          <h3 class="mt-1 font-semibold">
            {{ project.title }}
          </h3>
          <p class="text-muted mt-1 line-clamp-2 text-sm">
            {{ project.description }}
          </p>
          <div class="mt-2 flex flex-wrap gap-1">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="bg-surface-hover rounded px-2 py-0.5 text-xs"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </BaseCard>
    </div>

    <BasePagination v-model:page="page" :total="total" :page-size="pageSize" />
  </div>
</template>
