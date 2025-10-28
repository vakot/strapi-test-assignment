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
import { FormLogin } from '@/services/auth/components/form-login'
import { useRouter } from 'next/navigation'

export default function SigninPage() {
  // Hooks
  const router = useRouter()

  // Handlers
  const navigate = (to: string) => () => {
    router.replace(to)
  }

  return (
    <Card className="w-full max-w-sm mx-auto md:mt-40 mt-10">
      <CardHeader>
        <CardTitle>
          <span>Login to your account</span>
          <span className="mx-4">|</span>
          <Button variant="link" className="p-0" onClick={navigate('signup')}>
            Sign Up
          </Button>
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormLogin id="login-form" />
      </CardContent>

      <CardFooter>
        <Button type="submit" form="login-form" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
