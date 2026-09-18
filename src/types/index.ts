/** 项目信息 */
export interface Project {
  id: string
  title: string
  description: string
  cover: string
  category: string
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  videoUrl?: string
  content: string
  createdAt: string
}

/** 博客文章 */
export interface BlogPost {
  id: string
  title: string
  summary: string
  cover: string
  category: string
  tags: string[]
  content: string
  readTime: number
  views: number
  createdAt: string
}

/** 经验分享 */
export interface ExperienceItem {
  id: string
  title: string
  summary: string
  category: 'tutorial' | 'note' | 'pitfall' | 'resource'
  tags: string[]
  content: string
  createdAt: string
}

/** 媒体视频 */
export interface MediaItem {
  id: string
  title: string
  description: string
  cover: string
  videoUrl: string
  category: string
  duration: number
  createdAt: string
}

/** 留言 */
export interface GuestbookMessage {
  id: string
  nickname: string
  email: string
  content: string
  avatar: string
  likes: number
  createdAt: string
}

/** 友链 */
export interface FriendLink {
  id: string
  name: string
  url: string
  avatar: string
  description: string
  category: string
}

/** 统计数据 */
export interface SiteStats {
  visits: number
  projects: number
  articles: number
  experiences: number
}

/** 个人信息 */
export interface Profile {
  name: string
  avatar: string
  slogan: string
  bio: string
  email: string
  location: string
  tags: string[]
  socials: { platform: string; url: string; icon: string }[]
  skills: { category: string; items: { name: string; level: number }[] }[]
  timeline: { year: string; title: string; description: string }[]
  education: { school: string; degree: string; period: string }[]
}

/** 歌曲信息 */
export interface Song {
  id: string
  title: string
  artist: string
  cover: string
  url: string
  duration: number
}

/** 播放器状态 */
export interface PlayerState {
  isPlaying: boolean
  currentTime: number
  volume: number
  isMuted: boolean
  playbackRate: number
}
