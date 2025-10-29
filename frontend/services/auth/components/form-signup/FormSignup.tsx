'use client'

import { FormContent } from '@/services/auth/components/form-content'
import type { FormSignupData } from '@/services/auth/components/types'
import { useFormSignup } from '@/services/auth/hooks/useFormSignup'
import { getFieldLayout } from '@/services/auth/utils/layout'
import { useCountries } from '@/services/country/hooks/useCountries'
import { FormField } from '@/services/form/components/form-field'
import { useController, useForm, type SubmitHandler } from 'react-hook-form'

export interface FormSignupProps {
  id?: string
  onSubmit: SubmitHandler<FormSignupData>
}

/**
 * @name FormSignup
 * @description Registration form component with internal login functionality
 */
const FormSignup: React.FC<FormSignupProps> = (props) => {
  const { id, onSubmit: onSubmitProp } = props

  // Form
  const { control, handleSubmit } = useForm<FormSignupData>()
  const { field: country } = useController({
    control,
    name: 'country',
  })

  // Query ~ Countries
  const {
    countries,
    error: countriesError,
    loading: countriesLoading,
  } = useCountries()

  // Query ~ Auth Form Configuration
  const {
    fields,
    error: formError,
    loading: formLoading,
  } = useFormSignup(country.value)

  // Handlers
  const onSubmit: SubmitHandler<FormSignupData> = (data) => {
    const required = fields.map(({ name }) => name)
    const entries = Object.entries(data)
    const filtetedEntries = entries.filter(([key]) => required.includes(key))
    const filteredData = Object.fromEntries(filtetedEntries) as FormSignupData
    onSubmitProp({ ...filteredData, country: country.value })
  }

  // Setup
  const loading = formLoading || countriesLoading
  const errors = [countriesError, formError]

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 grid-flow-row-dense"
    >
      <FormField
        type="select"
        name="country"
        label="Country"
        className="col-span-full"
        options={countries?.map(({ name, id }) => ({
          value: id,
          label: name,
        }))}
        control={control}
        required
        {...(countriesLoading && { placeholder: 'Loading...' })}
      />

      <FormContent loading={loading} errors={errors}>
        {fields?.map((field) => (
          <div key={field.name} className={getFieldLayout(field)}>
            <FormField {...field} control={control} />
          </div>
        ))}
      </FormContent>
    </form>
  )
}

export { FormSignup }
