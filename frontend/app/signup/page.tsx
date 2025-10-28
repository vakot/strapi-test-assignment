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
import { FormSignup } from '@/services/auth/components/form-signup'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  // Hooks
  const router = useRouter()

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

        <CardDescription>Select your country and sign up</CardDescription>
      </CardHeader>

      <CardContent>
        <FormSignup id="signup-form" />
      </CardContent>

      <CardFooter>
        <Button type="submit" form="signup-form" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
}
