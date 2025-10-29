'use client'

import type { Country } from '@services/country/types'
import type { FormField } from '@services/form/types'
import { useEffect, useState } from 'react'

import { URL_API_AUTH_FORM_SIGNUP } from '@services/auth/constants/url'
import { useAxios } from '@services/axios/hooks/useAxios'

const useFormSignup = (countryId: Country['id'] = 'default') => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = useState<FormField[]>([])

  // Handlers
  const onCountryChange = () => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${URL_API_AUTH_FORM_SIGNUP}/${countryId}`)
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
