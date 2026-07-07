import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse } from '@/types'
import { API_CODE } from '@/constants'

/** 请求配置扩展 */
interface RequestConfig extends AxiosRequestConfig {
  /** 是否跳过重复请求拦截 */
  skipDuplicate?: boolean
  /** 重试次数 */
  retryCount?: number
}

/** 进行中的请求 Map */
const pendingRequests = new Map<string, AbortController>()

/** 生成请求唯一标识 */
function getRequestKey(config: InternalAxiosRequestConfig): string {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/** 移除重复请求 */
function removePendingRequest(config: InternalAxiosRequestConfig): void {
  const key = getRequestKey(config)
  if (pendingRequests.has(key)) {
    pendingRequests.get(key)?.abort()
    pendingRequests.delete(key)
  }
}

/** 全局错误提示 */
function showError(message: string): void {
  const event = new CustomEvent('app:error', { detail: { message } })
  window.dispatchEvent(event)
}

/** 创建 Axios 实例 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const reqConfig = config as InternalAxiosRequestConfig & RequestConfig

      if (!reqConfig.skipDuplicate) {
        removePendingRequest(config)
        const controller = new AbortController()
        config.signal = controller.signal
        pendingRequests.set(getRequestKey(config), controller)
      }

      const token = localStorage.getItem('svianl_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      removePendingRequest(response.config as InternalAxiosRequestConfig)

      const { code, message, data } = response.data

      if (code === API_CODE.SUCCESS) {
        return { ...response, data: response.data }
      }

      showError(message || '请求失败')
      return Promise.reject(new Error(message))
    },
    async (error) => {
      if (error.config) {
        removePendingRequest(error.config as InternalAxiosRequestConfig)
      }

      if (axios.isCancel(error)) {
        return Promise.reject(error)
      }

      const reqConfig = error.config as (InternalAxiosRequestConfig & RequestConfig) | undefined
      const status = error.response?.status

      if (reqConfig && reqConfig.retryCount && reqConfig.retryCount > 0) {
        reqConfig.retryCount -= 1
        await new Promise((r) => setTimeout(r, 1000))
        return instance(reqConfig)
      }

      const message =
        error.response?.data?.message ||
        (status ? `请求错误 (${status})` : '网络连接失败，请检查网络')

      showError(message)
      return Promise.reject(error)
    },
  )

  return instance
}

const http = createAxiosInstance()

/** 通用请求方法 */
export async function request<T>(config: RequestConfig): Promise<T> {
  const response = await http.request<ApiResponse<T>>(config)
  return response.data.data
}

export function get<T>(url: string, params?: Record<string, unknown>, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'GET', url, params })
}

export function post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'POST', url, data })
}

export function put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'PUT', url, data })
}

export function del<T>(url: string, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'DELETE', url })
}

export default http
