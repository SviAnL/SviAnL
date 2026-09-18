import { get, post } from '@/api/request'
import type { PaginatedResponse, PaginationParams } from './types'
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

export const homeApi = {
  getStats: () => get<SiteStats>('/home/stats'),
  getFeaturedProjects: () => get<Project[]>('/home/featured-projects'),
  getLatestPosts: () => get<BlogPost[]>('/home/latest-posts'),
}

export const aboutApi = {
  getProfile: () => get<Profile>('/about/profile'),
}

export const projectApi = {
  getList: (params: PaginationParams) => get<PaginatedResponse<Project>>('/projects', params),
  getDetail: (id: string) => get<Project>(`/projects/${id}`),
  getCategories: () => get<string[]>('/projects/categories'),
}

export const blogApi = {
  getList: (params: PaginationParams) => get<PaginatedResponse<BlogPost>>('/blog', params),
  getDetail: (id: string) => get<BlogPost>(`/blog/${id}`),
  getRelated: (id: string) => get<BlogPost[]>(`/blog/related/${id}`),
  getCategories: () => get<string[]>('/blog/categories'),
  getTags: () => get<string[]>('/blog/tags'),
}

export const experienceApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedResponse<ExperienceItem>>('/experience', params),
  getDetail: (id: string) => get<ExperienceItem>(`/experience/${id}`),
}

export const mediaApi = {
  getList: (params: PaginationParams) => get<PaginatedResponse<MediaItem>>('/media', params),
  getDetail: (id: string) => get<MediaItem>(`/media/${id}`),
  getCategories: () => get<string[]>('/media/categories'),
}

export const guestbookApi = {
  getList: (params: PaginationParams) =>
    get<PaginatedResponse<GuestbookMessage>>('/guestbook', params),
  submit: (data: { nickname: string; email: string; content: string }) =>
    post<GuestbookMessage>('/guestbook', data),
  like: (id: string) => post<{ likes: number }>(`/guestbook/${id}/like`),
}

export const friendsApi = {
  getList: () => get<FriendLink[]>('/friends'),
  getCategories: () => get<string[]>('/friends/categories'),
  apply: (data: { name: string; url: string; email: string; description: string }) =>
    post<{ success: boolean }>('/friends/apply', data),
}
