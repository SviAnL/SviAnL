import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { i18n } from './locales/setup'
import { useThemeStore, useLocaleStore, useAppStore } from './stores'
import { vLazy, vClickOutside, vReveal } from './directives'
import './styles/index.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(i18n)

app.directive('lazy', vLazy)
app.directive('click-outside', vClickOutside)
app.directive('reveal', vReveal)

const themeStore = useThemeStore()
const localeStore = useLocaleStore()
const appStore = useAppStore()

themeStore.init()
localeStore.init()

window.addEventListener('app:error', ((e: CustomEvent<{ message: string }>) => {
  console.error('app:error', e)
  appStore.showError(e.detail.message)
}) as EventListener)

app.mount('#app')
