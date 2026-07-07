<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  description?: string
  action?: string
}

withDefaults(defineProps<Props>(), {
  description: '',
  action: '',
})

const { t } = useI18n()
const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center" role="status">
    <div class="mb-4 text-6xl opacity-30" aria-hidden="true">📭</div>
    <p class="mb-2 text-lg font-medium text-foreground">
      <slot>{{ t('common.empty') }}</slot>
    </p>
    <p v-if="description" class="mb-4 text-sm text-muted">{{ description }}</p>
    <button
      v-if="action"
      class="btn-touch rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
      @click="emit('action')"
    >
      {{ action }}
    </button>
  </div>
</template>
