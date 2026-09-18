<script setup lang="ts">
  import { experienceApi } from '@/api'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseEmpty from '@/components/common/BaseEmpty.vue'
  import BasePagination from '@/components/common/BasePagination.vue'
  import BaseSkeleton from '@/components/common/BaseSkeleton.vue'
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

  function categoryChange(value: string) {
    category.value = value
    page.value = 1
  }

  onMounted(fetchItems)

  watch([page, category], fetchItems)
</script>

<template>
  <div>
    <h1 v-reveal class="mb-8 text-3xl font-bold">
      {{ t('experience.title') }}
    </h1>

    <div v-reveal class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="cursor-pointer rounded-lg px-4 py-2 text-sm transition-colors"
        :class="
          category === cat.key
            ? 'bg-primary text-white'
            : 'bg-surface-hover text-muted hover:text-foreground'
        "
        @click="categoryChange(cat.key)"
      >
        {{ cat.label }}
      </button>
    </div>

    <div v-if="loading" class="space-y-4">
      <BaseSkeleton v-for="i in 3" :key="i" :lines="2" />
    </div>

    <BaseEmpty v-else-if="!items.length" />

    <div v-else class="space-y-4">
      <BaseCard v-for="item in items" :key="item.id" v-reveal>
        <div class="flex items-start justify-between gap-4">
          <div>
            <span class="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs">
              {{ t(`experience.${item.category}`) }}
            </span>
            <h3 class="mt-2 font-semibold">
              {{ item.title }}
            </h3>
            <p class="text-muted mt-1 text-sm">
              {{ item.summary }}
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="bg-surface-hover rounded px-2 py-0.5 text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <span class="text-muted shrink-0 text-xs">{{ formatDate(item.createdAt) }}</span>
        </div>
      </BaseCard>
    </div>

    <BasePagination v-model:page="page" :total="total" :page-size="pageSize" />
  </div>
</template>
