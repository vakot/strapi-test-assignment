'use client'

import { type Control, useController } from 'react-hook-form'

import type { FormField } from '../types'
import { getValidationRules } from '../utils/rules'

export interface UseFieldControllerProps {
  field: FormField
  control: Control
  defaultValue?: any
}

/**
 * @name useFieldController
 * @description Hook to get a fully wired field with validation rules from CMS
 */
export const useFieldController = (props: UseFieldControllerProps) => {
  const { field, control, defaultValue = '' } = props

  // Setup ~ Hooks
  const rules = getValidationRules(field)

  // Hooks
  const { field: controllerField, fieldState } = useController({
    name: field.name,
    control,
    defaultValue,
    rules,
  })

  return {
    field: controllerField,
    error: fieldState.error?.message || null,
  }
}
