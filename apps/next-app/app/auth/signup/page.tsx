'use client'

import { Button } from '@components/ui/button'
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
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  // Hooks
  const router = useRouter()

  // Mutation ~ Auth
  const { signup, error: authError, loading: authLoading } = useAuth()

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
          loadingText="Launching your journey..."
          error={authError}
        >
          <ButtonProcessableTrigger
            type="submit"
            form="login-form"
            className="w-full"
          >
            <ButtonProcessableContent>Login</ButtonProcessableContent>
          </ButtonProcessableTrigger>
          <ButtonProcessableError className="text-center mt-2" />
        </ButtonProcessable>
      </CardFooter>
    </Card>
  )
}
