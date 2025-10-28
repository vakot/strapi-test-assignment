'use client'

import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { FormSignupData } from '@/services/auth/components/types'
import { FORM_LAYOUT_WIDE_ITEMS } from '@/services/auth/constants/layout'
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
      className="flex flex-wrap -mx-3 gap-y-6"
      {...props}
    >
      <div className="w-full px-3">
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
      </div>

      {fields?.map((field) => (
        <div
          key={field.name}
          className={`px-3 ${
            FORM_LAYOUT_WIDE_ITEMS.includes(field.name)
              ? 'w-full'
              : 'w-full md:w-1/2 grow'
          }`}
        >
          <FormField {...field} control={control} />
        </div>
      ))}

      {!!hasError && (
        <div className="w-full px-3">
          <span className="text-red-500 text-sm">Global error</span>
        </div>
      )}
    </form>
  )
}

export { FormSignup }
