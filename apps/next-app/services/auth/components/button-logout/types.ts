import type { useAuth } from '@services/auth/hooks/useAuth'

export type ButtonLogoutState = Omit<
  ReturnType<typeof useAuth>,
  'signup' | 'login'
>
