'use client'

import * as React from 'react'

import { API_BASE_URL } from '@constants/api'
import { ApiEndpoints } from '@constants/routes'
import { useAxios } from '@services/axios/hooks/useAxios'
import type { FormField } from '@services/form/types'

const useFormLogin = () => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = React.useState<FormField[]>([])

  // Setup

  // Handlers
  const onMount = () => {
    const fetch = async () => {
      try {
        const url = `${API_BASE_URL}/${ApiEndpoints.FormLogin}`
        const res = await axios.get(url)
        setFields(res.fields as FormField[])
      } catch {}
    }

    fetch()
  }

  // Effects
  React.useEffect(onMount, [axios])

  return { fields, error, loading }
}

export { useFormLogin }
