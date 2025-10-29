'use client'

import { DEFAULT_ERROR_MESSAGE } from '@constants/error'
import type {
  FormLoginData,
  FormSignupData,
} from '@services/auth/components/types'
import {
  URL_API_AUTH_LOGIN,
  URL_API_AUTH_LOGOUT,
  URL_API_AUTH_SIGNUP,
} from '@services/auth/constants/url'
import { useAxios } from '@services/axios/hooks/useAxios'
import { User } from '@services/user/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

/**
 * @name useAuth
 * @description Custom hook to handle user authentication (signup, login and
 * logout)
 * @returns - An object containing signup and login functions, loading state,
 * and error state
 */
const useAuth = () => {
  // Hooks
  const { axios, error, loading } = useAxios()
  const router = useRouter()

  // Handlers
  const handleError = (message: string, retry: () => void) => {
    toast(message, {
      description: DEFAULT_ERROR_MESSAGE,
      action: { label: 'Retry', onClick: retry },
    })
  }

  const signup = async (data: FormSignupData) => {
    try {
      const user: User = await axios.post(URL_API_AUTH_SIGNUP, data)

      if (!user) throw new Error('Invalid user')

      toast('Enjoy your journey!')

      router.refresh() // ensures SSR data reload (proxy will handle redirect)
    } catch {
      handleError('Signup failed', () => signup(data))
    }
  }

  const login = async (data: FormLoginData) => {
    try {
      const user: User = await axios.post(URL_API_AUTH_LOGIN, {
        identifier: data.email,
        password: data.password,
      })

      if (!user) throw new Error('Invalid user')

      const greeting = user.details?.first_name || user.username || 'friend'
      toast(`Glad to see you again, ${greeting}!`)

      router.refresh() // ensures SSR data reload (proxy will handle redirect)
    } catch {
      handleError('Login failed', () => login(data))
    }
  }

  const logout = async () => {
    try {
      await axios.post(URL_API_AUTH_LOGOUT)

      router.replace('/auth/login') // ensures SSR data reload
    } catch {
      handleError('Logout failed', logout)
    }
  }

  return { signup, login, logout, error, loading }
}

export { useAuth }
