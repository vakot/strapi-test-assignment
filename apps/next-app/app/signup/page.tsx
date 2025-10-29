'use client'

import { Button } from '@/components/ui/button'
import { ButtonProcessable } from '@/components/ui/button-processable'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FormSignup } from '@/services/auth/components/form-signup'
import { useAuth } from '@/services/auth/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  // Hooks
  const router = useRouter()

  // Mutation ~ Auth
  const { signup, error: authError, loading: authLoading } = useAuth()

  // Handlers
  const navigate = (to: string) => () => {
    router.replace(to)
  }

  return (
    <Card className="w-full max-w-sm mx-auto md:mt-30 mt-10">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Already have an account?</span>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={navigate('signin')}
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
          type="submit"
          form="signup-form"
          className="w-full"
          loading={authLoading}
          loadingText="Launching your journey..."
          error={authError}
        >
          Sign Up
        </ButtonProcessable>
      </CardFooter>
    </Card>
  )
}
