<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { aboutApi } from '@/api'
import BaseCard from '@/components/common/BaseCard.vue'
import Loading from '@/components/common/Loading.vue'
import type { Profile } from '@/types'

const { t } = useI18n()
const loading = ref(true)
const profile = ref<Profile | null>(null)

onMounted(async () => {
  try {
    profile.value = await aboutApi.getProfile()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <Loading v-if="loading" fullscreen />
      <template v-else-if="profile">
        <!-- Profile Header -->
        <section class="mb-12 text-center" v-reveal>
          <img :src="profile.avatar" :alt="profile.name" class="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-primary/30" />
          <h1 class="text-3xl font-bold">{{ profile.name }}</h1>
          <p class="mt-2 text-lg text-muted">{{ profile.slogan }}</p>
          <p class="mx-auto mt-4 max-w-2xl text-muted">{{ profile.bio }}</p>
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <span v-for="tag in profile.tags" :key="tag" class="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{{ tag }}</span>
          </div>
        </section>

        <!-- Skills -->
        <section class="mb-12">
          <h2 class="mb-6 text-2xl font-bold" v-reveal>{{ t('about.skills') }}</h2>
          <div class="grid gap-6 md:grid-cols-3">
            <BaseCard v-for="skill in profile.skills" :key="skill.category" :title="skill.category" v-reveal>
              <div v-for="item in skill.items" :key="item.name" class="mb-3">
                <div class="mb-1 flex justify-between text-sm">
                  <span>{{ item.name }}</span>
                  <span class="text-muted">{{ item.level }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-surface-hover">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    :style="{ width: `${item.level}%` }"
                  />
                </div>
              </div>
            </BaseCard>
          </div>
        </section>

        <!-- Timeline -->
        <section class="mb-12">
          <h2 class="mb-6 text-2xl font-bold" v-reveal>{{ t('about.timeline') }}</h2>
          <div class="relative border-l-2 border-primary/30 pl-8">
            <div v-for="item in profile.timeline" :key="item.year" class="relative mb-8" v-reveal>
              <div class="absolute -left-[41px] h-4 w-4 rounded-full border-2 border-primary bg-surface" />
              <span class="text-sm font-bold text-primary">{{ item.year }}</span>
              <h3 class="mt-1 font-semibold">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-muted">{{ item.description }}</p>
            </div>
          </div>
        </section>

        <!-- Education & Contact -->
        <div class="grid gap-6 md:grid-cols-2">
          <BaseCard :title="t('about.education')" v-reveal>
            <div v-for="edu in profile.education" :key="edu.school" class="mb-3">
              <h4 class="font-medium">{{ edu.school }}</h4>
              <p class="text-sm text-muted">{{ edu.degree }} · {{ edu.period }}</p>
            </div>
          </BaseCard>
          <BaseCard :title="t('about.contact')" v-reveal>
            <p class="mb-2">📧 {{ profile.email }}</p>
            <p class="mb-4">📍 {{ profile.location }}</p>
            <h4 class="mb-2 font-medium">{{ t('about.social') }}</h4>
            <div class="flex gap-3">
              <a
                v-for="social in profile.socials"
                :key="social.platform"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-touch rounded-lg bg-surface-hover px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-white"
              >
                {{ social.platform }}
              </a>
            </div>
          </BaseCard>
        </div>
      </template>
    </div>
  </div>
</template>
