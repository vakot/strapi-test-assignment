'use client'

import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { FormSignupData } from '@/services/auth/components/types'
import { useAuth } from '@/services/auth/hooks/useAuth'
import { useFormSignup } from '@/services/auth/hooks/useFormSignup'
import { useCountries } from '@/services/country/hooks/useCountries'
import { FormField } from '@/services/form/components/form-field'

export interface FormSignupProps {
  id?: string
}

const FormSignup: React.FC<FormSignupProps> = (props) => {
  // Form
  const { control, handleSubmit } = useForm<FormSignupData>()

  const { field: country } = useController({
    control,
    name: 'country',
  })

  // Query ~ Countries
  const {
    countries,
    error: errorCountries,
    loading: loadingCountries,
  } = useCountries()

  // Query ~ Auth Form Configuration
  const {
    fields,
    error: formError,
    loading: formLoading,
  } = useFormSignup(country.value)

  // Mutation ~ Auth
  const { signup, error: signupError, loading: signupLoading } = useAuth()

  // Handlers
  const onSubmit: SubmitHandler<FormSignupData> = (data) => {
    const fieldsToInclude = fields.map(({ name }) => name)
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => fieldsToInclude.includes(key)),
    ) as FormSignupData
    signup({ ...filteredData, country: country.value })
  }

  // Setup
  const loading = formLoading || signupLoading || loadingCountries
  const hasError = errorCountries || formError || signupError

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      {...props}
    >
      <FormField
        type="select"
        name="country"
        label="Country"
        options={countries?.map(({ name, id }) => ({
          value: id,
          label: name,
        }))}
        control={control}
        required
      />

      {fields?.map((field) => (
        <FormField key={field.name} {...field} control={control} />
      ))}

      {!!hasError && <span>Global error</span>}
    </form>
  )
}

export { FormSignup }
