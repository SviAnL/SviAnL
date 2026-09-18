<script setup lang="ts">
  import { projectApi } from '@/api'
  import VideoPlayer from '@/components/business/VideoPlayer.vue'
  import BaseButton from '@/components/common/BaseButton.vue'
  import BaseLoading from '@/components/common/BaseLoading.vue'
  import { sanitizeHtml } from '@/utils'
  import type { Project } from '@/types'

  const route = useRoute()

  const { t } = useI18n()

  const loading = ref(true)

  const project = ref<Project>()

  const openExternal = (url?: string) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  onMounted(async () => {
    try {
      project.value = await projectApi.getDetail(route.params.id as string)
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <div>
    <BaseLoading v-if="loading" />

    <template v-else-if="project">
      <h1 v-reveal class="mb-6 text-3xl font-bold">
        {{ project.title }}
      </h1>

      <div v-if="project.videoUrl" v-reveal class="mb-8">
        <VideoPlayer
          :src="project.videoUrl"
          :poster="project.cover"
          :title="project.title"
          :video-id="project.id"
        />
      </div>

      <div v-reveal class="mb-6 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
        >
          {{ tag }}
        </span>
      </div>

      <div v-reveal class="prose mb-8 max-w-none" v-html="sanitizeHtml(project.content)"></div>

      <div v-reveal class="flex flex-wrap gap-4">
        <BaseButton v-if="project.demoUrl" variant="primary" @click="openExternal(project.demoUrl)">
          {{ t('projects.demo') }}
        </BaseButton>
        <BaseButton v-if="project.repoUrl" variant="outline" @click="openExternal(project.repoUrl)">
          {{ t('projects.repo') }}
        </BaseButton>
      </div>
    </template>
  </div>
</template>
