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
import { FormLogin } from '@services/auth/components/form-login'
import { useAuth } from '@services/auth/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SigninPage() {
  // Hooks
  const router = useRouter()

  // Mutation ~ Auth
  const { login, error: authError, loading: authLoading } = useAuth()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Login to your account</span>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => router.push(AppRoutes.Signup)}
          >
            Sign Up
          </Button>
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
          type="submit"
          form="login-form"
          className="w-full"
          loading={authLoading}
          loadingText="Almost there..."
          error={authError}
        >
          Login
        </ButtonProcessable>
      </CardFooter>
    </Card>
  )
}
