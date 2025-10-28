'use client'

import { Button } from '@/components/ui/button'
import { CtxUser } from '@/contexts/user'
import { useAuth } from '@/services/auth/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export default function Home() {
  // Context
  const { id, email, username } = useContext(CtxUser)

  // Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // Setup
  const isUserValid = !!id

  // Handlers
  const navigate = (to: string) => () => {
    router.replace(to)
  }

  // Short-circuit
  if (!isUserValid) {
    return (
      <div className="flex gap-2">
        <Button type="button" variant="secondary" onClick={navigate('signin')}>
          Login
        </Button>
        <Button type="button" onClick={navigate('signup')}>
          Sign-Up
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      Welcome:{' '}
      <span className="font-medium">
        {email} {!!username && `(${username})`}
      </span>
      <Button type="button" variant="secondary" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}
