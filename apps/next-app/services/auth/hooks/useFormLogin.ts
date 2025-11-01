'use client'

import type { FormField } from '@services/form/types'
import { useEffect, useState } from 'react'

import { ApiEndpoints } from '@constants/routes'
import { useAxios } from '@services/axios/hooks/useAxios'

const useFormLogin = () => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = useState<FormField[]>([])

  // Setup

  // Handlers
  const onMount = () => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${ApiEndpoints.FormLogin}`)
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
