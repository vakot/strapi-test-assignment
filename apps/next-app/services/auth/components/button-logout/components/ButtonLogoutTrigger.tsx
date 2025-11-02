import * as React from 'react'

import {
  ButtonProcessableTrigger,
  type ButtonProcessableTriggerProps,
} from '@components/ui/button-processable'

import { CtxButtonLogout } from '../contexts'

export interface ButtonLogoutTriggerProps
  extends ButtonProcessableTriggerProps {}

/**
 * @name ButtonLogoutTrigger
 * @description Triggers logout on click. Wraps over root
 * `ButtonProcessableTrigger`
 * @see `ButtonLogout`
 * @see `ButtonProcessableTrigger`
 */
const ButtonLogoutTrigger: React.FC<ButtonLogoutTriggerProps> = (props) => {
  const { onClick, ...rest } = props

  // Context
  const { logout } = React.useContext(CtxButtonLogout)

  // Handlers
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
    logout()
  }

  return <ButtonProcessableTrigger onClick={handleClick} {...rest} />
}

export { ButtonLogoutTrigger }
