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
  const { loading, success, error, ...rest } = props

  // Setup
  const memoizedState = React.useMemo(
    () => ({
      loading,
      success,
      error,
    }),
    [loading, success, error],
  )

  return (
    <CtxButtonProcessable.Provider value={memoizedState}>
      <div ref={ref} {...rest} />
    </CtxButtonProcessable.Provider>
  )
})

ButtonProcessable.displayName = 'ButtonProcessable'

export { ButtonProcessable }
