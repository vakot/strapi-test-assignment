'use client'

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
import {
  ButtonLogout,
  ButtonLogoutContent,
  ButtonLogoutError,
  ButtonLogoutTrigger,
} from '@services/auth/components/button-logout'
import {
  ButtonNavigation,
  ButtonNavigationContent,
  ButtonNavigationTrigger,
} from '@services/navigation/components/button-navigation'
import { User } from '@services/user/types'
import { useContext } from 'react'

const ContentVisitor: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Already have an account?</span>
          <Separator orientation="vertical" className="h-4" />
          <ButtonNavigation to={AppRoutes.Login}>
            <ButtonNavigationTrigger variant="link" className="p-0">
              <ButtonNavigationContent>Login</ButtonNavigationContent>
            </ButtonNavigationTrigger>
          </ButtonNavigation>
        </CardTitle>

        <CardDescription>
          Ready when you are — log in to unlock what’s next.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <ButtonNavigation to={AppRoutes.Signup} className="w-full">
          <ButtonNavigationTrigger className="w-full">
            <ButtonNavigationContent>Sign Up</ButtonNavigationContent>
          </ButtonNavigationTrigger>
        </ButtonNavigation>
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
        <ButtonNavigation to={AppRoutes.Dashboard} className="w-full">
          <ButtonNavigationTrigger className="w-full">
            <ButtonNavigationContent>Dashboard</ButtonNavigationContent>
          </ButtonNavigationTrigger>
        </ButtonNavigation>
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
