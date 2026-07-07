<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import anime from 'animejs'
import { homeApi } from '@/api'
import { useCountUp } from '@/composables/useScroll'
import BaseCard from '@/components/common/BaseCard.vue'
import Loading from '@/components/common/Loading.vue'
import { formatDate, prefersReducedMotion } from '@/utils'
import type { BlogPost, Project, SiteStats } from '@/types'

const { t } = useI18n()
const router = useRouter()

const loading = ref(true)
const stats = ref<SiteStats | null>(null)
const projects = ref<Project[]>([])
const posts = ref<BlogPost[]>([])

const visitsCount = useCountUp(0)
const projectsCount = useCountUp(0)
const articlesCount = useCountUp(0)
const experiencesCount = useCountUp(0)

const skillTags = ['Vue.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite', 'Pinia', 'Docker', 'Git']

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

function initAnimations() {
  if (prefersReducedMotion()) return

  anime({
    targets: '.hero-title .char',
    opacity: [0, 1],
    translateY: [40, 0],
    delay: anime.stagger(80),
    easing: 'easeOutExpo',
    duration: 1200,
  })

  anime({
    targets: '.hero-avatar',
    scale: [0.8, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic(1, .6)',
    duration: 1500,
    delay: 500,
  })

  anime({
    targets: '.float-tag',
    translateY: () => anime.random(-8, 8),
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: () => anime.random(2000, 4000),
    delay: anime.stagger(200),
  })

  anime({
    targets: '.reveal-item',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(150, { start: 800 }),
    easing: 'easeOutQuad',
    duration: 800,
  })
}

function startCountUp() {
  if (!stats.value) return
  visitsCount.current.value = 0
  projectsCount.current.value = 0
  articlesCount.current.value = 0
  experiencesCount.current.value = 0

  const vc = useCountUp(stats.value.visits)
  const pc = useCountUp(stats.value.projects)
  const ac = useCountUp(stats.value.articles)
  const ec = useCountUp(stats.value.experiences)

  visitsCount.current = vc.current
  projectsCount.current = pc.current
  articlesCount.current = ac.current
  experiencesCount.current = ec.current

  vc.start()
  pc.start()
  ac.start()
  ec.start()
}

onMounted(async () => {
  await fetchData()
  initAnimations()
  startCountUp()
})
</script>

<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center py-20">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div class="container-main relative z-10">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 class="hero-title mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span v-for="(char, i) in t('home.slogan')" :key="i" class="char inline-block opacity-0">{{ char === ' ' ? '\u00A0' : char }}</span>
            </h1>
            <p class="reveal-item mb-8 text-lg text-muted opacity-0">
              Full-Stack Developer · Open Source Enthusiast · Tech Blogger
            </p>
            <div class="reveal-item flex flex-wrap gap-3 opacity-0">
              <span
                v-for="tag in skillTags"
                :key="tag"
                class="float-tag rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="hero-avatar relative opacity-0">
              <div class="absolute inset-0 animate-pulse-slow rounded-full bg-primary/20 blur-2xl" />
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=SviAnL"
                alt="Avatar"
                class="relative h-48 w-48 rounded-full border-4 border-primary/30 object-cover md:h-64 md:w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Dashboard -->
    <section class="border-y border-border bg-surface/50 py-12">
      <div class="container-main">
        <Loading v-if="loading" />
        <div v-else class="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div v-for="(item, idx) in [
            { label: t('home.stats.visits'), value: visitsCount.current },
            { label: t('home.stats.projects'), value: projectsCount.current },
            { label: t('home.stats.articles'), value: articlesCount.current },
            { label: t('home.stats.experiences'), value: experiencesCount.current },
          ]" :key="idx" class="reveal-item text-center opacity-0" v-reveal>
            <div class="text-3xl font-bold text-primary md:text-4xl">{{ item.value }}</div>
            <div class="mt-1 text-sm text-muted">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-16">
      <div class="container-main">
        <h2 class="mb-8 text-2xl font-bold" v-reveal>{{ t('home.featured') }}</h2>
        <Loading v-if="loading" />
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BaseCard
            v-for="project in projects"
            :key="project.id"
            hoverable
            class="cursor-pointer overflow-hidden !p-0"
            v-reveal
            @click="router.push(`/projects/${project.id}`)"
          >
            <img v-lazy="project.cover" :alt="project.title" class="h-48 w-full object-cover" />
            <div class="p-4">
              <h3 class="font-semibold">{{ project.title }}</h3>
              <p class="mt-1 line-clamp-2 text-sm text-muted">{{ project.description }}</p>
              <div class="mt-2 flex flex-wrap gap-1">
                <span v-for="tag in project.tags" :key="tag" class="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">{{ tag }}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="bg-surface/50 py-16">
      <div class="container-main">
        <h2 class="mb-8 text-2xl font-bold" v-reveal>{{ t('home.latest') }}</h2>
        <Loading v-if="loading" />
        <div v-else class="grid gap-6 md:grid-cols-3">
          <BaseCard
            v-for="post in posts"
            :key="post.id"
            hoverable
            class="cursor-pointer"
            v-reveal
            @click="router.push(`/blog/${post.id}`)"
          >
            <img v-lazy="post.cover" :alt="post.title" class="mb-3 h-40 w-full rounded-lg object-cover" />
            <h3 class="font-semibold line-clamp-1">{{ post.title }}</h3>
            <p class="mt-1 line-clamp-2 text-sm text-muted">{{ post.summary }}</p>
            <p class="mt-2 text-xs text-muted">{{ formatDate(post.createdAt) }}</p>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>
