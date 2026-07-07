<script setup lang="ts">
interface Props {
  lines?: number
}

withDefaults(defineProps<Props>(), { lines: 3 })
</script>

<template>
  <div class="animate-pulse space-y-3" aria-hidden="true">
    <div class="h-48 rounded-xl bg-surface-hover" />
    <div class="h-4 w-3/4 rounded bg-surface-hover" />
    <div v-for="i in lines - 1" :key="i" class="h-3 rounded bg-surface-hover" :class="`w-${['full', '5/6', '4/6'][i % 3]}`" />
  </div>
</template>
