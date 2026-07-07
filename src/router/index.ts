import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { TransitionName } from '@/types'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    titleKey?: string
    transition?: TransitionName
    requiresAuth?: boolean
    keepAlive?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/index.vue'),
    meta: { titleKey: 'home.title', transition: 'fade' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About/index.vue'),
    meta: { titleKey: 'about.title', transition: 'slide-left' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/pages/Projects/index.vue'),
    meta: { titleKey: 'projects.title', transition: 'slide-left' },
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('@/pages/Projects/Detail.vue'),
    meta: { titleKey: 'projects.detail', transition: 'zoom' },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/pages/Blog/index.vue'),
    meta: { titleKey: 'blog.title', transition: 'slide-left' },
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/pages/Blog/Detail.vue'),
    meta: { titleKey: 'blog.detail', transition: 'zoom' },
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('@/pages/Experience/index.vue'),
    meta: { titleKey: 'experience.title', transition: 'slide-left' },
  },
  {
    path: '/media',
    name: 'Media',
    component: () => import('@/pages/Media/index.vue'),
    meta: { titleKey: 'media.title', transition: 'slide-left' },
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    component: () => import('@/pages/Guestbook/index.vue'),
    meta: { titleKey: 'guestbook.title', transition: 'slide-left' },
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('@/pages/Friends/index.vue'),
    meta: { titleKey: 'friends.title', transition: 'slide-left' },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/pages/Error/500.vue'),
    meta: { titleKey: 'error.serverError', transition: 'fade' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/Error/404.vue'),
    meta: { titleKey: 'error.notFound', transition: 'fade' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'SviAnL Portal'
  const titleKey = to.meta.titleKey
  if (titleKey) {
    document.title = `${titleKey} | ${appTitle}`
  } else if (to.meta.title) {
    document.title = `${to.meta.title} | ${appTitle}`
  }
  next()
})

export default router
