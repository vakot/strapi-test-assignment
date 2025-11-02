import {
  ButtonProcessableTrigger,
  type ButtonProcessableTriggerProps,
} from '@components/ui/button-processable'
import * as React from 'react'
import { CtxButtonNavigation } from '../contexts'

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
  const { onClick, ...rest } = props

  // Context
  const { to, startTransition } = React.useContext(CtxButtonNavigation)

  // Handlers
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      startTransition(to)
    },
    [to, onClick, startTransition],
  )

  return <ButtonProcessableTrigger onClick={handleClick} {...rest} />
}

export { ButtonNavigationTrigger }
