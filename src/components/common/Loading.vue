<script setup lang="ts">
interface Props {
  fullscreen?: boolean
  text?: string
}

withDefaults(defineProps<Props>(), {
  fullscreen: false,
  text: '',
})
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center',
      fullscreen ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm' : 'py-8',
    ]"
    role="status"
    :aria-label="text || 'Loading'"
  >
    <div class="flex flex-col items-center gap-3">
      <div class="relative h-10 w-10">
        <div class="absolute inset-0 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
      <p v-if="text" class="text-sm text-muted">{{ text }}</p>
    </div>
  </div>
</template>
