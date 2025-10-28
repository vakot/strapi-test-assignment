'use client'

import { FormLoginData } from '@/services/auth/components/types'
import { useAuth } from '@/services/auth/hooks/useAuth'
import { useFormLogin } from '@/services/auth/hooks/useFormLogin'
import { FormField } from '@/services/form/components/form-field'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface FormLoginProps {
  id?: string
}

const FormLogin: React.FC<FormLoginProps> = (props) => {
  // Form
  const { control, handleSubmit } = useForm<FormLoginData>()

  // Query ~ Auth Form Configuration
  const { fields, error: formError, loading: formLoading } = useFormLogin()

  // Hooks
  const { login } = useAuth()

  // Handlers
  const onSubmit: SubmitHandler<FormLoginData> = async (data) => {
    login(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      {...props}
    >
      {fields?.map((field) => (
        <FormField key={field.name} {...field} control={control} />
      ))}

      {!!formError && <span>{formError}</span>}
    </form>
  )
}

export { FormLogin }
