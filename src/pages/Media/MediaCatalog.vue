<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useScrollLock } from '@vueuse/core'
  import { mediaApi } from '@/api'
  import { VideoPlayer } from '@/components/business/video-player'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseEmpty from '@/components/common/BaseEmpty.vue'
  import BasePagination from '@/components/common/BasePagination.vue'
  import BaseSkeleton from '@/components/common/BaseSkeleton.vue'
  import { formatDuration } from '@/utils'
  import type { MediaItem } from '@/types'

  const { t } = useI18n()

  const isLocked = useScrollLock(document.body)

  const loading = ref(true)

  const mediaList = ref<MediaItem[]>([])

  const total = ref(0)

  const page = ref(1)

  const pageSize = ref(9)

  const categories = ref<string[]>([])

  const category = ref('')

  const selectedMedia = ref<MediaItem | null>()

  async function fetchMedia() {
    loading.value = true
    try {
      const res = await mediaApi.getList({
        page: page.value,
        pageSize: pageSize.value,
        category: category.value || undefined,
      })
      mediaList.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  function categoryChange(value: string) {
    category.value = value
    page.value = 1
  }

  function selectedChange(flag: boolean, value: MediaItem | null) {
    isLocked.value = flag
    selectedMedia.value = value
  }

  onMounted(async () => {
    categories.value = await mediaApi.getCategories()
    await fetchMedia()
  })

  watch([page, category], fetchMedia)
</script>

<template>
  <div>
    <h1 v-reveal class="mb-8 text-3xl font-bold">
      {{ t('media.title') }}
    </h1>

    <div v-reveal class="mb-6 flex flex-wrap gap-2">
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

    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseSkeleton v-for="i in 6" :key="i" />
    </div>

    <BaseEmpty v-else-if="!mediaList.length" />

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard
        v-for="item in mediaList"
        :key="item.id"
        v-reveal
        class="cursor-pointer overflow-hidden p-0!"
        @click="selectedChange(true, item)"
      >
        <div class="group relative">
          <img
            v-lazy="item.cover"
            :alt="item.title"
            class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <span
              class="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black"
            >
              <Icon icon="mdi:play" class="inline h-5 w-5" />
              {{ t('media.play') }}
            </span>
          </div>
          <span
            class="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white"
          >
            {{ formatDuration(item.duration) }}
          </span>
        </div>
        <div class="p-4">
          <h3 class="line-clamp-2 font-semibold break-all">
            {{ item.title }}
          </h3>
          <p class="text-muted mt-1 line-clamp-2 text-sm break-all">
            {{ item.description }}
          </p>
        </div>
      </BaseCard>
    </div>

    <BasePagination v-model:page="page" :total="total" :page-size="pageSize" />

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedMedia"
          class="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-4"
        >
          <div class="w-full max-w-4xl">
            <div class="mb-3 flex items-center justify-between gap-2">
              <h3 class="text-center text-lg font-semibold text-white">
                {{ selectedMedia.title }}
              </h3>
              <button
                class="flex cursor-pointer items-center justify-center text-xl text-white/70 transition-colors hover:text-white"
                @click="selectedChange(false, null)"
              >
                <Icon icon="mdi:close" />
              </button>
            </div>

            <VideoPlayer
              :src="selectedMedia.videoUrl"
              :poster="selectedMedia.cover"
              :title="selectedMedia.title"
              :video-id="selectedMedia.id"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
