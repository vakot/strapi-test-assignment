'use client'

import { FormField } from '@/services/form/types'
import { useEffect, useState } from 'react'

import { URL_API_AUTH_FORM_LOGIN } from '@/services/auth/constants/url'
import { useAxios } from '@/services/axios/hooks/useAxios'

const useFormLogin = () => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = useState<FormField[]>([])

  // Handlers
  const onMount = () => {
    const fetch = async () => {
      try {
        const res = await axios.get(URL_API_AUTH_FORM_LOGIN)
        setFields(res.fields as FormField[])
      } catch {}
    }

    fetch()
  }

  // Effects
  useEffect(onMount, [axios])

  return { fields, error, loading }
}

export { useFormLogin }
