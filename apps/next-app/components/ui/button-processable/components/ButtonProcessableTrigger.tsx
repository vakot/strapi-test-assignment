import { Button } from '@components/ui/button'
import { CtxButtonProcessable } from '@components/ui/button-processable/contexts'

import * as React from 'react'

export interface ButtonProcessableTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

/**
 * @name ButtonProcessableTrigger
 * @description Part of button processable decomposing - displays clickable
 * button and handles click
 * @see `ButtonProcessable`
 */
const ButtonProcessableTrigger = React.forwardRef<
  React.ComponentRef<typeof Button>,
  ButtonProcessableTriggerProps
>((props, ref) => {
  const { disabled, ...rest } = props

  // Context
  const { success } = React.useContext(CtxButtonProcessable)

  return <Button ref={ref} disabled={disabled || success} {...rest} />
})

ButtonProcessableTrigger.displayName = 'ButtonProcessableTrigger'

export { ButtonProcessableTrigger }
