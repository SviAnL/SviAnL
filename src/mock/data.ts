import {
  videoUrlPool,
  randomDate,
  projectPool,
  namePrefixes,
  nameSuffixes,
  descParts,
  nickPrefixes,
  nickSuffixes,
  contentTemplates,
  experiencePool,
  blogPostPool,
  mediaPool,
} from './static'
import type {
  BlogPost,
  ExperienceItem,
  FriendLink,
  GuestbookMessage,
  MediaItem,
  Profile,
  Project,
  SiteStats,
} from '@/types'

const cover = (id: number) => `https://picsum.photos/seed/${id}/800/450`

export const mockStats: SiteStats = {
  visits: 12856,
  projects: 24,
  articles: 56,
  experiences: 38,
}

export const mockProfile: Profile = {
  name: 'SviAnL',
  avatar: 'https://api.dicebear.com/10.x/avataaars/svg?seed=vue',
  slogan: 'Building Digital Experiences with Code & Creativity',
  bio: '前端开发者，热爱开源与技术分享。专注于 Vue 生态、前端工程化与用户体验设计。',
  email: 'svianl@icloud.com',
  location: 'China',
  tags: ['Vue.js', 'TypeScript', 'Vite', 'ESLint', 'TailwindCSS'],
  socials: [
    { platform: 'GitHub', url: 'https://github.com/SviAnL', icon: 'mdi:github' },
    { platform: 'Twitter', url: 'https://juejin.cn/user/4121393108091789', icon: 'mdi:twitter' },
    { platform: 'Email', url: 'svianl@icloud.com', icon: 'mdi:email' },
  ],
  skills: [
    {
      category: '前端',
      items: [
        { name: 'Vue.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Vite', level: 85 },
        { name: 'CSS/Tailwind', level: 88 },
      ],
    },
    {
      category: '其他',
      items: [
        { name: 'ESLint', level: 85 },
        { name: 'SCSS', level: 80 },
        { name: 'Vitest', level: 75 },
      ],
    },
    {
      category: '工具',
      items: [
        { name: 'Git', level: 92 },
        { name: 'Docker', level: 60 },
        { name: 'CI/CD', level: 65 },
      ],
    },
  ],
  timeline: [
    {
      year: '2026',
      title: '高级前端工程师',
      description: '负责前端架构设计，搭建项目基础工程体系，主导组件、动画、自定义指令能力建设',
    },
    {
      year: '2025',
      title: '前端工程师',
      description: '独立承接业务项目，封装通用工具函数，沉淀开源组件与工具模块',
    },
    {
      year: '2024',
      title: '前端开发工程师',
      description: '参与大型Web项目重构，使用Vue3 + TS + Vite开发业务，进行性能优化',
    },
    {
      year: '2023',
      title: '前端实习生',
      description: '参与业务页面开发，熟悉Vue生态、类型开发、接口联调',
    },
    {
      year: '2022',
      title: '在校学习',
      description: '学习计算机基础知识，入门前端基础技术栈，练习静态页面开发',
    },
  ],
  education: [
    { school: '福建信息职业技术学院', degree: '移动互联应用技术', period: '2019 - 2022' },
    { school: '福建省永安市第九中学', degree: '理科', period: '2016 - 2019' },
    { school: '福建省永安市槐南中学', degree: '文理双修', period: '2014 - 2016' },
  ],
}

export const mockProjects: Project[] = Array.from({ length: 30 }, (_, i) => {
  const item = projectPool[i % projectPool.length]
  return {
    id: String(i + 1),
    title: item.title,
    description: item.description,
    cover: cover(i + 1),
    category: item.category,
    tags: item.tags,
    demoUrl: item.demoUrl,
    repoUrl: item.repoUrl,
    videoUrl: videoUrlPool[i % videoUrlPool.length],
    content: item.content,
    createdAt: randomDate(i),
  }
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export const mockBlogPosts: BlogPost[] = Array.from({ length: 30 }, (_, i) => {
  const item = blogPostPool[i % blogPostPool.length]
  return {
    id: String(i + 1),
    title: item.title,
    summary: item.summary,
    cover: cover(i + 20),
    category: item.category,
    tags: item.tags,
    content: item.content,
    readTime: item.readTime,
    views: 1200 + i * 380 + (i % 5) * 150,
    createdAt: randomDate(i + 100),
  }
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export const mockExperiences: ExperienceItem[] = Array.from({ length: 30 }, (_, i) => {
  const item = experiencePool[i % experiencePool.length]
  return {
    id: String(i + 1),
    title: item.title,
    summary: item.summary,
    category: item.category,
    tags: item.tags,
    content: item.content,
    createdAt: randomDate(i + 200),
  }
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export const mockMedia: MediaItem[] = Array.from({ length: 30 }, (_, i) => {
  const item = mediaPool[i % mediaPool.length]
  return {
    id: String(i + 1),
    title: item.title,
    description: item.description,
    cover: cover(i + 40),
    videoUrl: item.videoUrl,
    category: item.category,
    duration: item.duration,
    createdAt: randomDate(i + 300),
  }
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export const mockGuestbook: GuestbookMessage[] = Array.from({ length: 30 }, (_, i) => {
  // 随机昵称
  const nickname = `${nickPrefixes[Math.floor(Math.random() * nickPrefixes.length)]}${
    nickSuffixes[Math.floor(Math.random() * nickSuffixes.length)]
  }`

  // 随机留言内容
  const content = `${contentTemplates[Math.floor(Math.random() * contentTemplates.length)]}`

  return {
    id: String(i + 1),
    nickname,
    email: `visitor${i + 1}@example.com`,
    content,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=visitor${i + 1}`,
    likes: Math.floor(Math.random() * 50),
    createdAt: randomDate(i + 400),
  }
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export const mockFriends: FriendLink[] = Array.from({ length: 30 }, (_, i) => {
  const randomName = `${namePrefixes[Math.floor(Math.random() * namePrefixes.length)]}${
    nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)]
  }`
  const randomDesc = `${descParts[Math.floor(Math.random() * descParts.length)]}，欢迎来访交流。`

  return {
    id: String(i + 1),
    name: randomName,
    url: `https://example${i + 1}.com`,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=friend${i + 1}`,
    description: randomDesc,
    category: ['技术博客', '设计师', '开发者'][i % 3],
  }
})
