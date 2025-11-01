import { ButtonProcessable } from '@components/ui/button-processable'
import { AppRoutes } from '@constants/routes'
import { CtxButtonNavigation } from '@services/navigation/components/button-navigation/contexts'
import { useNavigation } from '@services/navigation/hooks/useNavigation'
import * as React from 'react'

export interface ButtonNavigationProps
  extends Omit<
    React.ComponentProps<typeof ButtonProcessable>,
    'success' | 'error'
  > {
  to: AppRoutes
}

/**
 * @name ButtonNavigation
 * @description Simple button-processable wrapper for app navigation. Shows a
 * loading state while transitioning to another route. Uses `useTransition` to
 * track Next.js navigation
 */
const ButtonNavigation: React.FC<ButtonNavigationProps> = (props) => {
  const { to, ...rest } = props

  // Hooks
  const { pending, startTransition } = useNavigation()

  return (
    <CtxButtonNavigation.Provider value={{ pending, to, startTransition }}>
      <ButtonProcessable loading={pending} {...rest} />
    </CtxButtonNavigation.Provider>
  )
}

export { ButtonNavigation }
