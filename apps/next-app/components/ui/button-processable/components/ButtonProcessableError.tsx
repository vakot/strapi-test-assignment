import { FieldError } from '@components/ui/field'
import * as React from 'react'
import { CtxButtonProcessable } from '../contexts'

export interface ButtonProcessableErrorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @name ButtonProcessableError
 * @description Part of button processable decomposing - displays error message
 * @see `ButtonProcessable`
 */
const ButtonProcessableError = React.forwardRef<
  HTMLDivElement,
  ButtonProcessableErrorProps
>((props, ref) => {
  // Context
  const { error } = React.useContext(CtxButtonProcessable)

  // Short-circuit
  if (!error) return

  return (
    <div ref={ref} {...props}>
      <FieldError errors={[{ message: error }]} />
    </div>
  )
})

ButtonProcessableError.displayName = 'ButtonProcessableError'

export { ButtonProcessableError }
