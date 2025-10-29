'use client'

import { ButtonProcessable } from '@components/ui/button-processable'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { CtxUser } from '@contexts/user'
import { useAuth } from '@services/auth/hooks/useAuth'
import { useContext } from 'react'

export default function Dashboard() {
  // Context
  const { email, username } = useContext(CtxUser)

  // Hooks
  const { logout, loading, error } = useAuth()

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
        <ButtonProcessable
          type="button"
          variant="secondary"
          onClick={logout}
          className="w-full"
          loading={loading}
          loadingText="We will miss you :("
          error={error}
        >
          Logout
        </ButtonProcessable>
      </CardFooter>
    </Card>
  )
}
