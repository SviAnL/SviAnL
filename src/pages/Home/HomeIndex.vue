<script setup lang="ts">
  import { homeApi } from '@/api'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseLoading from '@/components/common/BaseLoading.vue'
  import { formatDate } from '@/utils'
  import type { BlogPost, Project, SiteStats } from '@/types'

  const { t } = useI18n()

  const router = useRouter()

  const loading = ref(true)

  const projects = ref<Project[]>([])

  const posts = ref<BlogPost[]>([])

  const stats = ref<SiteStats>()

  const skillTags = [
    'Vue.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'Vite',
    'Pinia',
    'Docker',
    'Git',
  ]

  const statItems = computed(() => [
    { label: t('home.stats.visits'), value: stats.value?.visits },
    { label: t('home.stats.projects'), value: stats.value?.projects },
    { label: t('home.stats.articles'), value: stats.value?.articles },
    { label: t('home.stats.experiences'), value: stats.value?.experiences },
  ])

  async function fetchData() {
    loading.value = true
    try {
      const [s, p, b] = await Promise.all([
        homeApi.getStats(),
        homeApi.getFeaturedProjects(),
        homeApi.getLatestPosts(),
      ])
      stats.value = s
      projects.value = p
      posts.value = b
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await fetchData()
  })
</script>

<template>
  <div>
    <section class="relative flex items-center py-20">
      <div class="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 class="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            <span v-for="(char, i) in t('home.slogan')" :key="i" class="inline-block">
              {{ char === ' ' ? '\u00A0' : char }}
            </span>
          </h1>
          <p class="text-muted mb-8 text-lg">
            Full-Stack Developer · Open Source Enthusiast · Tech Blogger
          </p>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="tag in skillTags"
              :key="tag"
              class="border-border bg-surface rounded-full border px-4 py-2 text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="relative">
            <div
              class="animate-pulse-slow bg-primary/20 absolute inset-0 rounded-full blur-2xl"
            ></div>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=SviAnL"
              alt="Avatar"
              class="border-primary/30 relative h-48 w-48 rounded-full border-4 object-cover md:h-64 md:w-64"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="border-border border-y py-12">
      <BaseLoading v-if="loading" />
      <div v-else class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div v-for="(item, idx) in statItems" :key="idx" class="text-center">
          <div class="text-primary text-3xl font-bold md:text-4xl">
            {{ item.value }}
          </div>
          <div class="text-muted mt-1 text-sm">
            {{ item.label }}
          </div>
        </div>
      </div>
    </section>

    <section class="py-8">
      <h2 v-reveal class="mb-8 text-2xl font-bold">
        {{ t('home.featured') }}
      </h2>
      <BaseLoading v-if="loading" />
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="project in projects"
          :key="project.id"
          v-reveal
          class="cursor-pointer overflow-hidden p-0!"
          @click="router.push(`/projects/${project.id}`)"
        >
          <img v-lazy="project.cover" :alt="project.title" class="h-48 w-full object-cover" />
          <div class="p-4">
            <h3 class="line-clamp-1 font-semibold break-all">
              {{ project.title }}
            </h3>
            <p class="text-muted mt-1 line-clamp-2 text-sm break-all">
              {{ project.description }}
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>

    <section class="bg-surface/50">
      <h2 v-reveal class="mb-8 text-2xl font-bold">{{ t('home.latest') }}</h2>
      <BaseLoading v-if="loading" />
      <div v-else class="grid gap-6 md:grid-cols-3">
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
          <h3 class="line-clamp-1 font-semibold break-all">
            {{ post.title }}
          </h3>
          <p class="text-muted mt-1 line-clamp-2 text-sm break-all">
            {{ post.summary }}
          </p>
          <p class="text-muted mt-2 text-xs">
            {{ formatDate(post.createdAt) }}
          </p>
        </BaseCard>
      </div>
    </section>
  </div>
</template>
