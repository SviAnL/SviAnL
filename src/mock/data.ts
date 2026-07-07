import type { BlogPost, ExperienceItem, FriendLink, GuestbookMessage, MediaItem, Profile, Project, SiteStats } from '@/types'

export const mockStats: SiteStats = {
  visits: 12856,
  projects: 24,
  articles: 56,
  experiences: 38,
}

export const mockProfile: Profile = {
  name: 'SviAnL',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SviAnL',
  slogan: 'Building Digital Experiences with Code & Creativity',
  bio: '全栈开发者，热爱开源与技术分享。专注于 Vue 生态、前端工程化与用户体验设计。',
  email: 'hello@svianl.dev',
  location: 'China',
  tags: ['Vue.js', 'TypeScript', 'Node.js', 'UI/UX', 'Open Source'],
  socials: [
    { platform: 'GitHub', url: 'https://github.com', icon: 'mdi:github' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'mdi:twitter' },
    { platform: 'Email', url: 'mailto:hello@svianl.dev', icon: 'mdi:email' },
  ],
  skills: [
    {
      category: '前端',
      items: [
        { name: 'Vue.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'React', level: 75 },
        { name: 'CSS/Tailwind', level: 88 },
      ],
    },
    {
      category: '后端',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 70 },
        { name: 'PostgreSQL', level: 75 },
      ],
    },
    {
      category: '工具',
      items: [
        { name: 'Git', level: 92 },
        { name: 'Docker', level: 80 },
        { name: 'CI/CD', level: 78 },
      ],
    },
  ],
  timeline: [
    { year: '2024', title: '高级前端工程师', description: '负责企业级前端架构设计与团队技术建设' },
    { year: '2022', title: '全栈开发者', description: '独立开发多个 SaaS 产品并开源核心模块' },
    { year: '2020', title: '前端开发工程师', description: '参与大型电商平台前端重构项目' },
    { year: '2018', title: '计算机科学学士', description: '毕业于知名高校，主修软件工程' },
  ],
  education: [
    { school: '某某大学', degree: '计算机科学与技术 学士', period: '2014 - 2018' },
  ],
}

const cover = (id: number) => `https://picsum.photos/seed/${id}/800/450`

export const mockProjects: Project[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: `项目作品 ${i + 1}`,
  description: `这是一个精彩的项目作品，展示了现代 Web 开发的最佳实践。项目 ${i + 1} 采用了最新的技术栈。`,
  cover: cover(i + 1),
  category: ['Web应用', '移动端', '开源工具', '设计作品'][i % 4],
  tags: [['Vue', 'TypeScript'], ['React', 'Next.js'], ['Node.js', 'Docker'], ['Figma', 'CSS']][i % 4],
  demoUrl: 'https://example.com',
  repoUrl: 'https://github.com',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  content: `<h2>项目概述</h2><p>这是项目 ${i + 1} 的详细介绍。该项目旨在解决实际问题，提供优雅的用户体验。</p><h3>核心功能</h3><ul><li>响应式设计</li><li>高性能渲染</li><li>模块化架构</li></ul>`,
  createdAt: new Date(2024, i % 12, 15).toISOString(),
}))

export const mockBlogPosts: BlogPost[] = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1),
  title: `博客文章 ${i + 1}：深入理解现代前端开发`,
  summary: `本文探讨了现代前端开发中的关键概念和最佳实践，包括性能优化、状态管理和组件设计模式。`,
  cover: cover(i + 20),
  category: ['前端', '后端', 'DevOps', '设计'][i % 4],
  tags: [['Vue', 'TypeScript'], ['Node.js'], ['Docker', 'CI/CD'], ['CSS', '设计']][i % 4],
  content: `<h2>引言</h2><p>在现代 Web 开发中，选择合适的技术栈和架构模式至关重要。本文将分享我在项目 ${i + 1} 中的实践经验。</p><h2>核心内容</h2><p>深入探讨技术细节，包括代码示例和性能对比数据。</p><h3>最佳实践</h3><ul><li>组件化设计</li><li>类型安全</li><li>自动化测试</li></ul><h2>总结</h2><p>持续学习和实践是提升技术能力的关键。</p>`,
  readTime: 5 + (i % 10),
  views: 100 + i * 50,
  createdAt: new Date(2024, i % 12, 1).toISOString(),
}))

export const mockExperiences: ExperienceItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  title: `经验分享 ${i + 1}`,
  summary: `分享在技术学习和项目开发中的宝贵经验与踩坑记录。`,
  category: (['tutorial', 'note', 'pitfall', 'resource'] as const)[i % 4],
  tags: [['Vue'], ['TypeScript'], ['性能'], ['工具']][i % 4],
  content: `<p>详细的技术经验分享内容 ${i + 1}...</p>`,
  createdAt: new Date(2024, i % 12, 10).toISOString(),
}))

export const mockMedia: MediaItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  title: `视频教程 ${i + 1}`,
  description: `精彩的技术视频教程，涵盖前端开发的各个方面。`,
  cover: cover(i + 40),
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  category: ['技术教程', '个人作品', '直播回放'][i % 3],
  duration: 120 + i * 30,
  createdAt: new Date(2024, i % 12, 5).toISOString(),
}))

export const mockGuestbook: GuestbookMessage[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  nickname: `访客${i + 1}`,
  email: `visitor${i + 1}@example.com`,
  content: `这是一条精彩的留言！网站设计很棒，内容也很有价值。期待更多更新！ #${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=visitor${i + 1}`,
  likes: Math.floor(Math.random() * 50),
  createdAt: new Date(2024, 11, 20 - i).toISOString(),
}))

export const mockFriends: FriendLink[] = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  name: `友站 ${i + 1}`,
  url: `https://example${i + 1}.com`,
  avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=friend${i + 1}`,
  description: `一个优秀的技术博客，分享前端开发经验。`,
  category: ['技术博客', '设计师', '开发者'][i % 3],
}))
