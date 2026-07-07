<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-surface py-8">
    <div class="container-main text-center">
      <p class="text-sm text-muted">{{ t('footer.copyright', { year }) }}</p>
      <p class="mt-1 text-xs text-muted/70">{{ t('footer.built') }}</p>
    </div>
  </footer>
</template>
