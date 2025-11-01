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
import { FormSignup } from '@services/auth/components/form-signup'
import { useAuth } from '@services/auth/hooks/useAuth'
import {
  ButtonNavigation,
  ButtonNavigationContent,
  ButtonNavigationTrigger,
} from '@services/navigation/components/button-navigation'

export default function SignupPage() {
  // Mutation ~ Auth
  const {
    signup,
    error: authError,
    loading: authLoading,
    success: authSuccess,
  } = useAuth()

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
          Select your country, fill out the form, and you’re in!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormSignup id="signup-form" onSubmit={signup} />
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
            form="signup-form"
            className="w-full"
          >
            <ButtonProcessableContent loadingText="Launching your journey...">
              Sign Up
            </ButtonProcessableContent>
          </ButtonProcessableTrigger>
          <ButtonProcessableError className="text-center mt-2" />
        </ButtonProcessable>
      </CardFooter>
    </Card>
  )
}
