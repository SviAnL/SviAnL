import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const errorMessage = ref('')
  const showErrorToast = ref(false)

  function setLoading(loading: boolean): void {
    isLoading.value = loading
  }

  function showError(message: string): void {
    errorMessage.value = message
    showErrorToast.value = true
    setTimeout(() => {
      showErrorToast.value = false
    }, 3000)
  }

  function hideError(): void {
    showErrorToast.value = false
  }

  return { isLoading, errorMessage, showErrorToast, setLoading, showError, hideError }
})
