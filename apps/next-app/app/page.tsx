'use client'

import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { CtxUser } from '@contexts/user'
import { useAuth } from '@services/auth/hooks/useAuth'
import { User } from '@services/user/types'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

const ContentVisitor: React.FC = () => {
  // Hooks
  const router = useRouter()

  // Handlers
  const navigate = (to: string) => () => {
    router.replace(to)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Already have an account?</span>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={navigate('/auth/login')}
          >
            Login
          </Button>
        </CardTitle>

        <CardDescription>
          Ready when you are — log in to unlock what’s next.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button onClick={navigate('/auth/signup')} className="w-full">
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
  const { logout } = useAuth()

  // Hooks
  const router = useRouter()

  // Handlers
  const navigate = (to: string) => () => {
    router.replace(to)
  }

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
        <Button
          type="button"
          variant="secondary"
          onClick={logout}
          className="flex-1"
        >
          Logout
        </Button>
        <Button onClick={navigate('/dashboard')} className="flex-1">
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
    <div className="w-full max-w-sm mx-auto px-4 md:mt-40 mt-10">
      {user ? <ContentUser user={user} /> : <ContentVisitor />}
    </div>
  )
}
