<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { guestbookApi } from '@/api'
  import BaseButton from '@/components/common/BaseButton.vue'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseEmpty from '@/components/common/BaseEmpty.vue'
  import BasePagination from '@/components/common/BasePagination.vue'
  import BaseSkeleton from '@/components/common/BaseSkeleton.vue'
  import { sanitizeHtml, formatRelativeTime, isValidEmail } from '@/utils'
  import { toastSuccess } from '@/utils/toast'
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
      nextTick(() => {
        window.scrollTo({ top: 0 })
      })
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
      errors.value = {}
      page.value = 1
      toastSuccess(t('common.success'))
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
  <div>
    <h1 v-reveal class="mb-8 text-center text-3xl font-bold">
      {{ t('guestbook.title') }}
    </h1>

    <!-- Form -->
    <BaseCard v-reveal class="mb-8">
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm font-medium">{{ t('guestbook.nickname') }}</label>
          <input
            v-model="form.nickname"
            class="border-border bg-background focus:border-primary focus:ring-primary/30 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
          />
          <p v-if="errors.nickname" class="text-error mt-1 text-xs">
            {{ errors.nickname }}
          </p>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium">{{ t('guestbook.email') }}</label>
          <input
            v-model="form.email"
            type="email"
            class="border-border bg-background focus:border-primary focus:ring-primary/30 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
          />
          <p v-if="errors.email" class="text-error mt-1 text-xs">
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium">{{ t('guestbook.content') }}</label>
          <textarea
            v-model="form.content"
            rows="4"
            class="border-border bg-background focus:border-primary focus:ring-primary/30 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
            :placeholder="t('guestbook.placeholder')"
          ></textarea>
          <p v-if="errors.content" class="text-error mt-1 text-xs">
            {{ errors.content }}
          </p>
        </div>
        <BaseButton type="submit" :loading="submitting" block>
          {{ t('guestbook.submit') }}
        </BaseButton>
      </form>
    </BaseCard>

    <!-- Messages -->
    <div v-if="loading" class="space-y-4">
      <BaseSkeleton v-for="i in 3" :key="i" />
    </div>

    <BaseEmpty v-else-if="!messages.length" />

    <div v-else class="space-y-4">
      <BaseCard v-for="msg in messages" :key="msg.id" v-reveal>
        <div class="flex gap-3">
          <img v-lazy="msg.avatar" class="h-10 w-10 rounded-full" :alt="msg.nickname" />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="font-semibold">{{ msg.nickname }}</span>
              <span class="text-muted text-xs">{{ formatRelativeTime(msg.createdAt) }}</span>
            </div>
            <div class="prose mt-2 text-sm" v-html="sanitizeHtml(msg.content)"></div>
            <button
              class="text-muted hover:text-primary mt-2 flex cursor-pointer items-center gap-1 text-xs transition-colors"
              @click="likeMessage(msg.id)"
            >
              <Icon icon="ri:poker-hearts-fill" :color="msg.likes ? '#f00' : '#9ca3af'" />
              {{ msg.likes }}
            </button>
          </div>
        </div>
      </BaseCard>
    </div>

    <BasePagination v-model:page="page" :page-size="pageSize" :total="total" />
  </div>
</template>
