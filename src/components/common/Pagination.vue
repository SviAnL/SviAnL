<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  total: number
  page: number
  pageSize: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:page': [page: number] }>()

const { t } = useI18n()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const pages = computed(() => {
  const result: (number | '...')[] = []
  const tp = totalPages.value
  const cp = props.page

  if (tp <= 7) {
    for (let i = 1; i <= tp; i++) result.push(i)
  } else {
    result.push(1)
    if (cp > 3) result.push('...')
    for (let i = Math.max(2, cp - 1); i <= Math.min(tp - 1, cp + 1); i++) result.push(i)
    if (cp < tp - 2) result.push('...')
    result.push(tp)
  }
  return result
})

function goTo(p: number) {
  if (p >= 1 && p <= totalPages.value && p !== props.page) {
    emit('update:page', p)
  }
}
</script>

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2 py-6" aria-label="Pagination">
    <button
      class="btn-touch rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-hover disabled:opacity-50"
      :disabled="page <= 1"
      :aria-label="t('common.prev')"
      @click="goTo(page - 1)"
    >
      {{ t('common.prev') }}
    </button>

    <template v-for="(p, idx) in pages" :key="idx">
      <span v-if="p === '...'" class="px-2 text-muted">...</span>
      <button
        v-else
        class="btn-touch min-w-[44px] rounded-lg px-3 py-2 text-sm transition-colors"
        :class="p === page ? 'bg-primary text-white' : 'border border-border hover:bg-surface-hover'"
        :aria-current="p === page ? 'page' : undefined"
        @click="goTo(p as number)"
      >
        {{ p }}
      </button>
    </template>

    <button
      class="btn-touch rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-hover disabled:opacity-50"
      :disabled="page >= totalPages"
      :aria-label="t('common.next')"
      @click="goTo(page + 1)"
    >
      {{ t('common.next') }}
    </button>
  </nav>
</template>
