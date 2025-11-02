import * as React from 'react'
import type { ButtonLogoutState } from '../types'

export const CtxButtonLogout = React.createContext<ButtonLogoutState>({
  loading: false,
  success: false,
  error: null,
  logout: async () => {},
})
