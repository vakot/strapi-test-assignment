'use client'

import * as React from 'react'

import { API_BASE_URL } from '@constants/api'
import { ApiEndpoints } from '@constants/routes'
import { useAxios } from '@services/axios/hooks/useAxios'
import type { Country } from '@services/country/types'
import type { FormField } from '@services/form/types'

const useFormSignup = (countryId: Country['id'] = 'default') => {
  // Hooks
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = React.useState<FormField[]>([])

  // Handlers
  const onCountryChange = () => {
    const fetch = async () => {
      try {
        const url = `${API_BASE_URL}/${ApiEndpoints.FormSignup}/${countryId}`
        const res = await axios.get(url)
        setFields(res.fields as FormField[])
      } catch {}
    }

    fetch()
  }

  // Effects
  React.useEffect(onCountryChange, [axios, countryId])

  return { fields, error, loading }
}

export { useFormSignup }
