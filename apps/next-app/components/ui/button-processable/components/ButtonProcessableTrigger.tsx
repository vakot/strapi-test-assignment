import { Button } from '@components/ui/button'

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
  return <Button ref={ref} {...props} />
})

ButtonProcessableTrigger.displayName = 'ButtonProcessableTrigger'

export { ButtonProcessableTrigger }
