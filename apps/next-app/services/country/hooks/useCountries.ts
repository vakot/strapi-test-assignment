'use client'

import { useEffect, useState } from 'react'
import type { Country } from '../types'

import { API_BASE_URL } from '@constants/api'
import { ApiEndpoints } from '@constants/routes'
import { useAxios } from '@services/axios/hooks/useAxios'

const useCountries = () => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [countries, setCountries] = useState<Country[]>([])

  // Effects
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${ApiEndpoints.Countries}`)
        setCountries(res.data as Country[])
      } catch {}
    }

    fetch()
  }, [axios])

  return { countries, loading, error }
}

export { useCountries }
