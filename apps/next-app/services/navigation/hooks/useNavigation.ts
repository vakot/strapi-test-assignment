'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import type { AppRoutes } from '@constants/routes'

export const useNavigation = () => {
  // Hooks
  const router = useRouter()
  const [pending, startTransition] = React.useTransition()

  // Handlers
  const onClick = React.useCallback(
    (to: AppRoutes | string) => startTransition(() => router.push(to)),
    [router],
  )

  return { pending, startTransition: onClick }
}
