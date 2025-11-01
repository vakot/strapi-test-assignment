'use client'

import {
  ButtonProcessable,
  ButtonProcessableContent,
  ButtonProcessableError,
  ButtonProcessableTrigger,
} from '@components/ui/button-processable'
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
import { FormLogin } from '@services/auth/components/form-login'
import { useAuth } from '@services/auth/hooks/useAuth'
import {
  ButtonNavigation,
  ButtonNavigationContent,
  ButtonNavigationTrigger,
} from '@services/navigation/components/button-navigation'

export default function SigninPage() {
  // Mutation ~ Auth
  const {
    login,
    error: authError,
    loading: authLoading,
    success: authSuccess,
  } = useAuth()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Login to your account</span>
          <Separator orientation="vertical" className="h-4" />
          <ButtonNavigation to={AppRoutes.Signup}>
            <ButtonNavigationTrigger variant="link" className="p-0">
              <ButtonNavigationContent>Sign Up</ButtonNavigationContent>
            </ButtonNavigationTrigger>
          </ButtonNavigation>
        </CardTitle>

        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormLogin id="login-form" onSubmit={login} />
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <ButtonProcessable
          className="w-full flex-col"
          loading={authLoading}
          success={authSuccess}
          error={authError}
        >
          <ButtonProcessableTrigger
            type="submit"
            form="login-form"
            className="w-full"
          >
            <ButtonProcessableContent loadingText="Almost there...">
              Login
            </ButtonProcessableContent>
          </ButtonProcessableTrigger>
          <ButtonProcessableError className="text-center mt-2" />
        </ButtonProcessable>
      </CardFooter>
    </Card>
  )
}
