import { DEFAULT_ERROR_MESSAGE } from '@/constants/error'
import { useLocalStorage } from '@/services/localStorage/hooks/useLocalStorage'
import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useMemo, useState } from 'react'

export function useAxios() {
  // Hooks
  const [token] = useLocalStorage<string>('token')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handlers
  const request = useCallback(
    async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
      setLoading(true)

      try {
        const headers = {
          ...config.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
        const res = await axios.request<T>({ ...config, headers })
        return res.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message)
        } else {
          setError(DEFAULT_ERROR_MESSAGE)
        }
        throw error
      } finally {
        setLoading(false)
      }
    },
    [token]
  )

  const get = useCallback(
    <T = any>(url: string, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'GET', url })
    },
    [request]
  )

  const post = useCallback(
    <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'POST', url, data })
    },
    [request]
  )

  const put = useCallback(
    <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'PUT', url, data })
    },
    [request]
  )

  const del = useCallback(
    <T = any>(url: string, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'DELETE', url })
    },
    [request]
  )

  // Setup
  const memoizedAxios = useMemo(
    () => ({ get, post, put, delete: del }),
    [get, post, put, del]
  )

  return { axios: memoizedAxios, loading, error, request }
}
