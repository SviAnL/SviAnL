<script setup lang="ts">
import { cn } from '@/utils'

interface Props {
  title?: string
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  glass?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: true,
  padding: 'md',
  glass: false,
})

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-border bg-surface',
        paddingMap[padding],
        hoverable && 'card-hover',
        glass && 'glass',
      )
    "
  >
    <h3 v-if="title" class="mb-3 text-lg font-semibold text-foreground">{{ title }}</h3>
    <slot />
  </div>
</template>
