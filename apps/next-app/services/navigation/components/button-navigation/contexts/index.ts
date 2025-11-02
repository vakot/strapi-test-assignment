import { AppRoutes } from '@constants/routes'
import * as React from 'react'
import type { ButtonNavigationState } from '../types'

export const CtxButtonNavigation = React.createContext<ButtonNavigationState>({
  to: AppRoutes.Homepage,
  pending: false,
  startTransition: () => {},
})
