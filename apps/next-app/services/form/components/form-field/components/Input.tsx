import { Input as BaseInput } from '@components/ui/input'
import type { FormField, FormFieldControl } from '@services/form/types'

export interface InputProps extends FormFieldControl {
  field: FormField
}

/**
 * @name Input
 * @description Form controlled `Input` component wrapper
 */
const Input: React.FC<InputProps> = (props) => {
  const { field, ...control } = props
  const { type, placeholder } = field

  // Markup
  const label = placeholder ?? 'Input...'

  return <BaseInput type={type} placeholder={label} {...control} />
}

export { Input }
