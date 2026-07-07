<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { experienceApi } from '@/api'
import BaseCard from '@/components/common/BaseCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import Empty from '@/components/common/Empty.vue'
import { formatDate } from '@/utils'
import type { ExperienceItem } from '@/types'

const { t } = useI18n()

const loading = ref(true)
const items = ref<ExperienceItem[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const category = ref('')

const categories = computed(() => [
  { key: '', label: t('common.all') },
  { key: 'tutorial', label: t('experience.tutorial') },
  { key: 'note', label: t('experience.note') },
  { key: 'pitfall', label: t('experience.pitfall') },
  { key: 'resource', label: t('experience.resource') },
])

async function fetchItems() {
  loading.value = true
  try {
    const res = await experienceApi.getList({
      page: page.value,
      pageSize: pageSize.value,
      category: category.value || undefined,
    })
    items.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

onMounted(fetchItems)
watch([page, category], fetchItems)
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <h1 class="mb-8 text-3xl font-bold" v-reveal>{{ t('experience.title') }}</h1>

      <div class="mb-6 flex flex-wrap gap-2" v-reveal>
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="rounded-lg px-4 py-2 text-sm transition-colors"
          :class="category === cat.key ? 'bg-primary text-white' : 'bg-surface-hover text-muted hover:text-foreground'"
          @click="category = cat.key; page = 1"
        >
          {{ cat.label }}
        </button>
      </div>

      <div v-if="loading" class="space-y-4">
        <Skeleton v-for="i in 5" :key="i" :lines="2" />
      </div>
      <Empty v-else-if="!items.length" />
      <div v-else class="space-y-4">
        <BaseCard
          v-for="item in items"
          :key="item.id"
          hoverable
          v-reveal
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {{ t(`experience.${item.category}`) }}
              </span>
              <h3 class="mt-2 font-semibold">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-muted">{{ item.summary }}</p>
              <div class="mt-2 flex flex-wrap gap-1">
                <span v-for="tag in item.tags" :key="tag" class="rounded bg-surface-hover px-2 py-0.5 text-xs">{{ tag }}</span>
              </div>
            </div>
            <span class="shrink-0 text-xs text-muted">{{ formatDate(item.createdAt) }}</span>
          </div>
        </BaseCard>
      </div>

      <Pagination v-model:page="page" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>
