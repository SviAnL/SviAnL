<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { mediaApi } from '@/api'
import VideoPlayer from '@/components/business/VideoPlayer.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import Empty from '@/components/common/Empty.vue'
import { formatDuration } from '@/utils'
import type { MediaItem } from '@/types'

const { t } = useI18n()

const loading = ref(true)
const mediaList = ref<MediaItem[]>([])
const categories = ref<string[]>([])
const category = ref('')
const selectedMedia = ref<MediaItem | null>(null)

async function fetchMedia() {
  loading.value = true
  try {
    const res = await mediaApi.getList({ page: 1, pageSize: 20, category: category.value || undefined })
    mediaList.value = res.list
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  categories.value = await mediaApi.getCategories()
  await fetchMedia()
})

watch(category, fetchMedia)
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <h1 class="mb-8 text-3xl font-bold" v-reveal>{{ t('media.title') }}</h1>

      <div class="mb-6 flex flex-wrap gap-2" v-reveal>
        <button
          class="rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="!category ? 'bg-primary text-white' : 'bg-surface-hover'"
          @click="category = ''"
        >{{ t('common.all') }}</button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="category === cat ? 'bg-primary text-white' : 'bg-surface-hover'"
          @click="category = cat"
        >{{ cat }}</button>
      </div>

      <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton v-for="i in 6" :key="i" />
      </div>
      <Empty v-else-if="!mediaList.length" />
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="item in mediaList"
          :key="item.id"
          hoverable
          class="cursor-pointer overflow-hidden !p-0"
          v-reveal
          @click="selectedMedia = item"
        >
          <div class="group relative">
            <img v-lazy="item.cover" :alt="item.title" class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span class="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black">▶ {{ t('media.play') }}</span>
            </div>
            <span class="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
              {{ formatDuration(item.duration) }}
            </span>
          </div>
          <div class="p-4">
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="mt-1 line-clamp-2 text-sm text-muted">{{ item.description }}</p>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedMedia" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" @click.self="selectedMedia = null">
          <div class="w-full max-w-4xl">
            <VideoPlayer
              :src="selectedMedia.videoUrl"
              :poster="selectedMedia.cover"
              :title="selectedMedia.title"
              :video-id="selectedMedia.id"
            />
            <h3 class="mt-4 text-center text-lg font-semibold text-white">{{ selectedMedia.title }}</h3>
            <button class="mx-auto mt-4 block text-white/70 hover:text-white" @click="selectedMedia = null">✕ Close</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
