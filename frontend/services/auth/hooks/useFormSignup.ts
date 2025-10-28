'use client'

import { Country } from '@/services/country/types'
import { FormField } from '@/services/form/types'
import { useEffect, useState } from 'react'

import { URL_API_AUTH_FORM } from '@/services/auth/constants/url'
import { useAxios } from '@/services/axios/hooks/useAxios'

const useFormSignup = (countryId: Country['id']) => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = useState<FormField[]>([])

  // Handlers
  const onCountryChange = () => {
    if (!countryId) return

    const fetch = async () => {
      try {
        const res = await axios.get(`${URL_API_AUTH_FORM}/${countryId}`)
        setFields(res.fields as FormField[])
      } catch {}
    }

    fetch()
  }

  // Effects
  useEffect(onCountryChange, [axios, countryId])

  return { fields, error, loading }
}

export { useFormSignup }
