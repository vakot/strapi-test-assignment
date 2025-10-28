'use client'

import { Control, useController } from 'react-hook-form'
import { FormField } from '../types'
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
export function useFieldController({
  field,
  control,
  defaultValue = '',
}: UseFieldControllerProps) {
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
