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
        <CardTitle>
          <span>Already have an account?</span>
          <span className="mx-4">|</span>
          <Button variant="link" className="p-0" onClick={navigate('signin')}>
            Login
          </Button>
        </CardTitle>
        <CardDescription>Select a country and signup</CardDescription>
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
