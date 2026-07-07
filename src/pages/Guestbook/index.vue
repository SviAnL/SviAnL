<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { guestbookApi } from '@/api'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Pagination from '@/components/common/Pagination.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import { sanitizeHtml, formatRelativeTime, isValidEmail } from '@/utils'
import type { GuestbookMessage } from '@/types'

const { t } = useI18n()

const loading = ref(true)
const submitting = ref(false)
const messages = ref<GuestbookMessage[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)

const form = ref({ nickname: '', email: '', content: '' })
const errors = ref<Record<string, string>>({})

async function fetchMessages() {
  loading.value = true
  try {
    const res = await guestbookApi.getList({ page: page.value, pageSize: pageSize.value })
    messages.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

function validate(): boolean {
  errors.value = {}
  if (!form.value.nickname.trim()) errors.value.nickname = t('guestbook.nicknameRequired')
  if (!isValidEmail(form.value.email)) errors.value.email = t('guestbook.emailInvalid')
  if (!form.value.content.trim()) errors.value.content = t('guestbook.contentRequired')
  else if (form.value.content.trim().length < 5) errors.value.content = t('guestbook.contentMin')
  return Object.keys(errors.value).length === 0
}

async function submit() {
  if (!validate()) return
  submitting.value = true
  try {
    await guestbookApi.submit(form.value)
    form.value = { nickname: '', email: '', content: '' }
    page.value = 1
    await fetchMessages()
  } finally {
    submitting.value = false
  }
}

async function likeMessage(id: string) {
  const res = await guestbookApi.like(id)
  const msg = messages.value.find((m) => m.id === id)
  if (msg) msg.likes = res.likes
}

onMounted(fetchMessages)
watch(page, fetchMessages)
</script>

<template>
  <div class="py-12">
    <div class="container-main max-w-3xl">
      <h1 class="mb-8 text-3xl font-bold text-center" v-reveal>{{ t('guestbook.title') }}</h1>

      <!-- Form -->
      <BaseCard class="mb-8" v-reveal>
        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">{{ t('guestbook.nickname') }}</label>
            <input v-model="form.nickname" class="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <p v-if="errors.nickname" class="mt-1 text-xs text-error">{{ errors.nickname }}</p>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">{{ t('guestbook.email') }}</label>
            <input v-model="form.email" type="email" class="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <p v-if="errors.email" class="mt-1 text-xs text-error">{{ errors.email }}</p>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">{{ t('guestbook.content') }}</label>
            <textarea v-model="form.content" rows="4" :placeholder="t('guestbook.placeholder')" class="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <p v-if="errors.content" class="mt-1 text-xs text-error">{{ errors.content }}</p>
          </div>
          <BaseButton type="submit" :loading="submitting" block>{{ t('guestbook.submit') }}</BaseButton>
        </form>
      </BaseCard>

      <!-- Messages -->
      <div v-if="loading" class="space-y-4">
        <Skeleton v-for="i in 3" :key="i" :lines="2" />
      </div>
      <div v-else class="space-y-4">
        <BaseCard v-for="msg in messages" :key="msg.id" v-reveal>
          <div class="flex gap-3">
            <img :src="msg.avatar" :alt="msg.nickname" class="h-10 w-10 rounded-full" />
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="font-medium">{{ msg.nickname }}</span>
                <span class="text-xs text-muted">{{ formatRelativeTime(msg.createdAt) }}</span>
              </div>
              <div class="mt-2 text-sm" v-html="sanitizeHtml(msg.content)" />
              <button class="mt-2 flex items-center gap-1 text-xs text-muted transition-colors hover:text-primary" @click="likeMessage(msg.id)">
                ❤️ {{ msg.likes }}
              </button>
            </div>
          </div>
        </BaseCard>
      </div>

      <Pagination v-model:page="page" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>
