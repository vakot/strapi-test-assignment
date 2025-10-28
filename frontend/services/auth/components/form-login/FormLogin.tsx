'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormLoginData } from '@/services/auth/components/types'
import { useAuth } from '@/services/auth/hooks/useAuth'
import { useFormLogin } from '@/services/auth/hooks/useFormLogin'
import { SubmitHandler, useForm } from 'react-hook-form'

const FormLogin: React.FC = () => {
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>()

  // Query ~ Auth Form Configuration
  const { fields, error: formError, loading: formLoading } = useFormLogin()

  // Hooks
  const { login } = useAuth()

  // Handlers
  const onSubmit: SubmitHandler<FormLoginData> = async (data) => {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}

      <Input
        type="password"
        {...register('password', { required: true })}
        placeholder="Password"
      />
      {errors.password && <span>Password is required</span>}

      <Button type="submit">Login</Button>
    </form>
  )
}

export { FormLogin }
