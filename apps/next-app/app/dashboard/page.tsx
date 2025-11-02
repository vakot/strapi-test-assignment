'use client'

import * as React from 'react'

import { Separator } from '@radix-ui/react-separator'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { CtxUser } from '@contexts/user'
import {
  ButtonLogout,
  ButtonLogoutContent,
  ButtonLogoutError,
  ButtonLogoutTrigger,
} from '@services/auth/components/button-logout'

export default function Dashboard() {
  // Context
  const { email, username } = React.useContext(CtxUser)

  return (
    <Card>
      <CardHeader>
        <ButtonLogout>
          <CardTitle className="flex items-center gap-4">
            <span>Welcome</span>
            <Separator orientation="vertical" className="h-4" />
            <ButtonLogoutTrigger variant="link" className="p-0">
              <ButtonLogoutContent>Logout</ButtonLogoutContent>
            </ButtonLogoutTrigger>
          </CardTitle>
          <ButtonLogoutError />
        </ButtonLogout>
      </CardHeader>

      <CardContent>
        <span className="font-medium">
          {email} {!!username && `(${username})`}
        </span>
      </CardContent>

      <CardFooter>
        Dummy dashboard page to confirm user context is shared across pages
      </CardFooter>
    </Card>
  )
}
