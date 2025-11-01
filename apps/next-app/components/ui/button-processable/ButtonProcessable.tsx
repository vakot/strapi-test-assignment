'use client'

import { Button } from '@components/ui/button'
import { FieldError } from '@components/ui/field'
import { Spinner } from '@components/ui/spinner'
import { cn } from '@lib/utils'
import { Check } from 'lucide-react'
import * as React from 'react'

type ButtonProcessableState = {
  loading?: boolean
  success?: boolean
  loadingText?: React.ReactNode
  successText?: React.ReactNode
  error?: string | null
}

const ButtonProcessableContext = React.createContext<ButtonProcessableState>({})

export interface ButtonProcessableProps extends ButtonProcessableState {
  className?: string
  children?: React.ReactNode
}

const ButtonProcessable = React.forwardRef<
  HTMLButtonElement,
  ButtonProcessableProps
>((props) => {
  const {
    className,
    children,
    loading,
    success,
    loadingText,
    successText,
    error,
  } = props

  return (
    <ButtonProcessableContext.Provider
      value={{ loading, success, loadingText, successText, error }}
    >
      <div className={className}>{children}</div>
    </ButtonProcessableContext.Provider>
  )
})

ButtonProcessable.displayName = 'ButtonProcessable'

export interface ButtonProcessableTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const ButtonProcessableTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  ButtonProcessableTriggerProps
>((props, ref) => {
  return <Button ref={ref} {...props} />
})

ButtonProcessableTrigger.displayName = 'ButtonProcessableTrigger'

interface ButtonProcessableContentProps {
  className?: string
  children?: React.ReactNode
}

const ButtonProcessableContent = React.forwardRef<
  HTMLSpanElement,
  ButtonProcessableContentProps
>((props, ref) => {
  const { className, children } = props

  // Context
  const { loading, loadingText, success, successText } = React.useContext(
    ButtonProcessableContext,
  )

  // Styles
  const classes = cn('flex items-center justify-center', className)

  // Short-circuits
  if (loading) {
    return (
      <span ref={ref} className={classes}>
        <Spinner className="mr-2" />
        {loadingText}
      </span>
    )
  }

  if (success) {
    return (
      <span ref={ref} className={classes}>
        <Check className="mr-2" />
        {successText}
      </span>
    )
  }

  return (
    <span ref={ref} className={classes}>
      {children}
    </span>
  )
})

ButtonProcessableContent.displayName = 'ButtonProcessableContent'

export interface ButtonProcessableErrorProps {
  className?: string
}

const ButtonProcessableError = React.forwardRef<
  HTMLDivElement,
  ButtonProcessableErrorProps
>((props, ref) => {
  const { className } = props

  // Context
  const { error } = React.useContext(ButtonProcessableContext)

  // Short-circuit
  if (!error) return

  return (
    <div ref={ref} className={className}>
      <FieldError errors={[{ message: error }]} />
    </div>
  )
})

ButtonProcessableError.displayName = 'ButtonProcessableError'

export {
  ButtonProcessable,
  ButtonProcessableContent,
  ButtonProcessableError,
  ButtonProcessableTrigger,
}
