import type { MockMethod } from 'vite-plugin-mock'
import { mockProjects, mockBlogPosts, mockExperiences, mockMedia, mockGuestbook, mockFriends, mockProfile, mockStats } from './data'

const delay = Number(import.meta.env.VITE_MOCK_DELAY) || 300

function success<T>(data: T) {
  return { code: 0, message: 'success', data }
}

function paginate<T>(list: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return {
    list: list.slice(start, start + pageSize),
    total: list.length,
    page,
    pageSize,
  }
}

function filterList<T extends { title?: string; description?: string; summary?: string; category?: string; tags?: string[] }>(
  list: T[],
  keyword?: string,
  category?: string,
  tag?: string,
) {
  return list.filter((item) => {
    if (keyword) {
      const text = `${item.title || ''} ${item.description || ''} ${item.summary || ''}`.toLowerCase()
      if (!text.includes(keyword.toLowerCase())) return false
    }
    if (category && item.category !== category) return false
    if (tag && !item.tags?.includes(tag)) return false
    return true
  })
}

export default [
  // 首页
  { url: '/api/home/stats', method: 'get', timeout: delay, response: () => success(mockStats) },
  { url: '/api/home/featured-projects', method: 'get', timeout: delay, response: () => success(mockProjects.slice(0, 3)) },
  { url: '/api/home/latest-posts', method: 'get', timeout: delay, response: () => success(mockBlogPosts.slice(0, 3)) },

  // 关于
  { url: '/api/about/profile', method: 'get', timeout: delay, response: () => success(mockProfile) },

  // 项目
  {
    url: '/api/projects',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const filtered = filterList(mockProjects, query.keyword as string, query.category as string, query.tag as string)
      return success(paginate(filtered, page, pageSize))
    },
  },
  {
    url: '/api/projects/:id',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const project = mockProjects.find((p) => p.id === query.id)
      if (!project) return { code: 404, message: '项目不存在', data: null }
      return success(project)
    },
  },
  { url: '/api/projects/categories', method: 'get', timeout: delay, response: () => success(['Web应用', '移动端', '开源工具', '设计作品']) },

  // 博客
  {
    url: '/api/blog',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const filtered = filterList(mockBlogPosts, query.keyword as string, query.category as string, query.tag as string)
      return success(paginate(filtered, page, pageSize))
    },
  },
  {
    url: '/api/blog/:id',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const post = mockBlogPosts.find((p) => p.id === query.id)
      if (!post) return { code: 404, message: '文章不存在', data: null }
      return success(post)
    },
  },
  {
    url: '/api/blog/:id/related',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const post = mockBlogPosts.find((p) => p.id === query.id)
      const related = mockBlogPosts.filter((p) => p.id !== query.id && p.category === post?.category).slice(0, 3)
      return success(related)
    },
  },
  { url: '/api/blog/categories', method: 'get', timeout: delay, response: () => success(['前端', '后端', 'DevOps', '设计']) },
  { url: '/api/blog/tags', method: 'get', timeout: delay, response: () => success(['Vue', 'React', 'TypeScript', 'Node.js', 'CSS', '性能优化']) },

  // 经验
  {
    url: '/api/experience',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const filtered = filterList(mockExperiences, query.keyword as string, query.category as string, query.tag as string)
      return success(paginate(filtered, page, pageSize))
    },
  },
  {
    url: '/api/experience/:id',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const item = mockExperiences.find((e) => e.id === query.id)
      if (!item) return { code: 404, message: '内容不存在', data: null }
      return success(item)
    },
  },

  // 媒体
  {
    url: '/api/media',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const filtered = filterList(mockMedia, query.keyword as string, query.category as string)
      return success(paginate(filtered, page, pageSize))
    },
  },
  {
    url: '/api/media/:id',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const item = mockMedia.find((m) => m.id === query.id)
      if (!item) return { code: 404, message: '视频不存在', data: null }
      return success(item)
    },
  },
  { url: '/api/media/categories', method: 'get', timeout: delay, response: () => success(['技术教程', '个人作品', '直播回放']) },

  // 留言板
  {
    url: '/api/guestbook',
    method: 'get',
    timeout: delay,
    response: ({ query }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      return success(paginate(mockGuestbook, page, pageSize))
    },
  },
  {
    url: '/api/guestbook',
    method: 'post',
    timeout: delay,
    response: ({ body }) => {
      const newMsg = {
        id: String(Date.now()),
        nickname: body.nickname,
        email: body.email,
        content: body.content,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.nickname}`,
        likes: 0,
        createdAt: new Date().toISOString(),
      }
      mockGuestbook.unshift(newMsg)
      return success(newMsg)
    },
  },
  {
    url: '/api/guestbook/:id/like',
    method: 'post',
    timeout: delay,
    response: ({ query }) => {
      const msg = mockGuestbook.find((m) => m.id === query.id)
      if (msg) msg.likes += 1
      return success({ likes: msg?.likes || 0 })
    },
  },

  // 友链
  { url: '/api/friends', method: 'get', timeout: delay, response: () => success(mockFriends) },
  { url: '/api/friends/categories', method: 'get', timeout: delay, response: () => success(['技术博客', '设计师', '开发者']) },
  {
    url: '/api/friends/apply',
    method: 'post',
    timeout: delay,
    response: () => success({ success: true }),
  },
] as MockMethod[]
