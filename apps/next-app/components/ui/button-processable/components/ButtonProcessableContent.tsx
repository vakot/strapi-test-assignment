import { Spinner } from '@components/ui/spinner'
import { cn } from '@lib/utils'
import { Check } from 'lucide-react'
import * as React from 'react'
import { DEFAULT_LOADING_LABEL, DEFAULT_SUCCESS_LABEL } from '../constants'
import { CtxButtonProcessable } from '../contexts'

interface ContentProps {
  children?: React.ReactNode
}

const Content = React.memo((props: ContentProps) => {
  const { children } = props

  // Context
  const { loading, loadingText, success, successText } =
    React.useContext(CtxButtonProcessable)

  // Short-circuits
  if (loading)
    return (
      <>
        <Spinner className="mr-2" />
        <span>{loadingText ?? DEFAULT_LOADING_LABEL}</span>
      </>
    )

  if (success)
    return (
      <>
        <Check className="mr-2" />
        <span>{successText ?? DEFAULT_SUCCESS_LABEL}</span>
      </>
    )

  return children
})

Content.displayName = 'Content'

export interface ButtonProcessableContentProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * @name ButtonProcessableContent
 * @description Part of button processable decomposing - displays button label,
 * including loading state and success state (with icons)
 * @see `ButtonProcessable`
 */
const ButtonProcessableContent = React.forwardRef<
  HTMLSpanElement,
  ButtonProcessableContentProps
>((props, ref) => {
  const { className, children, ...rest } = props

  // Context
  const { loading } = React.useContext(CtxButtonProcessable)

  // Styles
  const classes = cn('flex items-center justify-center', className)

  return (
    <span
      ref={ref}
      className={classes}
      aria-busy={loading}
      aria-live="polite"
      {...rest}
    >
      <Content>{children}</Content>
    </span>
  )
})

ButtonProcessableContent.displayName = 'ButtonProcessableContent'

export { ButtonProcessableContent }
