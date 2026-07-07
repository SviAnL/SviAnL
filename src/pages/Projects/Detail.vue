<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projectApi } from '@/api'
import VideoPlayer from '@/components/business/VideoPlayer.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Loading from '@/components/common/Loading.vue'
import { sanitizeHtml } from '@/utils'
import type { Project } from '@/types'

const route = useRoute()
const { t } = useI18n()
const loading = ref(true)
const project = ref<Project | null>(null)

onMounted(async () => {
  try {
    project.value = await projectApi.getDetail(route.params.id as string)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <Loading v-if="loading" fullscreen />
      <template v-else-if="project">
        <h1 class="mb-6 text-3xl font-bold" v-reveal>{{ project.title }}</h1>

        <div v-if="project.videoUrl" class="mb-8" v-reveal>
          <VideoPlayer :src="project.videoUrl" :poster="project.cover" :title="project.title" :video-id="project.id" />
        </div>

        <div class="mb-6 flex flex-wrap gap-2" v-reveal>
          <span v-for="tag in project.tags" :key="tag" class="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{{ tag }}</span>
        </div>

        <div class="prose mb-8 max-w-none text-foreground" v-html="sanitizeHtml(project.content)" v-reveal />

        <div class="flex flex-wrap gap-4" v-reveal>
          <BaseButton v-if="project.demoUrl" variant="primary" @click="window.open(project.demoUrl, '_blank')">
            {{ t('projects.demo') }}
          </BaseButton>
          <BaseButton v-if="project.repoUrl" variant="outline" @click="window.open(project.repoUrl, '_blank')">
            {{ t('projects.repo') }}
          </BaseButton>
        </div>
      </template>
    </div>
  </div>
</template>
