<script setup lang="ts">
  import { friendsApi } from '@/api'
  import BaseButton from '@/components/common/BaseButton.vue'
  import BaseCard from '@/components/common/BaseCard.vue'
  import BaseEmpty from '@/components/common/BaseEmpty.vue'
  import BaseSkeleton from '@/components/common/BaseSkeleton.vue'
  import { isValidEmail } from '@/utils'
  import { toastSuccess } from '@/utils/toast'
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
    activeCategory.value
      ? friends.value.filter((f) => f.category === activeCategory.value)
      : friends.value,
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
    if (!form.value.name.trim()) errors.value.name = t('friends.fieldRequired')
    if (!form.value.url.trim()) errors.value.url = t('friends.fieldRequired')
    if (!isValidEmail(form.value.email)) errors.value.email = t('friends.emailInvalid')
    return Object.keys(errors.value).length === 0
  }

  async function submitApply() {
    if (!validate()) return
    submitting.value = true
    try {
      await friendsApi.apply(form.value)
      showApply.value = false
      form.value = { name: '', url: '', email: '', description: '' }
      errors.value = {}
      toastSuccess(t('common.success'))
    } finally {
      submitting.value = false
    }
  }
</script>

<template>
  <div>
    <div v-reveal class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-bold">
        {{ t('friends.title') }}
      </h1>
      <BaseButton variant="outline" @click="showApply = !showApply">
        {{ t('friends.apply') }}
      </BaseButton>
    </div>

    <!-- Apply Form -->
    <BaseCard v-if="showApply" v-reveal class="mb-8" :title="t('friends.applyTitle')">
      <p class="text-muted mb-4 text-sm">
        {{ t('friends.applyNote') }}
      </p>
      <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="submitApply">
        <div>
          <label class="mb-1 block text-sm">{{ t('friends.siteName') }}</label>
          <input
            v-model="form.name"
            class="border-border focus:border-primary w-full rounded-lg border px-4 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm">{{ t('friends.siteUrl') }}</label>
          <input
            v-model="form.url"
            class="border-border focus:border-primary w-full rounded-lg border px-4 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm">{{ t('friends.email') }}</label>
          <input
            v-model="form.email"
            type="email"
            class="border-border focus:border-primary w-full rounded-lg border px-4 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm">{{ t('friends.siteDesc') }}</label>
          <input
            v-model="form.description"
            class="border-border focus:border-primary w-full rounded-lg border px-4 py-2 focus:outline-none"
          />
        </div>
        <div class="flex gap-3 sm:col-span-2">
          <BaseButton variant="outline" @click.stop="showApply = false">
            {{ t('common.cancel') }}
          </BaseButton>
          <BaseButton type="submit" :loading="submitting">
            {{ t('common.submit') }}
          </BaseButton>
        </div>
      </form>
    </BaseCard>

    <div v-reveal class="mb-6 flex flex-wrap gap-2">
      <button
        class="cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors"
        :class="!activeCategory ? 'bg-primary text-white' : 'bg-surface-hover'"
        @click="activeCategory = ''"
      >
        {{ t('common.all') }}
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors"
        :class="activeCategory === cat ? 'bg-primary text-white' : 'bg-surface-hover'"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseSkeleton v-for="i in 6" :key="i" :lines="2" />
    </div>

    <BaseEmpty v-else-if="!filteredFriends.length" />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="friend in filteredFriends"
        :key="friend.id"
        :href="friend.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block"
      >
        <BaseCard v-reveal hoverable>
          <div class="flex items-center gap-3">
            <img v-lazy="friend.avatar" class="h-12 w-12 rounded-full" :alt="friend.name" />
            <div>
              <h3 class="font-semibold">{{ friend.name }}</h3>
              <p class="text-muted line-clamp-1 text-sm">{{ friend.description }}</p>
            </div>
          </div>
        </BaseCard>
      </a>
    </div>
  </div>
</template>
