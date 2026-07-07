/** API 错误码定义 */
export const API_CODE = {
  SUCCESS: 0,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const

export type ApiCode = (typeof API_CODE)[keyof typeof API_CODE]

/** HTTP 状态码映射 */
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '资源不存在',
  500: '服务器内部错误',
}

/** 默认分页配置 */
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const

/** 本地存储键名 */
export const STORAGE_KEYS = {
  TOKEN: 'svianl_token',
  THEME: 'svianl_theme',
  LOCALE: 'svianl_locale',
} as const

/** 断点常量 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const

/** 触摸目标最小尺寸 (px) */
export const MIN_TOUCH_TARGET = 44

/** 视频播放速率选项 */
export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

/** 支持的语言列表 */
export const SUPPORTED_LOCALES = ['zh-CN', 'en-US', 'ko-KR'] as const

/** 支持的主题列表 */
export const SUPPORTED_THEMES = ['light', 'dark', 'high-contrast', 'system'] as const
