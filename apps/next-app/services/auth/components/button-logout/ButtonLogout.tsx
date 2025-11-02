import { ButtonProcessable } from '@components/ui/button-processable'
import type { ButtonProcessableState } from '@components/ui/button-processable/types'
import { useAuth } from '@services/auth/hooks/useAuth'

import { CtxButtonLogout } from './contexts'

export interface ButtonLogoutProps
  extends Omit<
    React.ComponentProps<typeof ButtonProcessable>,
    keyof ButtonProcessableState
  > {}

/**
 * @name ButtonLogout
 * @description Simple button-processable wrapper for user logout action
 */
const ButtonLogout: React.FC<ButtonLogoutProps> = (props) => {
  // Mutation ~ Logout
  const { logout, loading, success, error } = useAuth()

  return (
    <CtxButtonLogout.Provider value={{ logout, loading, success, error }}>
      <ButtonProcessable
        loading={loading}
        success={success}
        error={error}
        {...props}
      />
    </CtxButtonLogout.Provider>
  )
}

export { ButtonLogout }
