'use client'

import { Input } from '@components/ui/input'
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import type { FormField, FormFieldControl } from '@services/form/types'

export interface SelectProps extends FormFieldControl {
  field: FormField
}

/**
 * @name Select
 * @description Form controlled `Select` component wrapper
 */
const Select: React.FC<SelectProps> = (props) => {
  const { field, onChange, ...control } = props
  const { options, placeholder } = field

  // Setup
  const hasOptions = !!options && options.length

  // Markup
  const label = placeholder ?? 'Select...'

  // Short-circuit
  if (!hasOptions) {
    return <Input disabled placeholder={label} />
  }

  return (
    <BaseSelect onValueChange={onChange} {...control}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        {options?.map(({ value, label }) => (
          <SelectItem key={value} value={String(value)}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  )
}

export { Select }
