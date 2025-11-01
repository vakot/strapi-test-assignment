import {
  ButtonProcessableTrigger,
  type ButtonProcessableTriggerProps,
} from '@components/ui/button-processable'
import { CtxButtonNavigation } from '@services/navigation/components/button-navigation/contexts'
import * as React from 'react'

export interface ButtonNavigationTriggerProps
  extends ButtonProcessableTriggerProps {}

/**
 * @name ButtonNavigationTrigger
 * @description Triggers navigation and transition on click. Wraps over root
 * `ButtonProcessableTrigger`
 * @see `ButtonNavigation`
 * @see `ButtonProcessableTrigger`
 */
const ButtonNavigationTrigger: React.FC<ButtonNavigationTriggerProps> = (
  props,
) => {
  // Context
  const { to, startTransition } = React.useContext(CtxButtonNavigation)

  // Handlers
  const onClick = React.useCallback(() => {
    startTransition(to)
  }, [to, startTransition])

  return <ButtonProcessableTrigger {...props} onClick={onClick} />
}

export { ButtonNavigationTrigger }
