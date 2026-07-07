import { get } from '@/utils/request'
import type {
  BlogPost,
  ExperienceItem,
  FriendLink,
  GuestbookMessage,
  MediaItem,
  PaginatedData,
  PaginationParams,
  Profile,
  Project,
  SiteStats,
} from '@/types'

export const homeApi = {
  getStats: () => get<SiteStats>('/home/stats'),
  getFeaturedProjects: () => get<Project[]>('/home/featured-projects'),
  getLatestPosts: () => get<BlogPost[]>('/home/latest-posts'),
}

export const aboutApi = {
  getProfile: () => get<Profile>('/about/profile'),
}

export const projectApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedData<Project>>('/projects', params as Record<string, unknown>),
  getDetail: (id: string) => get<Project>(`/projects/${id}`),
  getCategories: () => get<string[]>('/projects/categories'),
}

export const blogApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedData<BlogPost>>('/blog', params as Record<string, unknown>),
  getDetail: (id: string) => get<BlogPost>(`/blog/${id}`),
  getRelated: (id: string) => get<BlogPost[]>(`/blog/${id}/related`),
  getCategories: () => get<string[]>('/blog/categories'),
  getTags: () => get<string[]>('/blog/tags'),
}

export const experienceApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedData<ExperienceItem>>('/experience', params as Record<string, unknown>),
  getDetail: (id: string) => get<ExperienceItem>(`/experience/${id}`),
}

export const mediaApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedData<MediaItem>>('/media', params as Record<string, unknown>),
  getDetail: (id: string) => get<MediaItem>(`/media/${id}`),
  getCategories: () => get<string[]>('/media/categories'),
}

export const guestbookApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedData<GuestbookMessage>>('/guestbook', params as Record<string, unknown>),
  submit: (data: { nickname: string; email: string; content: string }) =>
    import('@/utils/request').then(({ post }) => post<GuestbookMessage>('/guestbook', data)),
  like: (id: string) =>
    import('@/utils/request').then(({ post }) => post<{ likes: number }>(`/guestbook/${id}/like`)),
}

export const friendsApi = {
  getList: () => get<FriendLink[]>('/friends'),
  getCategories: () => get<string[]>('/friends/categories'),
  apply: (data: { name: string; url: string; email: string; description: string }) =>
    import('@/utils/request').then(({ post }) => post<{ success: boolean }>('/friends/apply', data)),
}
