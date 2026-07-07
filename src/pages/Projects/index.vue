<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { projectApi } from '@/api'
import BaseCard from '@/components/common/BaseCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import Empty from '@/components/common/Empty.vue'
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
  <div class="py-12">
    <div class="container-main">
      <h1 class="mb-8 text-3xl font-bold" v-reveal>{{ t('projects.title') }}</h1>

      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center" v-reveal>
        <input
          v-model="keyword"
          type="search"
          :placeholder="t('projects.search')"
          class="flex-1 rounded-lg border border-border bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div class="flex flex-wrap gap-2">
          <button
            class="rounded-lg px-3 py-1.5 text-sm transition-colors"
            :class="!category ? 'bg-primary text-white' : 'bg-surface-hover text-muted hover:text-foreground'"
            @click="category = ''; page = 1"
          >
            {{ t('common.all') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            class="rounded-lg px-3 py-1.5 text-sm transition-colors"
            :class="category === cat ? 'bg-primary text-white' : 'bg-surface-hover text-muted hover:text-foreground'"
            @click="category = cat; page = 1"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton v-for="i in 6" :key="i" />
      </div>
      <Empty v-else-if="!projects.length" />
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="project in projects"
          :key="project.id"
          hoverable
          class="cursor-pointer overflow-hidden !p-0"
          v-reveal
          @click="router.push(`/projects/${project.id}`)"
        >
          <img v-lazy="project.cover" :alt="project.title" class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div class="p-4">
            <span class="text-xs text-primary">{{ project.category }}</span>
            <h3 class="mt-1 font-semibold">{{ project.title }}</h3>
            <p class="mt-1 line-clamp-2 text-sm text-muted">{{ project.description }}</p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span v-for="tag in project.tags" :key="tag" class="rounded bg-surface-hover px-2 py-0.5 text-xs">{{ tag }}</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <Pagination v-model:page="page" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>
