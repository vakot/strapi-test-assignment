'use client'

import { AppRoutes } from '@constants/routes'
import { useRouter } from 'next/navigation'
import * as React from 'react'

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
