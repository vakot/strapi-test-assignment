'use client'

import * as React from 'react'
import { CtxButtonProcessable } from './contexts'
import { ButtonProcessableState } from './types'

export interface ButtonProcessableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ButtonProcessableState {}

/**
 * @name ButtonProcessable
 * @description
 */
const ButtonProcessable = React.forwardRef<
  HTMLDivElement,
  ButtonProcessableProps
>((props, ref) => {
  const { loading, success, loadingText, successText, error, ...rest } = props

  // Setup
  const memoizedState = React.useMemo(
    () => ({
      loading,
      success,
      loadingText,
      successText,
      error,
    }),
    [loading, success, loadingText, successText, error],
  )

  return (
    <CtxButtonProcessable.Provider value={memoizedState}>
      <div ref={ref} {...rest} />
    </CtxButtonProcessable.Provider>
  )
})

ButtonProcessable.displayName = 'ButtonProcessable'

export { ButtonProcessable }
