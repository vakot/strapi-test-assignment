'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FormLogin } from '@/services/auth/components/form-login'
import { useRouter } from 'next/navigation'

export default function SigninPage() {
  // Hooks
  const router = useRouter()

  // Mutation ~ Auth
  const { login, error: authError, loading: authLoading } = useAuth()

  // Handlers
  const navigate = (to: string) => () => {
    router.replace(to)
  }

  return (
    <Card className="w-full max-w-sm mx-auto md:mt-30 mt-10">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <span>Login to your account</span>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={navigate('signup')}
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

      <CardFooter>
        <Button type="submit" form="login-form" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
