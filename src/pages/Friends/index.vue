<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { friendsApi } from '@/api'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Loading from '@/components/common/Loading.vue'
import { isValidEmail } from '@/utils'
import type { FriendLink } from '@/types'

const { t } = useI18n()

const loading = ref(true)
const friends = ref<FriendLink[]>([])
const categories = ref<string[]>([])
const activeCategory = ref('')
const showApply = ref(false)
const submitting = ref(false)

const form = ref({ name: '', url: '', email: '', description: '' })
const errors = ref<Record<string, string>>({})

const filteredFriends = computed(() =>
  activeCategory.value ? friends.value.filter((f) => f.category === activeCategory.value) : friends.value,
)

onMounted(async () => {
  try {
    const [list, cats] = await Promise.all([friendsApi.getList(), friendsApi.getCategories()])
    friends.value = list
    categories.value = cats
  } finally {
    loading.value = false
  }
})

function validate(): boolean {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Required'
  if (!form.value.url.trim()) errors.value.url = 'Required'
  if (!isValidEmail(form.value.email)) errors.value.email = t('guestbook.emailInvalid')
  return Object.keys(errors.value).length === 0
}

async function submitApply() {
  if (!validate()) return
  submitting.value = true
  try {
    await friendsApi.apply(form.value)
    showApply.value = false
    form.value = { name: '', url: '', email: '', description: '' }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <div class="mb-8 flex items-center justify-between" v-reveal>
        <h1 class="text-3xl font-bold">{{ t('friends.title') }}</h1>
        <BaseButton variant="outline" @click="showApply = !showApply">{{ t('friends.apply') }}</BaseButton>
      </div>

      <!-- Apply Form -->
      <BaseCard v-if="showApply" class="mb-8" :title="t('friends.applyTitle')" v-reveal>
        <p class="mb-4 text-sm text-muted">{{ t('friends.applyNote') }}</p>
        <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="submitApply">
          <div>
            <label class="mb-1 block text-sm">{{ t('friends.siteName') }}</label>
            <input v-model="form.name" class="w-full rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label class="mb-1 block text-sm">{{ t('friends.siteUrl') }}</label>
            <input v-model="form.url" class="w-full rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label class="mb-1 block text-sm">{{ t('guestbook.email') }}</label>
            <input v-model="form.email" type="email" class="w-full rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label class="mb-1 block text-sm">{{ t('friends.siteDesc') }}</label>
            <input v-model="form.description" class="w-full rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
          </div>
          <div class="sm:col-span-2">
            <BaseButton type="submit" :loading="submitting">{{ t('common.submit') }}</BaseButton>
          </div>
        </form>
      </BaseCard>

      <div class="mb-6 flex flex-wrap gap-2" v-reveal>
        <button
          class="rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="!activeCategory ? 'bg-primary text-white' : 'bg-surface-hover'"
          @click="activeCategory = ''"
        >{{ t('common.all') }}</button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="rounded-lg px-3 py-1.5 text-sm transition-colors"
          :class="activeCategory === cat ? 'bg-primary text-white' : 'bg-surface-hover'"
          @click="activeCategory = cat"
        >{{ cat }}</button>
      </div>

      <Loading v-if="loading" />
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="friend in filteredFriends"
          :key="friend.id"
          :href="friend.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block"
        >
          <BaseCard hoverable v-reveal>
            <div class="flex items-center gap-3">
              <img :src="friend.avatar" :alt="friend.name" class="h-12 w-12 rounded-full" />
              <div>
                <h3 class="font-semibold">{{ friend.name }}</h3>
                <p class="line-clamp-1 text-sm text-muted">{{ friend.description }}</p>
              </div>
            </div>
          </BaseCard>
        </a>
      </div>
    </div>
  </div>
</template>
