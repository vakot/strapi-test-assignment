import * as React from 'react'

import axios, { type AxiosRequestConfig } from 'axios'

import { DEFAULT_ERROR_MESSAGE } from '@constants/error'

export function useAxios() {
  // Hooks
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Handlers
  const request = React.useCallback(
    async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
      setLoading(true)
      setSuccess(false)

      try {
        const res = await axios.request<T>(config)

        // Handling Next.js API error
        if ((res.data as any)?.error) {
          throw new Error((res.data as any).error)
        }

        setSuccess(true)
        return res.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || error.message)
        } else if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(DEFAULT_ERROR_MESSAGE)
        }
        throw error
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const get = React.useCallback(
    <T = any>(url: string, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'GET', url })
    },
    [request],
  )

  const post = React.useCallback(
    <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'POST', url, data })
    },
    [request],
  )

  const put = React.useCallback(
    <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'PUT', url, data })
    },
    [request],
  )

  const del = React.useCallback(
    <T = any>(url: string, config?: AxiosRequestConfig) => {
      return request<T>({ ...config, method: 'DELETE', url })
    },
    [request],
  )

  // Setup
  const memoizedAxios = React.useMemo(
    () => ({ get, post, put, delete: del }),
    [get, post, put, del],
  )

  return { axios: memoizedAxios, loading, success, error, request }
}
