'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
      <Card className="w-full max-w-sm mx-auto md:mt-40 mt-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span>Already have an account?</span>
            <Separator orientation="vertical" className="h-4" />
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={navigate('signin')}
            >
              Login
            </Button>
          </CardTitle>

          <CardDescription>
            Ready when you are — log in to unlock what’s next.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button onClick={navigate('signup')} className="w-full">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm mx-auto md:mt-40 mt-10">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>

      <CardContent>
        <span className="font-medium">
          {email} {!!username && `(${username})`}
        </span>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={logout}
          className="w-full"
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  )
}
