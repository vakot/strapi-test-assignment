'use client'

import { FormField } from '@/services/form/types'
import { useContext, useEffect, useState } from 'react'

import { CtxUser } from '@/contexts/user'
import { URL_API_AUTH_FORM_LOGIN } from '@/services/auth/constants/url'
import { useAxios } from '@/services/axios/hooks/useAxios'

const useFormLogin = () => {
  // Hooks
  const { id } = useContext(CtxUser)
  const { axios, loading, error } = useAxios()
  const [fields, setFields] = useState<FormField[]>([])

  // Setup
  const isValidUser = !!id

  // Handlers
  const onMount = () => {
    if (isValidUser) return

    const fetch = async () => {
      try {
        const res = await axios.get(URL_API_AUTH_FORM_LOGIN)
        setFields(res.fields as FormField[])
      } catch {}
    }

    fetch()
  }

  // Effects
  useEffect(onMount, [axios, isValidUser])

  return { fields, error, loading }
}

export { useFormLogin }
