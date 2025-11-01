'use client'

import { Button } from '@components/ui/button'
import { ButtonProcessable } from '@components/ui/button-processable'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { AppRoutes } from '@constants/routes'
import { CtxUser } from '@contexts/user'
import { LayoutAuth } from '@layouts/auth'
import { useAuth } from '@services/auth/hooks/useAuth'
import { User } from '@services/user/types'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

const ContentVisitor: React.FC = () => {
  // Hooks
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Already have an account?</span>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => router.push(AppRoutes.Login)}
          >
            Login
          </Button>
        </CardTitle>

        <CardDescription>
          Ready when you are — log in to unlock what’s next.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          onClick={() => router.push(AppRoutes.Signup)}
          className="w-full"
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
}

interface ContentUserProps {
  user: User
}

const ContentUser: React.FC<ContentUserProps> = (props) => {
  const { user } = props
  const { email, username } = user

  // Query
  const { logout, loading, error } = useAuth()

  // Hooks
  const router = useRouter()

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

      <CardFooter className="flex gap-6">
        <ButtonProcessable
          type="button"
          variant="secondary"
          onClick={logout}
          className="flex-1"
          loading={loading}
          loadingText="We will miss you :("
          error={error}
        >
          Logout
        </ButtonProcessable>
        <Button
          onClick={() => router.push(AppRoutes.Dashboard)}
          className="flex-1"
        >
          Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Home() {
  // Hooks
  const user = useContext(CtxUser)

  return (
    <LayoutAuth>
      {user ? <ContentUser user={user} /> : <ContentVisitor />}
    </LayoutAuth>
  )
}
