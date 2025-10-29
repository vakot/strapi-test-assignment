'use client'

import { URL_AUTH } from '@/components/providers/user/constants'
import { CtxUser } from '@/contexts/user'
import { useUser } from '@/services/user/hooks/useUser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface UserProviderProps {}

const UserProvider: React.FC<React.PropsWithChildren<UserProviderProps>> = (
  props,
) => {
  const { children } = props

  // Query ~ User data & details
  const { user, loading } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  // Effects
  useEffect(() => {
    if (loading) {
      return
    }

    const isAuthPage = URL_AUTH.includes(pathname)
    const isHomepage = pathname === '/'
    const allowAuthRedirect = !isAuthPage && !isHomepage

    // prevent logged in users from navigating to auth pages
    if (user && isAuthPage) {
      console.log('redirect', 1)
      router.replace('/')
      return
    }

    // navigate logged out users to signin page if not on homepage
    if (!user && allowAuthRedirect) {
      console.log('redirect', 2)
      router.replace('/signin')
      return
    }
  }, [user, loading, router, pathname])

  // Short-circuits
  if (loading) {
    return <div>Loading user...</div>
  }

  if (!user) {
    return children
  }

  return <CtxUser.Provider value={user}>{children}</CtxUser.Provider>
}

export { UserProvider }
