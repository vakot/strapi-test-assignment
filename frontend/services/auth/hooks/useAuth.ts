'use client'

import { FormLoginData, FormSignupData } from '@/services/auth/components/types'
import {
  URL_API_AUTH_LOCAL,
  URL_API_AUTH_LOCAL_REGISTER
} from '@/services/auth/constants/url'
import { useAxios } from '@/services/axios/hooks/useAxios'
import { useLocalStorage } from '@/services/localStorage/hooks/useLocalStorage'
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
  const router = useRouter()
  const { axios, error, loading } = useAxios()
  const [_, setToken] = useLocalStorage<string>('token')

  // Handlers
  const signup = async (data: FormSignupData) => {
    try {
      const res = await axios.post(URL_API_AUTH_LOCAL_REGISTER, data)
      setToken(res.jwt ?? null)
      router.replace('/')
    } catch {}
  }

  const login = async (data: FormLoginData) => {
    try {
      const res = await axios.post(URL_API_AUTH_LOCAL, {
        identifier: data.email,
        password: data.password
      })
      setToken(res.jwt ?? null)
      router.replace('/')
    } catch {}
  }

  const logout = () => {
    setToken(null)
  }

  return { signup, login, logout, error, loading }
}

export { useAuth }
