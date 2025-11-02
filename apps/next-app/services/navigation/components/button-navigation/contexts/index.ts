import * as React from 'react'

import { AppRoutes } from '@constants/routes'

import type { ButtonNavigationState } from '../types'

export const CtxButtonNavigation = React.createContext<ButtonNavigationState>({
  to: AppRoutes.Homepage,
  pending: false,
  startTransition: () => {},
})
