<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { aboutApi } from '@/api'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseLoading from '@/components/common/BaseLoading.vue'
  import type { Profile } from '@/types'

  const { t } = useI18n()

  const loading = ref(true)

  const profile = ref<Profile>()

  onMounted(async () => {
    try {
      profile.value = await aboutApi.getProfile()
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <div>
    <BaseLoading v-if="loading" />

    <template v-else-if="profile">
      <!-- Profile Header -->
      <section v-reveal class="mb-12 text-center">
        <img
          class="border-primary/30 mx-auto mb-4 h-32 w-32 rounded-full border-4"
          :src="profile.avatar"
          :alt="profile.name"
        />
        <h1 class="text-3xl font-bold">
          {{ profile.name }}
        </h1>
        <p class="text-muted mt-2 text-lg">
          {{ profile.slogan }}
        </p>
        <p class="text-muted mx-auto mt-4 max-w-2xl">
          {{ profile.bio }}
        </p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <span
            v-for="tag in profile.tags"
            :key="tag"
            class="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm transition-colors hover:scale-105"
          >
            {{ tag }}
          </span>
        </div>
      </section>

      <!-- Skills -->
      <section class="mb-12">
        <h2 v-reveal class="mb-6 text-2xl font-bold">
          {{ t('about.skills') }}
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <BaseCard
            v-for="skill in profile.skills"
            :key="skill.category"
            v-reveal
            :title="skill.category"
          >
            <div v-for="item in skill.items" :key="item.name" class="mb-3">
              <div class="mb-1 flex justify-between text-sm">
                <span>{{ item.name }}</span>
                <span class="text-muted">{{ item.level }}%</span>
              </div>
              <div class="bg-surface-hover h-2 overflow-hidden rounded-full">
                <div
                  class="from-primary to-accent h-full rounded-full bg-linear-to-r transition-all duration-1000"
                  :style="{ width: `${item.level}%` }"
                ></div>
              </div>
            </div>
          </BaseCard>
        </div>
      </section>

      <!-- Timeline -->
      <section class="mb-12">
        <h2 v-reveal class="mb-6 text-2xl font-bold">
          {{ t('about.timeline') }}
        </h2>
        <div class="border-primary/30 relative ml-3 border-l-2 pr-2 pl-8">
          <div v-for="item in profile.timeline" :key="item.year" v-reveal class="relative mb-8">
            <div
              class="border-primary bg-surface absolute -left-10.25 h-4 w-4 rounded-full border-2"
            ></div>
            <span class="text-primary text-sm font-bold">{{ item.year }}</span>
            <h3 class="mt-1 font-semibold">
              {{ item.title }}
            </h3>
            <p class="text-muted mt-1 text-sm">
              {{ item.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Education & Contact -->
      <div class="grid gap-6 md:grid-cols-2">
        <BaseCard v-reveal :title="t('about.education')">
          <div v-for="edu in profile.education" :key="edu.school" class="mb-3">
            <h4 class="font-medium">
              {{ edu.school }}
            </h4>
            <p class="text-muted text-sm">{{ edu.degree }} · {{ edu.period }}</p>
          </div>
        </BaseCard>
        <BaseCard v-reveal :title="t('about.contact')">
          <p class="mb-2 flex items-center gap-3">
            <Icon icon="mdi:email" />
            {{ profile.email }}
          </p>
          <p class="mb-4 flex items-center gap-3">
            <Icon icon="mdi:flag-variant" />
            {{ profile.location }}
          </p>
          <h4 class="mb-2 font-medium">
            {{ t('about.social') }}
          </h4>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="social in profile.socials"
              :key="social.platform"
              :aria-label="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:bg-primary/10 hover:text-primary inline-flex items-center justify-center rounded-lg p-3 transition-all duration-200 hover:scale-110"
            >
              <Icon :icon="social.icon" />
            </a>
          </div>
        </BaseCard>
      </div>
    </template>
  </div>
</template>
