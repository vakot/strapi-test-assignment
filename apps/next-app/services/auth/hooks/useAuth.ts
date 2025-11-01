'use client'

import { API_BASE_URL } from '@constants/api'
import { DEFAULT_ERROR_MESSAGE } from '@constants/error'
import { ApiEndpoints, AppRoutes } from '@constants/routes'
import type {
  FormLoginData,
  FormSignupData,
} from '@services/auth/components/types'
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
      const user: User = await axios.post(
        `${API_BASE_URL}/${ApiEndpoints.Signup}`,
        data,
      )

      if (!user) throw new Error('Invalid user')

      toast('Enjoy your journey!')

      router.refresh() // ensures SSR data reload (proxy will handle redirect)
    } catch {
      handleError('Signup failed', () => signup(data))
    }
  }

  const login = async (data: FormLoginData) => {
    try {
      const user: User = await axios.post(
        `${API_BASE_URL}/${ApiEndpoints.Login}`,
        {
          identifier: data.email,
          password: data.password,
        },
      )

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
      await axios.post(`${API_BASE_URL}/${ApiEndpoints.Logout}`)

      router.replace(AppRoutes.Login) // ensures SSR data reload
    } catch {
      handleError('Logout failed', logout)
    }
  }

  return { signup, login, logout, error, loading }
}

export { useAuth }
