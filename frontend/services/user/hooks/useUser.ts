'use client'

import { useAxios } from '@/services/axios/hooks/useAxios'
import { useLocalStorage } from '@/services/localStorage/hooks/useLocalStorage'
import { URL_API_USERS_ME } from '@/services/user/constants/url'
import { User } from '@/services/user/types'
import { useEffect, useState } from 'react'

const useUser = () => {
  // Hooks
  const [token] = useLocalStorage<string>('token')
  const { axios, error, loading } = useAxios()
  const [user, setUser] = useState<User | null>(null)

  // Setup
  const effectiveUser = token ? user : null

  // Handlers
  const onTokenChange = () => {
    if (!token) return

    const fetch = async () => {
      try {
        const res = await axios.get(URL_API_USERS_ME)
        setUser(res)
      } catch {}
    }

    fetch()
  }

  // Effects
  useEffect(onTokenChange, [axios, token])

  return { user: effectiveUser, loading, error }
}

export { useUser }
