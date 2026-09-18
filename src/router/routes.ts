import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/pages/Home/HomeIndex.vue'),
    meta: { titleKey: 'home.title', transition: 'zoom' },
  },
  {
    path: '/about',
    name: 'AboutCatalog',
    component: () => import('@/pages/About/AboutCatalog.vue'),
    meta: { titleKey: 'about.title', transition: 'slide-left' },
  },
  {
    path: '/projects',
    name: 'ProjectsCatalog',
    component: () => import('@/pages/Projects/ProjectsCatalog.vue'),
    meta: { titleKey: 'projects.title', transition: 'slide-left' },
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('@/pages/Projects/ProjectDetail.vue'),
    meta: { titleKey: 'projects.detail', transition: 'zoom', hasProgress: true },
  },
  {
    path: '/blog',
    name: 'BlogCatalog',
    component: () => import('@/pages/Blog/BlogCatalog.vue'),
    meta: { titleKey: 'blog.title', transition: 'slide-left' },
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/pages/Blog/BlogDetail.vue'),
    meta: { titleKey: 'blog.detail', transition: 'zoom', hasProgress: true },
  },
  {
    path: '/experience',
    name: 'ExperienceCatalog',
    component: () => import('@/pages/Experience/ExperienceCatalog.vue'),
    meta: { titleKey: 'experience.title', transition: 'slide-left' },
  },
  {
    path: '/media',
    name: 'MediaCatalog',
    component: () => import('@/pages/Media/MediaCatalog.vue'),
    meta: { titleKey: 'media.title', transition: 'slide-left' },
  },
  {
    path: '/guestbook',
    name: 'GuestBookCatalog',
    component: () => import('@/pages/Guestbook/GuestBookCatalog.vue'),
    meta: { titleKey: 'guestbook.title', transition: 'slide-left' },
  },
  {
    path: '/friends',
    name: 'FriendsCatalog',
    component: () => import('@/pages/Friends/FriendsCatalog.vue'),
    meta: { titleKey: 'friends.title', transition: 'slide-left' },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/pages/Error/500.vue'),
    meta: { titleKey: 'error.serverError', transition: 'zoom', noKeepAlive: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/Error/404.vue'),
    meta: { titleKey: 'error.notFound', transition: 'zoom', noKeepAlive: true },
  },
]
