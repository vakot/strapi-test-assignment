'use client'

import { useEffect, useState } from 'react'
import type { Country } from '../types'

import { DEFAULT_ERROR_MESSAGE } from '@/constants/error'
import { URL_API_COUNTRIES } from '@/services/country/constants/url'
import axios from 'axios'

const useCountries = () => {
  // Hooks
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Effects
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      try {
        const res: any = await axios.get(URL_API_COUNTRIES)
        setCountries(res.data.data as Country[])
      } catch (e: any) {
        console.error(e)
        setError(e?.response?.data?.message || DEFAULT_ERROR_MESSAGE)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { countries, loading, error }
}

export { useCountries }
