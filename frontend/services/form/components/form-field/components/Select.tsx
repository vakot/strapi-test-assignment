'use client'

import { Input } from '@/components/ui/input'
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField, FormFieldControl } from '@/services/form/types'

export interface SelectProps extends FormFieldControl {
  field: FormField
}

/**
 * @name Select
 * @description Form controlled `Select` component wrapper
 */
const Select: React.FC<SelectProps> = (props) => {
  const { field, onChange, ...rest } = props
  const { options, placeholder } = field

  // Short-circuit
  if (!options || options.length === 0) {
    return <Input disabled={true} placeholder="Loading..." />
  }

  // Markup
  const label = placeholder ?? 'Select...'

  return (
    <BaseSelect
      {...rest}
      onValueChange={onChange}
      disabled={options?.length === 0}
    >
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={String(value)}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  )
}

export { Select }
