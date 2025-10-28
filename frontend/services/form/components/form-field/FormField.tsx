'use client'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { useFieldController } from '@/services/form/hooks/useFieldController'
import type {
  FormFieldControl,
  FormField as FormFieldType,
} from '@/services/form/types'
import dynamic from 'next/dynamic'
import type { Control } from 'react-hook-form'

const Select = dynamic(async () => {
  return import('./components/Select').then((mod) => mod.Select)
})

const DatePicker = dynamic(async () => {
  return import('./components/DatePicker').then((mod) => mod.DatePicker)
})

const Input = dynamic(async () => {
  return import('./components/Input').then((mod) => mod.Input)
})

interface ContentProps {
  field: FormFieldType
  control: FormFieldControl
}

const Content: React.FC<ContentProps> = (props) => {
  const { field, control } = props

  switch (field.type) {
    case 'select': {
      const { options } = field
      return <Select options={options} {...control} />
    }

    case 'date': {
      return <DatePicker {...control} />
    }

    default: {
      const { type } = field
      return <Input type={type} {...control} />
    }
  }
}

export interface FormFieldProps extends FormFieldType {
  className?: string
  error?: string
  control: Control<any>
}

/**
 * @name FormField
 * @description Form item wrapper with internal state control, validation, type
 * switch logic and controller
 */
const FormField: React.FC<FormFieldProps> = (props) => {
  const { className, control, ...field } = props

  // Hooks
  const { field: controlledField, error } = useFieldController({
    field,
    control,
  })

  return (
    <Field className={className}>
      <FieldLabel htmlFor={field.name}>{field.label || field.name}</FieldLabel>
      <Content field={field} control={controlledField} />
      <FieldError>{error}</FieldError>
    </Field>
  )
}

export { FormField }
