import { Input as BaseInput } from '@/components/ui/input'
import type { FormField, FormFieldControl } from '@/services/form/types'

export interface InputProps extends FormFieldControl {
  type: FormField['type']
}

/**
 * @name Input
 * @description Form controlled `Input` component wrapper
 */
const Input: React.FC<InputProps> = (props) => {
  return <BaseInput {...props} placeholder="Input..." />
}

export { Input }
