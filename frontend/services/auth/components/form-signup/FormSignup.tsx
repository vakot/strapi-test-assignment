'use client'

import { Button } from '@/components/ui/button'
import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { Spinner } from '@/components/ui/spinner'
import { FormSignupData } from '@/services/auth/components/types'
import { useAuth } from '@/services/auth/hooks/useAuth'
import { useFormSignup } from '@/services/auth/hooks/useFormSignup'
import { useCountries } from '@/services/country/hooks/useCountries'
import { FormField } from '@/services/form/components/form-field'

const FormSignup: React.FC = () => {
  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupData>()

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

  // Markup
  const renderButtonContent = () => {
    if (!loading) {
      return 'Sign-Up'
    }

    return (
      <>
        <Spinner />
        Loading...
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <FormField
        type="select"
        name="country"
        label="Country"
        options={countries?.map(({ name, id }) => ({
          value: id,
          label: name,
        }))}
        error={errors['country'] ? String(errors['country']) : undefined}
        control={control}
        required
      />

      {fields?.map((field) => (
        <FormField key={field.name} {...field} control={control} />
      ))}

      <Button type="submit" disabled={loading}>
        {renderButtonContent()}
      </Button>

      {!!hasError && <span>Global error</span>}
    </form>
  )
}

export { FormSignup }
