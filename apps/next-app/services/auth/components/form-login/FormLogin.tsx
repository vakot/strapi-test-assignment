'use client'

import { FormContent } from '@services/auth/components/form-content'
import type { FormLoginData } from '@services/auth/components/types'
import { useFormLogin } from '@services/auth/hooks/useFormLogin'
import { FormField } from '@services/form/components/form-field'
import { type SubmitHandler, useForm } from 'react-hook-form'

export interface FormLoginProps {
  id?: string
  onSubmit: SubmitHandler<FormLoginData>
}

/**
 * @name FormLogin
 * @description Login form component with internal login functionality
 */
const FormLogin: React.FC<FormLoginProps> = (props) => {
  const { id, onSubmit } = props

  // Form
  const { control, handleSubmit } = useForm<FormLoginData>()

  // Query ~ Auth Form Configuration
  const { fields, error: formError, loading: formLoading } = useFormLogin()

  // Setup
  const errors = [formError]

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <FormContent
        loading={formLoading}
        errors={errors}
        className="flex flex-col gap-6"
      >
        {fields?.map((field) => (
          <FormField key={field.name} {...field} control={control} />
        ))}
      </FormContent>
    </form>
  )
}

export { FormLogin }
