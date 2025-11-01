'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { CtxUser } from '@contexts/user'
import { ButtonLogout } from '@services/auth/components/button-logout'
import { useContext } from 'react'

export default function Dashboard() {
  // Context
  const { email, username } = useContext(CtxUser)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>

      <CardContent>
        <span className="font-medium">
          {email} {!!username && `(${username})`}
        </span>
      </CardContent>

      <CardFooter>
        <ButtonLogout />
      </CardFooter>
    </Card>
  )
}
