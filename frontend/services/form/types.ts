import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export type SelectOption = {
  value: string | number
  label?: string
}

export type FormFieldRules = {
  required?: boolean
  /**
   * For numeric inputs
   */
  minValue?: number
  /**
   * For numeric inputs
   */
  maxValue?: number
  /**
   * For date-pickers
   */
  minDate?: Date
  /**
   * For date-pickers
   */
  maxDate?: Date
  /**
   * For text-based and numeric inputs (number, text, email, etc...)
   */
  minLength?: number
  /**
   * For text-based and numeric inputs (number, text, email, etc...)
   */
  maxLength?: number
  /**
   * Only for text-based inputs (email, password, text)
   */
  pattern?: RegExp
}

export type FormField = {
  name: string
  label?: string
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select'
  options?: SelectOption[]
} & FormFieldRules

export type FormFieldControl = ControllerRenderProps<FieldValues, string>
