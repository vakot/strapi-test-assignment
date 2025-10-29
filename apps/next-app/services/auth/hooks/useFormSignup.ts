'use client'

import type { Country } from '@/services/country/types'
import type { FormField } from '@/services/form/types'
import { useContext, useEffect, useState } from 'react'

import { CtxUser } from '@/contexts/user'
import { URL_API_AUTH_FORM } from '@/services/auth/constants/url'
import { useAxios } from '@/services/axios/hooks/useAxios'

const useFormSignup = (countryId: Country['id'] = 'default') => {
  // Hooks
  const { id } = useContext(CtxUser)
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = useState<FormField[]>([])

  // Setup
  const isValidUser = !!id

  // Handlers
  const onCountryChange = () => {
    if (!countryId || isValidUser) return

    const fetch = async () => {
      try {
        const res = await axios.get(`${URL_API_AUTH_FORM}/${countryId}`)
        setFields(res.fields as FormField[])
      } catch {}
    }

    fetch()
  }

  // Effects
  useEffect(onCountryChange, [axios, isValidUser, countryId])

  return { fields, error, loading }
}

export { useFormSignup }
