'use client'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { useFieldController } from '@/services/form/hooks/useFieldController'
import type {
  FormFieldControl,
  FormField as FormFieldType,
} from '@/services/form/types'
import type { Control } from 'react-hook-form'
import { DatePicker, Input, Select } from './components/Async'

interface ContentProps {
  field: FormFieldType
  control: FormFieldControl
}

const Content: React.FC<ContentProps> = (props) => {
  const { field, control } = props

  switch (field.type) {
    case 'select': {
      return <Select field={field} {...control} />
    }

    case 'date': {
      return <DatePicker field={field} {...control} />
    }

    default: {
      return <Input field={field} {...control} />
    }
  }
}

export interface FormFieldProps extends FormFieldType {
  className?: string
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
