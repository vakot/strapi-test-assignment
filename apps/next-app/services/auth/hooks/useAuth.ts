'use client'

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
import { useRouter } from 'next/navigation'

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
  const signup = async (data: FormSignupData) => {
    try {
      const user = await axios.post(URL_API_AUTH_SIGNUP, data)
      if (user) router.refresh()
    } catch {}
  }

  const login = async (data: FormLoginData) => {
    try {
      const user = await axios.post(URL_API_AUTH_LOGIN, {
        identifier: data.email,
        password: data.password,
      })
      if (user) router.refresh()
    } catch {}
  }

  const logout = async () => {
    try {
      await axios.post(URL_API_AUTH_LOGOUT)
      router.refresh()
    } catch {}
  }

  return { signup, login, logout, error, loading }
}

export { useAuth }
