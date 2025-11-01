'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { CtxUser } from '@contexts/user'
import { Separator } from '@radix-ui/react-separator'
import { useContext } from 'react'

export default function Dashboard() {
  // Context
  const { email, username } = useContext(CtxUser)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Welcome</span>
          <Separator orientation="vertical" className="h-4" />
          {/* <ButtonLogout variant="link" className="p-0" /> */}
        </CardTitle>
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
