'use client'

import { useEffect, useState } from 'react'
import type { Country } from '../types'

import { useAxios } from '@services/axios/hooks/useAxios'
import { URL_API_COUNTRIES } from '@services/country/constants/url'

const useCountries = () => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [countries, setCountries] = useState<Country[]>([])

  // Effects
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${URL_API_COUNTRIES}?sort=name:asc`)
        setCountries(res.data as Country[])
      } catch {}
    }

    fetch()
  }, [axios])

  return { countries, loading, error }
}

export { useCountries }
