import type { RegisterOptions } from 'react-hook-form'

import type { FormField } from '../types'

/**
 * @name getValidationRules
 * @description Returns react-hook-form rules for a given field
 */
export const getValidationRules = (field: FormField): RegisterOptions => {
  const {
    name,
    label,
    required,
    minLength,
    maxLength,
    pattern,
    minValue,
    maxValue,
    minDate,
    maxDate,
  } = field

  // Setup
  const rules: RegisterOptions = {}
  const fieldName = label ?? name

  // Rule ~ Required
  if (required) {
    rules.required = `${fieldName} is required`
  }

  // Rule ~ Min length
  if (minLength !== undefined) {
    rules.minLength = {
      value: minLength,
      message: `${fieldName} must be at least ${minLength} characters`,
    }
  }

  // Rule ~ Max length
  if (maxLength !== undefined) {
    rules.maxLength = {
      value: maxLength,
      message: `${fieldName} must be at most ${maxLength} characters`,
    }
  }

  // Rule ~ Min value
  if (minValue !== undefined) {
    rules.min = {
      value: minValue,
      message: `${fieldName} must be >= ${minValue}`,
    }
  }

  // Rule ~ Max value
  if (maxValue !== undefined) {
    rules.max = {
      value: maxValue,
      message: `${fieldName} must be <= ${maxValue}`,
    }
  }

  // Rule ~ Min date
  if (minDate !== undefined && minDate !== null) {
    const minDateObj = new Date(minDate)
    rules.validate = {
      ...rules.validate,
      minDate: (value: Date) => {
        if (value >= minDateObj) return true
        return `${fieldName} must be after ${minDateObj.toLocaleDateString()}`
      },
    }
  }

  // Rule ~ Max date
  if (maxDate !== undefined && maxDate !== null) {
    const maxDateObj = new Date(maxDate)
    rules.validate = {
      ...rules.validate,
      maxDate: (value: Date) => {
        if (value <= maxDateObj) return true
        return `${fieldName} must be before ${maxDateObj.toLocaleDateString()}`
      },
    }
  }

  // Rule ~ Pattern
  if (pattern) {
    rules.pattern = {
      value: pattern,
      message: `${fieldName} has invalid format`,
    }
  }

  return rules
}
