import { http, HttpResponse, delay } from 'msw'
import {
  mockProjects,
  mockBlogPosts,
  mockExperiences,
  mockMedia,
  mockGuestbook,
  mockFriends,
  mockProfile,
  mockStats,
} from './data'

const mockDelay = 0

function success<T>(data: T) {
  return { code: 0, message: 'success', data }
}

function error(message?: string, code = 500, data = null) {
  return { code, message, data }
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

function filterList<
  T extends {
    title?: string
    description?: string
    summary?: string
    category?: string
    tags?: string[]
  },
>(list: T[], keyword?: string, category?: string, tag?: string) {
  return list.filter((item) => {
    if (keyword) {
      const text =
        `${item.title || ''} ${item.description || ''} ${item.summary || ''}`.toLowerCase()
      if (!text.includes(keyword.toLowerCase())) return false
    }
    if (category && item.category !== category) return false
    if (tag && !item.tags?.includes(tag)) return false
    return true
  })
}

export const handlers = [
  // 首页
  http.get('/api/home/stats', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(mockStats))
  }),
  http.get('/api/home/featured-projects', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(mockProjects.slice(0, 3)))
  }),
  http.get('/api/home/latest-posts', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(mockBlogPosts.slice(0, 3)))
  }),

  // 关于
  http.get('/api/about/profile', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(mockProfile))
  }),

  // 项目
  http.get('/api/projects', async ({ request }) => {
    await delay(mockDelay)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || undefined
    const category = url.searchParams.get('category') || undefined
    const tag = url.searchParams.get('tag') || undefined
    const filtered = filterList(mockProjects, keyword, category, tag)
    return HttpResponse.json(success(paginate(filtered, page, pageSize)))
  }),
  http.get('/api/projects/categories', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(['Web应用', '移动端', '开源工具', '设计作品']))
  }),
  http.get('/api/projects/:id', async ({ params }) => {
    await delay(mockDelay)
    const id = params.id as string
    const project = mockProjects.find((p) => p.id === id)
    if (!project) return HttpResponse.json(error('项目不存在'))
    return HttpResponse.json(success(project))
  }),

  // 博客
  http.get('/api/blog/categories', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(['前端', '后端', 'DevOps', '设计']))
  }),
  http.get('/api/blog', async ({ request }) => {
    await delay(mockDelay)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || undefined
    const category = url.searchParams.get('category') || undefined
    const tag = url.searchParams.get('tag') || undefined
    const filtered = filterList(mockBlogPosts, keyword, category, tag)
    return HttpResponse.json(success(paginate(filtered, page, pageSize)))
  }),
  http.get('/api/blog/:id', async ({ params }) => {
    await delay(mockDelay)
    const id = params.id as string
    const post = mockBlogPosts.find((p) => p.id === id)
    if (!post) return HttpResponse.json(error('文章不存在'))
    return HttpResponse.json(success(post))
  }),
  http.get('/api/blog/related/:id', async ({ params }) => {
    await delay(mockDelay)
    const id = params.id as string
    const post = mockBlogPosts.find((p) => p.id === id)
    const related = mockBlogPosts
      .filter((p) => p.id !== id && p.category === post?.category)
      .slice(0, 3)
    return HttpResponse.json(success(related))
  }),
  http.get('/api/blog/tags', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(['Vue', 'React', 'TypeScript', 'Node.js', 'CSS', '性能优化']))
  }),

  // 经验
  http.get('/api/experience', async ({ request }) => {
    await delay(mockDelay)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || undefined
    const category = url.searchParams.get('category') || undefined
    const tag = url.searchParams.get('tag') || undefined
    const filtered = filterList(mockExperiences, keyword, category, tag)
    return HttpResponse.json(success(paginate(filtered, page, pageSize)))
  }),
  http.get('/api/experience/:id', async ({ params }) => {
    await delay(mockDelay)
    const id = params.id as string
    const item = mockExperiences.find((p) => p.id === id)
    if (!item) return HttpResponse.json(error('内容不存在'))
    return HttpResponse.json(success(item))
  }),

  // 媒体
  http.get('/api/media/categories', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(['技术教程', '个人作品', '直播回放']))
  }),
  http.get('/api/media', async ({ request }) => {
    await delay(mockDelay)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const keyword = url.searchParams.get('keyword') || undefined
    const category = url.searchParams.get('category') || undefined
    const filtered = filterList(mockMedia, keyword, category)
    return HttpResponse.json(success(paginate(filtered, page, pageSize)))
  }),
  http.get('/api/media/:id', async ({ params }) => {
    await delay(mockDelay)
    const id = params.id as string
    const item = mockMedia.find((p) => p.id === id)
    if (!item) return HttpResponse.json(error('视频不存在'))
    return HttpResponse.json(success(item))
  }),

  // 留言板
  http.get('/api/guestbook', async ({ request }) => {
    await delay(mockDelay)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    return HttpResponse.json(success(paginate(mockGuestbook, page, pageSize)))
  }),
  http.post('/api/guestbook', async ({ request }) => {
    await delay(mockDelay)
    const body = (await request.json()) as { nickname: string; email: string; content: string }
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
    return HttpResponse.json(success(newMsg))
  }),
  http.post('/api/guestbook/:id/like', async ({ params }) => {
    await delay(mockDelay)
    const id = params.id as string
    const msg = mockGuestbook.find((m) => m.id === id)
    if (msg) msg.likes += 1
    return HttpResponse.json(success({ likes: msg?.likes || 0 }))
  }),

  // 友链
  http.get('/api/friends', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(mockFriends))
  }),
  http.get('/api/friends/categories', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success(['技术博客', '设计师', '开发者']))
  }),
  http.post('/api/friends/apply', async () => {
    await delay(mockDelay)
    return HttpResponse.json(success({ success: true }))
  }),
]
