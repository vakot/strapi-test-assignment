import { FORM_LAYOUT_WIDE_ITEMS } from '@/services/auth/constants/layout'
import type { FormField } from '@/services/form/types'

/**
 * @name getFieldLayout
 * @description Determins correct field size based on it's name (1 col or 2 col)
 * @returns Style string
 */
export const getFieldLayout = (field: FormField) => {
  if (FORM_LAYOUT_WIDE_ITEMS.includes(field.name)) {
    return 'col-span-full'
  }
}
